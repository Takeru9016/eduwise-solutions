import fs from "node:fs";
import path from "node:path";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { google } from "googleapis";
import { type NextRequest, NextResponse } from "next/server";

interface VectorDocument {
  content: string;
  embedding: number[];
}

interface ChatRequest {
  question?: string;
  sessionId: string;
  userData?: UserData;
}

interface UserData {
  email?: string;
  name?: string;
  phone?: string;
  qualification?: string;
}

interface ChatResponse {
  answer: string;
  needsAdvisor?: boolean;
  pdf?: string;
  whatsappLink?: string;
}

interface SimilarityResult {
  content: string;
  index: number;
  similarity: number;
}

interface MessageContent {
  content?: string;
  text?: string;
}

type MessageContentType = string | MessageContent | MessageContent[];

function generateWhatsAppLink(
  question: string,
  userData?: { name?: string; phone?: string; email?: string }
): string {
  const phoneNumber = process.env.WHATSAPP_SUPPORT_NUMBER;

  let message = "Hi Eduwise Team! 👋\n\n";

  if (userData?.name) {
    message += `My name is ${userData.name}.\n`;
  }

  if (userData?.phone) {
    message += `Phone: ${userData.phone}\n`;
  }

  if (userData?.email) {
    message += `Email: ${userData.email}\n`;
  }

  message += `\nI have a question:\n${question}\n\nCould you please help me with this?`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
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
      chunkOverlap: 200,
      chunkSize: 1500,
    });

    const chunks = await splitter.splitText(text);
    console.log(`Split into ${chunks.length} chunks`);

    if (!this.embeddings) {
      this.embeddings = new HuggingFaceInferenceEmbeddings({
        apiKey: process.env.HUGGINGFACE_API_KEY,
        model: "sentence-transformers/all-MiniLM-L6-v2",
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

  async searchRelevantDocuments(query: string, k = 5): Promise<string[]> {
    if (!(this.vectorStore && this.embeddings)) {
      throw new Error("Vector store not initialized");
    }

    console.log(`Searching for: "${query}"`);

    const queryEmbedding = await this.embeddings.embedQuery(query);

    const similarities: SimilarityResult[] = this.vectorStore.map(
      (doc, index) => ({
        content: doc.content,
        index,
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
    path.join(process.cwd(), "data", "faq.txt"),
    path.join(process.cwd(), "data", "faq.md"),
    path.join(process.cwd(), "src", "data", "faq.txt"),
    path.join(process.cwd(), "src", "data", "faq.md"),
    path.join(process.cwd(), "public", "data", "faq.txt"),
  ];

  static findKnowledgeBasePath(): string | null {
    for (const filePath of KnowledgeBaseService.POSSIBLE_FILE_PATHS) {
      if (fs.existsSync(filePath)) {
        console.log(`Found FAQ file: ${path.basename(filePath)}`);
        return filePath;
      }
    }

    console.error("FAQ file not found in any of these locations:");
    KnowledgeBaseService.POSSIBLE_FILE_PATHS.forEach((f) =>
      console.error(`  - ${f}`)
    );
    return null;
  }

  private static parseMessageContent(content: MessageContentType): string {
    if (typeof content === "string") {
      return content.trim();
    }

    if (Array.isArray(content)) {
      return content
        .map((part) => {
          if (typeof part === "string") {
            return part;
          }
          return part.text || part.content || "";
        })
        .join("")
        .trim();
    }

    if (typeof content === "object" && content !== null) {
      const messageContent = content as MessageContent;
      return messageContent.text || String(content).trim();
    }

    return String(content).trim();
  }

  static async generateAnswer(question: string): Promise<string> {
    const knowledgeBasePath = KnowledgeBaseService.findKnowledgeBasePath();

    if (!knowledgeBasePath) {
      throw new Error("Knowledge base not found");
    }

    console.log(`Question: "${question}"`);

    const vectorStoreManager = VectorStoreManager.getInstance();
    await vectorStoreManager.loadKnowledgeBase(knowledgeBasePath);
    const relevantDocs = await vectorStoreManager.searchRelevantDocuments(
      question,
      5
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
      apiKey,
      model: "gemini-2.5-flash",
      temperature: 0.7,
    });

    const prompt = `You are a helpful assistant for Eduwise Solutions, an educational institution.

CONTEXT (from our FAQ):
${context}

INSTRUCTIONS:
1. Answer the user's question using the information from the context above
2. If you find pricing or fee information in the context, present it clearly with all details
3. Be friendly, clear, and concise
4. If the exact answer is not in the context but related information exists, provide what you can find
5. If NO relevant information exists in the context, respond EXACTLY with: "NEED_ADVISOR"
6. For fee-related questions, include the full pricing structure if available in context
7. Keep your answer under 50 words unless providing detailed pricing

USER QUESTION: ${question}

YOUR ANSWER:`;

    console.log("Calling Gemini API...");

    const result = await llm.invoke(prompt);
    console.log("Raw result:", JSON.stringify(result, null, 2));

    if (!result?.content) {
      throw new Error("Empty response from Gemini");
    }

    const content = typeof result.content === "string" ? result.content : "";
    const answer = KnowledgeBaseService.parseMessageContent(content);

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

    return google.sheets({ auth, version: "v4" });
  }

  private static async findExistingRow(
    sheets: ReturnType<typeof google.sheets>,
    spreadsheetId: string,
    sessionId: string
  ): Promise<number | null> {
    const read = await sheets.spreadsheets.values.get({
      range: "Sheet1!A2:G",
      spreadsheetId,
    });

    const rows = read.data.values || [];
    const existingIndex = rows.findIndex(
      (row: string[]) => row[0] === sessionId
    );

    return existingIndex >= 0 ? existingIndex + 2 : null;
  }

  private static async updateExistingRow(
    sheets: ReturnType<typeof google.sheets>,
    spreadsheetId: string,
    rowNum: number,
    _sessionId: string,
    userData?: UserData,
    question?: string,
    answer?: string
  ): Promise<void> {
    const timestamp = new Date().toISOString();

    if (userData) {
      await sheets.spreadsheets.values.update({
        range: `Sheet1!C${rowNum}:F${rowNum}`,
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
        spreadsheetId,
        valueInputOption: "RAW",
      });
    }

    if (question && answer) {
      const read = await sheets.spreadsheets.values.get({
        range: `Sheet1!G${rowNum}`,
        spreadsheetId,
      });

      const existingConversation = (read.data.values?.[0]?.[0] as string) || "";
      const newEntry = `Q: ${question}\nA: ${answer}`;
      const updatedConversation = existingConversation
        ? `${existingConversation}\n\n---\n\n${newEntry}`
        : newEntry;

      await sheets.spreadsheets.values.update({
        range: `Sheet1!G${rowNum}`,
        requestBody: { values: [[updatedConversation]] },
        spreadsheetId,
        valueInputOption: "RAW",
      });
    }

    await sheets.spreadsheets.values.update({
      range: `Sheet1!B${rowNum}`,
      requestBody: { values: [[timestamp]] },
      spreadsheetId,
      valueInputOption: "RAW",
    });
  }

  private static async appendNewRow(
    sheets: ReturnType<typeof google.sheets>,
    spreadsheetId: string,
    sessionId: string,
    userData?: UserData,
    question?: string,
    answer?: string
  ): Promise<void> {
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      range: "Sheet1!A2:G",
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
      spreadsheetId,
      valueInputOption: "RAW",
    });
  }

  static async log(
    sessionId: string,
    userData?: UserData,
    question?: string,
    answer?: string
  ): Promise<void> {
    if (!GoogleSheetsLogger.isConfigured()) {
      console.log("Google Sheets logging not configured, skipping...");
      return;
    }

    try {
      const sheets = await GoogleSheetsLogger.getAuthenticatedSheets();
      const spreadsheetId = process.env.CHATBOT_GOOGLE_SHEET_ID!;

      const rowNum = await GoogleSheetsLogger.findExistingRow(
        sheets,
        spreadsheetId,
        sessionId
      );

      if (rowNum) {
        await GoogleSheetsLogger.updateExistingRow(
          sheets,
          spreadsheetId,
          rowNum,
          sessionId,
          userData,
          question,
          answer
        );
      } else {
        await GoogleSheetsLogger.appendNewRow(
          sheets,
          spreadsheetId,
          sessionId,
          userData,
          question,
          answer
        );
      }

      console.log("Logged to Google Sheets successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Sheets logging error:", error.message);
      } else {
        console.error("Sheets logging error:", String(error));
      }
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

  if (!(question || userData)) {
    throw new Error("Question or userData required");
  }

  let answer: string | null = null;
  let whatsappLink: string | undefined;
  const pdf: string = "/data/faq.pdf";

  if (question) {
    try {
      const generatedAnswer =
        await KnowledgeBaseService.generateAnswer(question);

      if (
        generatedAnswer === "NEED_ADVISOR" ||
        generatedAnswer.trim() === "NEED_ADVISOR" ||
        generatedAnswer.toLowerCase().includes("i don't have that information")
      ) {
        whatsappLink = generateWhatsAppLink(question, userData);

        answer =
          "I don't have that specific information in my knowledge base right now. But don't worry! Our expert advisors are here to help you. Click the WhatsApp button below to chat with us directly and get instant assistance! 💬";

        console.log("🔗 WhatsApp link generated for unanswered question");
      } else {
        answer = generatedAnswer;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Processing error:", error.message);
      } else {
        console.error("Processing error:", String(error));
      }

      whatsappLink = generateWhatsAppLink(question, userData);

      answer =
        "I apologize, but I'm having trouble accessing information right now. Please connect with our advisors on WhatsApp for immediate assistance!";
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
    needsAdvisor: !!whatsappLink,
    pdf,
    whatsappLink,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const response = await handleChatRequest(body);
    return NextResponse.json(response);
  } catch (err) {
    console.error("Fatal error:", err);

    const errorMessage = err instanceof Error ? err.message : String(err);
    const isClientError = errorMessage.includes("required");
    const statusCode = isClientError ? 400 : 500;

    return NextResponse.json(
      {
        answer:
          "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        details: errorMessage,
        error: "Failed to process request",
        needsAdvisor: true,
      },
      { status: statusCode }
    );
  }
}

export const dynamic = "force-dynamic";
