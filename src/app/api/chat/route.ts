import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { CHATBOT_KNOWLEDGE_QUERY } from "@/sanity/lib/queries";

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

interface KnowledgeCourse {
  category: string;
  description: string;
  duration: string;
  emiOption: string | null;
  faq: { answer: string; question: string }[] | null;
  isJobGuaranteeProgram: boolean | null;
  originalPrice: number | null;
  price: number;
  subtitle: string;
  title: string;
  whatsIncluded: string[] | null;
}

interface KnowledgeFaqCategory {
  questions: { answer: string; question: string }[];
  title: string;
}

interface ChatbotKnowledge {
  courses: KnowledgeCourse[];
  devopsFaq: KnowledgeFaqCategory | null;
  faqCategories: KnowledgeFaqCategory[];
}

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

/**
 * Renders live Sanity content (courses, FAQs) into plain text for the
 * chatbot's knowledge base, replacing a hand-maintained faq.txt file that
 * drifted out of sync with the site and was eventually deleted entirely.
 */
function formatKnowledgeBaseText(knowledge: ChatbotKnowledge): string {
  const sections: string[] = [];

  for (const course of knowledge.courses) {
    const lines = [
      `# Course: ${course.title}`,
      `Category: ${course.category}`,
      `Subtitle: ${course.subtitle}`,
      `Description: ${course.description}`,
      `Duration: ${course.duration}`,
      `Price: ₹${course.price.toLocaleString("en-IN")}`,
    ];

    if (course.originalPrice) {
      lines.push(
        `Original Price: ₹${course.originalPrice.toLocaleString("en-IN")}`
      );
    }
    if (course.emiOption) {
      lines.push(`EMI Option: ${course.emiOption}`);
    }
    if (course.isJobGuaranteeProgram) {
      lines.push("This course includes a Job Guarantee Program.");
    }
    if (course.whatsIncluded?.length) {
      lines.push(`What's Included: ${course.whatsIncluded.join(", ")}`);
    }
    if (course.faq?.length) {
      lines.push("Course FAQs:");
      for (const { question, answer } of course.faq) {
        lines.push(`Q: ${question}\nA: ${answer}`);
      }
    }

    sections.push(lines.join("\n"));
  }

  const allFaqCategories = [
    ...knowledge.faqCategories,
    ...(knowledge.devopsFaq ? [knowledge.devopsFaq] : []),
  ];

  for (const category of allFaqCategories) {
    const lines = [`# FAQ: ${category.title}`];
    for (const { question, answer } of category.questions) {
      lines.push(`Q: ${question}\nA: ${answer}`);
    }
    sections.push(lines.join("\n"));
  }

  return sections.join("\n\n---\n\n");
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Builds the embedded vector store from live Sanity content. Cached for an
 * hour via Next's data cache (persists across invocations, unlike an
 * in-memory singleton that resets on every serverless cold start) so the
 * knowledge base stays fresh without re-embedding on every request.
 */
const getVectorStore = unstable_cache(
  async (): Promise<VectorDocument[]> => {
    const knowledge = await client.fetch<ChatbotKnowledge>(
      CHATBOT_KNOWLEDGE_QUERY
    );
    const text = formatKnowledgeBaseText(knowledge);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkOverlap: 200,
      chunkSize: 1500,
    });
    const chunks = await splitter.splitText(text);

    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACE_API_KEY,
      model: "sentence-transformers/all-MiniLM-L6-v2",
    });
    const embeddingResults = await embeddings.embedDocuments(chunks);

    return chunks.map((content, i) => ({
      content,
      embedding: embeddingResults[i],
    }));
  },
  ["chatbot-knowledge-base-v1"],
  { revalidate: 3600, tags: ["chatbot-knowledge-base"] }
);

async function searchRelevantDocuments(
  query: string,
  k = 5
): Promise<string[]> {
  const vectorStore = await getVectorStore();

  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACE_API_KEY,
    model: "sentence-transformers/all-MiniLM-L6-v2",
  });
  const queryEmbedding = await embeddings.embedQuery(query);

  const similarities: SimilarityResult[] = vectorStore.map((doc, index) => ({
    content: doc.content,
    index,
    similarity: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  similarities.sort((a, b) => b.similarity - a.similarity);

  return similarities.slice(0, k).map((s) => s.content);
}

function parseMessageContent(content: MessageContentType): string {
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

async function generateAnswer(question: string): Promise<string> {
  const relevantDocs = await searchRelevantDocuments(question, 5);

  if (!relevantDocs || relevantDocs.length === 0) {
    throw new Error("No relevant documents found");
  }

  const context = relevantDocs.join("\n\n");

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    throw new Error("GOOGLE_API_KEY not configured properly");
  }

  const llm = new ChatGoogleGenerativeAI({
    apiKey,
    model: "gemini-2.5-flash",
    temperature: 0.7,
  });

  const prompt = `You are a helpful assistant for Eduwise Solutions, an educational institution.

CONTEXT (from our live course catalog and FAQs):
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

  const result = await llm.invoke(prompt);

  if (!result?.content) {
    throw new Error("Empty response from Gemini");
  }

  const content = typeof result.content === "string" ? result.content : "";
  const answer = parseMessageContent(content);

  if (!answer || answer.length === 0) {
    throw new Error("Empty answer generated");
  }

  return answer;
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
        client_email: process.env.CHATBOT_GOOGLE_CLIENT_EMAIL,
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
      return;
    }

    try {
      const sheets = await GoogleSheetsLogger.getAuthenticatedSheets();
      const spreadsheetId = process.env.CHATBOT_GOOGLE_SHEET_ID as string;

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
    } catch (error) {
      console.error(
        "Sheets logging error:",
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}

async function handleChatRequest(body: ChatRequest): Promise<ChatResponse> {
  const { sessionId, question, userData } = body;

  if (!sessionId) {
    throw new Error("Session ID required");
  }

  if (!(question || userData)) {
    throw new Error("Question or userData required");
  }

  let answer: string | null = null;
  let whatsappLink: string | undefined;

  if (question) {
    try {
      const generatedAnswer = await generateAnswer(question);

      if (
        generatedAnswer === "NEED_ADVISOR" ||
        generatedAnswer.trim() === "NEED_ADVISOR" ||
        generatedAnswer.toLowerCase().includes("i don't have that information")
      ) {
        whatsappLink = generateWhatsAppLink(question, userData);
        answer =
          "I don't have that specific information in my knowledge base right now. But don't worry! Our expert advisors are here to help you. Click the WhatsApp button below to chat with us directly and get instant assistance! 💬";
      } else {
        answer = generatedAnswer;
      }
    } catch (error) {
      console.error(
        "Processing error:",
        error instanceof Error ? error.message : String(error)
      );

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

  return {
    answer: answer || "I'm ready to help! What would you like to know?",
    needsAdvisor: !!whatsappLink,
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
