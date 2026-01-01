/**
 * Odoo CRM Integration Utility
 *
 * This module provides functions to interact with Odoo CRM via XML-RPC API.
 * It handles authentication and lead creation.
 */

// Types for Odoo configuration
interface OdooConfig {
  url: string;
  db: string;
  username: string;
  apiKey: string;
}

// Types for lead data
export interface OdooLeadData {
  name: string; // Lead name/title
  contact_name?: string; // Contact person name
  email_from?: string; // Email address
  phone?: string; // Phone number
  description?: string; // Notes/description
  source?: string; // Lead source (e.g., "Website", "Booking Form")
  type?: "lead" | "opportunity"; // Lead or Opportunity
  // Custom fields
  course_interest?: string;
  session_date?: string;
  session_time?: string;
}

// Result type
interface OdooResult {
  success: boolean;
  leadId?: number;
  error?: string;
}

/**
 * Gets Odoo configuration from environment variables
 */
function getOdooConfig(): OdooConfig | null {
  const url = process.env.ODOO_URL;
  const db = process.env.ODOO_DB;
  const username = process.env.ODOO_USERNAME;
  const apiKey = process.env.ODOO_API_KEY;

  if (!url || !db || !username || !apiKey) {
    console.log(
      "Odoo environment variables not configured, skipping Odoo integration"
    );
    return null;
  }

  return { url, db, username, apiKey };
}

/**
 * Makes an XML-RPC call to Odoo
 */
async function xmlRpcCall(
  url: string,
  method: string,
  params: unknown[]
): Promise<unknown> {
  const xmlPayload = buildXmlRpcPayload(method, params);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml",
    },
    body: xmlPayload,
  });

  if (!response.ok) {
    throw new Error(`Odoo XML-RPC request failed: ${response.status}`);
  }

  const responseText = await response.text();
  return parseXmlRpcResponse(responseText);
}

/**
 * Builds XML-RPC payload
 */
function buildXmlRpcPayload(method: string, params: unknown[]): string {
  const paramsXml = params.map((param) => buildXmlValue(param)).join("");

  return `<?xml version="1.0"?>
<methodCall>
  <methodName>${method}</methodName>
  <params>${paramsXml}</params>
</methodCall>`;
}

/**
 * Converts JavaScript value to XML-RPC value
 */
function buildXmlValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "<param><value><boolean>0</boolean></value></param>";
  }

  if (typeof value === "string") {
    return `<param><value><string>${escapeXml(value)}</string></value></param>`;
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return `<param><value><int>${value}</int></value></param>`;
    }
    return `<param><value><double>${value}</double></value></param>`;
  }

  if (typeof value === "boolean") {
    return `<param><value><boolean>${value ? 1 : 0}</boolean></value></param>`;
  }

  if (Array.isArray(value)) {
    const arrayData = value
      .map((item) => `<value>${extractValueContent(item)}</value>`)
      .join("");
    return `<param><value><array><data>${arrayData}</data></array></value></param>`;
  }

  if (typeof value === "object") {
    const members = Object.entries(value as Record<string, unknown>)
      .map(
        ([key, val]) =>
          `<member><name>${escapeXml(key)}</name><value>${extractValueContent(
            val
          )}</value></member>`
      )
      .join("");
    return `<param><value><struct>${members}</struct></value></param>`;
  }

  return `<param><value><string>${escapeXml(
    String(value)
  )}</string></value></param>`;
}

/**
 * Extracts the inner value content without param wrapper
 */
function extractValueContent(value: unknown): string {
  if (value === null || value === undefined) {
    return "<boolean>0</boolean>";
  }

  if (typeof value === "string") {
    return `<string>${escapeXml(value)}</string>`;
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return `<int>${value}</int>`;
    }
    return `<double>${value}</double>`;
  }

  if (typeof value === "boolean") {
    return `<boolean>${value ? 1 : 0}</boolean>`;
  }

  if (Array.isArray(value)) {
    const arrayData = value
      .map((item) => `<value>${extractValueContent(item)}</value>`)
      .join("");
    return `<array><data>${arrayData}</data></array>`;
  }

  if (typeof value === "object") {
    const members = Object.entries(value as Record<string, unknown>)
      .map(
        ([key, val]) =>
          `<member><name>${escapeXml(key)}</name><value>${extractValueContent(
            val
          )}</value></member>`
      )
      .join("");
    return `<struct>${members}</struct>`;
  }

  return `<string>${escapeXml(String(value))}</string>`;
}

/**
 * Escapes special characters for XML
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Parses XML-RPC response
 */
function parseXmlRpcResponse(xml: string): unknown {
  // Simple parser for basic XML-RPC responses
  // Check for fault first
  if (xml.includes("<fault>")) {
    const faultMatch = xml.match(/<string>([^<]+)<\/string>/);
    throw new Error(faultMatch ? faultMatch[1] : "Unknown Odoo error");
  }

  // Extract int value (for uid and lead id)
  const intMatch = xml.match(/<int>(\d+)<\/int>/);
  if (intMatch) {
    return parseInt(intMatch[1], 10);
  }

  // Extract boolean
  const boolMatch = xml.match(/<boolean>([01])<\/boolean>/);
  if (boolMatch) {
    return boolMatch[1] === "1";
  }

  // Extract string
  const stringMatch = xml.match(/<string>([^<]*)<\/string>/);
  if (stringMatch) {
    return stringMatch[1];
  }

  return null;
}

/**
 * Authenticates with Odoo and returns the user ID
 */
async function authenticate(config: OdooConfig): Promise<number> {
  const commonUrl = `${config.url}/xmlrpc/2/common`;

  const uid = (await xmlRpcCall(commonUrl, "authenticate", [
    config.db,
    config.username,
    config.apiKey,
    {},
  ])) as number;

  if (!uid || uid === 0) {
    throw new Error("Odoo authentication failed - invalid credentials");
  }

  return uid;
}

/**
 * Creates a lead in Odoo CRM
 */
export async function createOdooLead(
  leadData: OdooLeadData
): Promise<OdooResult> {
  try {
    const config = getOdooConfig();

    if (!config) {
      return {
        success: false,
        error: "Odoo not configured",
      };
    }

    // Authenticate first
    const uid = await authenticate(config);
    console.log("Odoo authentication successful, uid:", uid);

    // Prepare lead data for Odoo
    const odooLeadData: Record<string, unknown> = {
      name: leadData.name,
      type: leadData.type || "lead",
    };

    if (leadData.contact_name)
      odooLeadData.contact_name = leadData.contact_name;
    if (leadData.email_from) odooLeadData.email_from = leadData.email_from;
    if (leadData.phone) odooLeadData.phone = leadData.phone;

    // Build description with all relevant info
    let description = leadData.description || "";
    if (leadData.source) {
      description = `Source: ${leadData.source}\n${description}`;
    }
    if (leadData.course_interest) {
      description += `\nCourse Interest: ${leadData.course_interest}`;
    }
    if (leadData.session_date) {
      description += `\nPreferred Date: ${leadData.session_date}`;
    }
    if (leadData.session_time) {
      description += `\nPreferred Time: ${leadData.session_time}`;
    }
    if (description) {
      odooLeadData.description = description;
    }

    // Create the lead using XML-RPC
    const objectUrl = `${config.url}/xmlrpc/2/object`;

    const leadId = (await xmlRpcCall(objectUrl, "execute_kw", [
      config.db,
      uid,
      config.apiKey,
      "crm.lead",
      "create",
      [odooLeadData],
    ])) as number;

    console.log("Odoo lead created successfully, lead ID:", leadId);

    return {
      success: true,
      leadId,
    };
  } catch (error) {
    console.error("Error creating Odoo lead:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Helper function to create a lead from contact form data
 */
export async function createLeadFromContactForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  subject: string;
  message?: string;
}): Promise<OdooResult> {
  return createOdooLead({
    name: `Website Inquiry - ${data.firstName} ${data.lastName}`,
    contact_name: `${data.firstName} ${data.lastName}`,
    email_from: data.email,
    phone: data.mobile,
    description: data.message || "",
    source: "Website Contact Form",
    course_interest: data.subject,
    type: "lead",
  });
}

/**
 * Helper function to create a lead from booking form data
 */
export async function createLeadFromBookingForm(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  course: string;
  sessionDate: string;
  sessionTime: string;
  message?: string;
}): Promise<OdooResult> {
  return createOdooLead({
    name: `Counselling Booking - ${data.fullName}`,
    contact_name: data.fullName,
    email_from: data.email,
    phone: data.phoneNumber,
    description: data.message || "",
    source: "Website Booking Form",
    course_interest: data.course,
    session_date: data.sessionDate,
    session_time: data.sessionTime,
    type: "lead",
  });
}
