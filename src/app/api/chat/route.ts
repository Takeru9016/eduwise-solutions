import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { google } from "googleapis";

interface VectorDocument {
  content: string;
  embedding: number[];
}

interface ChatRequest {
  sessionId: string;
  question?: string;
  userData?: UserData;
}

interface UserData {
  name?: string;
  phone?: string;
  qualification?: string;
  email?: string;
}

interface ChatResponse {
  answer: string;
  pdf?: string;
  needsAdvisor?: boolean;
}

interface SimilarityResult {
  index: number;
  content: string;
  similarity: number;
}

class VectorStoreManager {
  private static instance: VectorStoreManager;
  private vectorStore: VectorDocument[] | null = null;
  private embeddings: HuggingFaceInferenceEmbeddings | null = null;

  private constructor() {}

  static getInstance(): VectorStoreManager {
    if (!VectorStoreManager.instance) {
      VectorStoreManager.instance = new VectorStoreManager();
    }
    return VectorStoreManager.instance;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  private async loadTextFromFile(filePath: string): Promise<string> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at: ${filePath}`);
    }

    console.log(`Reading file from: ${filePath}`);
    const text = fs.readFileSync(filePath, "utf-8");
    console.log(`Loaded ${text.length} characters`);

    return text;
  }

  async loadKnowledgeBase(filePath: string): Promise<VectorDocument[]> {
    if (this.vectorStore) {
      console.log("Using cached vector store");
      return this.vectorStore;
    }

    const text = await this.loadTextFromFile(filePath);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });

    const chunks = await splitter.splitText(text);
    console.log(`Split into ${chunks.length} chunks`);

    if (!this.embeddings) {
      this.embeddings = new HuggingFaceInferenceEmbeddings({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        apiKey: process.env.HUGGINGFACE_API_KEY,
      });
    }

    console.log("Creating embeddings...");

    const embeddingResults = await this.embeddings.embedDocuments(chunks);

    this.vectorStore = chunks.map((content, i) => ({
      content,
      embedding: embeddingResults[i],
    }));

    console.log(`Vector store ready with ${this.vectorStore.length} documents`);

    return this.vectorStore;
  }

  async searchRelevantDocuments(
    query: string,
    k: number = 3
  ): Promise<string[]> {
    if (!this.vectorStore || !this.embeddings) {
      throw new Error("Vector store not initialized");
    }

    console.log(`Searching for: "${query}"`);

    const queryEmbedding = await this.embeddings.embedQuery(query);

    const similarities: SimilarityResult[] = this.vectorStore.map(
      (doc, index) => ({
        index,
        content: doc.content,
        similarity: this.cosineSimilarity(queryEmbedding, doc.embedding),
      })
    );

    similarities.sort((a, b) => b.similarity - a.similarity);

    console.log(
      `Found ${k} relevant chunks (similarity: ${similarities[0].similarity.toFixed(
        3
      )})`
    );

    return similarities.slice(0, k).map((s) => s.content);
  }
}

class KnowledgeBaseService {
  private static readonly POSSIBLE_FILE_PATHS = [
    path.join(process.cwd(), "data", "website_data.txt"),
    path.join(process.cwd(), "data", "faq.md"),
    path.join(process.cwd(), "src", "data", "faq.txt"),
    path.join(process.cwd(), "src", "data", "faq.md"),
    path.join(process.cwd(), "public", "data", "faq.txt"),
  ];

  static findKnowledgeBasePath(): string | null {
    for (const filePath of this.POSSIBLE_FILE_PATHS) {
      if (fs.existsSync(filePath)) {
        console.log(`Found FAQ file: ${path.basename(filePath)}`);
        return filePath;
      }
    }

    console.error("FAQ file not found in any of these locations:");
    this.POSSIBLE_FILE_PATHS.forEach((f) => console.error(`  - ${f}`));
    return null;
  }

  static async generateAnswer(question: string): Promise<string> {
    const knowledgeBasePath = this.findKnowledgeBasePath();

    if (!knowledgeBasePath) {
      throw new Error("Knowledge base not found");
    }

    console.log(`Question: "${question}"`);

    const vectorStoreManager = VectorStoreManager.getInstance();
    await vectorStoreManager.loadKnowledgeBase(knowledgeBasePath);
    const relevantDocs = await vectorStoreManager.searchRelevantDocuments(
      question,
      3
    );

    if (!relevantDocs || relevantDocs.length === 0) {
      throw new Error("No relevant documents found");
    }

    const context = relevantDocs.join("\n\n");

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
      throw new Error("GOOGLE_API_KEY not configured properly");
    }

    console.log("Context length:", context.length);
    console.log("API Key configured:", !!apiKey);

    const llm = new ChatGoogleGenerativeAI({
      apiKey: apiKey,
      model: "gemini-2.5-flash",
      temperature: 0.7,
    });

    const prompt = `You are a helpful assistant for Eduwise Solutions, an educational institution.

CONTEXT (from our FAQ):
${context}

INSTRUCTIONS:
1. Answer the user's question using ONLY the information from the context above
2. Be friendly, clear, and concise
3. If the answer is not in the context, say: "I don't have that information in my knowledge base, but I'd be happy to connect you with an advisor who can help."
4. Keep your answer under 150 words

USER QUESTION: ${question}

YOUR ANSWER:`;

    console.log("Calling Gemini API...");

    const result = await llm.invoke(prompt);
    console.log("Raw result:", JSON.stringify(result, null, 2));

    if (!result || !result.content) {
      throw new Error("Empty response from Gemini");
    }

    let answer: string;

    if (typeof result.content === "string") {
      answer = result.content.trim();
    } else if (Array.isArray(result.content)) {
      answer = result.content
        .map((part: any) =>
          typeof part === "string" ? part : part.text || part.content || ""
        )
        .join("")
        .trim();
    } else if (typeof result.content === "object") {
      answer = (result.content as any).text || String(result.content).trim();
    } else {
      answer = String(result.content).trim();
    }

    if (!answer || answer.length === 0) {
      throw new Error("Empty answer generated");
    }

    console.log(`Answer generated (${answer.length} chars)`);
    console.log(`Answer preview: ${answer.substring(0, 100)}...`);

    return answer;
  }
}

class GoogleSheetsLogger {
  private static isConfigured(): boolean {
    return !!(
      process.env.CHATBOT_GOOGLE_CLIENT_EMAIL &&
      process.env.CHATBOT_GOOGLE_PRIVATE_KEY &&
      process.env.CHATBOT_GOOGLE_SHEET_ID
    );
  }

  private static async getAuthenticatedSheets() {
    const privateKey = process.env.CHATBOT_GOOGLE_PRIVATE_KEY;
    if (!privateKey || typeof privateKey !== "string") {
      throw new Error("Invalid GOOGLE_PRIVATE_KEY format");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.CHATBOT_GOOGLE_CLIENT_EMAIL!,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
  }

  private static async findExistingRow(
    sheets: any,
    spreadsheetId: string,
    sessionId: string
  ): Promise<number | null> {
    const read = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A2:G",
    });

    const rows = read.data.values || [];
    const existingIndex = rows.findIndex(
      (row: string[]) => row[0] === sessionId
    );

    return existingIndex >= 0 ? existingIndex + 2 : null;
  }

  private static async updateExistingRow(
    sheets: any,
    spreadsheetId: string,
    rowNum: number,
    sessionId: string,
    userData?: UserData,
    question?: string,
    answer?: string
  ): Promise<void> {
    const timestamp = new Date().toISOString();

    if (userData) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!C${rowNum}:F${rowNum}`,
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [
              userData.name || "",
              userData.phone || "",
              userData.qualification || "",
              userData.email || "",
            ],
          ],
        },
      });
    }

    if (question && answer) {
      const read = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `Sheet1!G${rowNum}`,
      });

      const existingConversation = (read.data.values?.[0]?.[0] as string) || "";
      const newEntry = `Q: ${question}\nA: ${answer}`;
      const updatedConversation = existingConversation
        ? `${existingConversation}\n\n---\n\n${newEntry}`
        : newEntry;

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!G${rowNum}`,
        valueInputOption: "RAW",
        requestBody: { values: [[updatedConversation]] },
      });
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!B${rowNum}`,
      valueInputOption: "RAW",
      requestBody: { values: [[timestamp]] },
    });
  }

  private static async appendNewRow(
    sheets: any,
    spreadsheetId: string,
    sessionId: string,
    userData?: UserData,
    question?: string,
    answer?: string
  ): Promise<void> {
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A2:G",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            sessionId,
            timestamp,
            userData?.name || "",
            userData?.phone || "",
            userData?.qualification || "",
            userData?.email || "",
            question && answer ? `Q: ${question}\nA: ${answer}` : "",
          ],
        ],
      },
    });
  }

  static async log(
    sessionId: string,
    userData?: UserData,
    question?: string,
    answer?: string
  ): Promise<void> {
    if (!this.isConfigured()) {
      console.log("Google Sheets logging not configured, skipping...");
      return;
    }

    try {
      const sheets = await this.getAuthenticatedSheets();
      const spreadsheetId = process.env.CHATBOT_GOOGLE_SHEET_ID!;

      const rowNum = await this.findExistingRow(
        sheets,
        spreadsheetId,
        sessionId
      );

      if (rowNum) {
        await this.updateExistingRow(
          sheets,
          spreadsheetId,
          rowNum,
          sessionId,
          userData,
          question,
          answer
        );
      } else {
        await this.appendNewRow(
          sheets,
          spreadsheetId,
          sessionId,
          userData,
          question,
          answer
        );
      }

      console.log("Logged to Google Sheets successfully");
    } catch (error: any) {
      console.error("Sheets logging error:", error.message);
    }
  }
}

async function handleChatRequest(body: ChatRequest): Promise<ChatResponse> {
  const { sessionId, question, userData } = body;

  console.log(`\n${"=".repeat(50)}`);
  console.log(`New request - Session: ${sessionId?.substring(0, 8)}...`);

  if (!sessionId) {
    throw new Error("Session ID required");
  }

  if (!question && !userData) {
    throw new Error("Question or userData required");
  }

  let answer: string | null = null;
  const pdf: string = "/data/faq.pdf";

  if (question) {
    try {
      answer = await KnowledgeBaseService.generateAnswer(question);
    } catch (error: any) {
      console.error("Processing error:", error.message);
      answer =
        "I apologize, but I'm having trouble accessing information right now. Please try asking your question again, or I can connect you with an advisor for immediate assistance.";
    }
  }

  await GoogleSheetsLogger.log(
    sessionId,
    userData,
    question,
    answer || undefined
  );

  console.log(`${"=".repeat(50)}\n`);

  return {
    answer: answer || "I'm ready to help! What would you like to know?",
    pdf,
    needsAdvisor: !answer,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const response = await handleChatRequest(body);
    return NextResponse.json(response);
  } catch (err: any) {
    console.error("Fatal error:", err);

    const isClientError = err.message.includes("required");
    const statusCode = isClientError ? 400 : 500;

    return NextResponse.json(
      {
        error: "Failed to process request",
        answer:
          "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        details: err.message,
        needsAdvisor: true,
      },
      { status: statusCode }
    );
  }
}

export const dynamic = "force-dynamic";
