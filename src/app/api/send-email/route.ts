// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { createLeadFromBookingForm } from "@/lib/odoo";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define error type to avoid using 'any'
interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const {
      fullName,
      email,
      phoneNumber,
      course,
      sessionDate,
      sessionTime,
      message,
      whatsappUpdates,
    } = body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !course ||
      !sessionDate ||
      !sessionTime
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format the date for display
    const formattedDate = new Date(sessionDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Email to admin
    const adminEmailResult = await resend.emails.send({
      from: `Eduwise Solutions <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL as string,
      subject: "New Counselling Session Booking",
      html: `
      <h1>New Booking Request</h1>
      <p>A new private counselling session has been booked.</p>
      
      <h2>Client Details:</h2>
      <ul>
      <li><strong>Name:</strong> ${fullName}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phoneNumber}</li>
      <li><strong>Course Interest:</strong> ${course}</li>
      <li><strong>Session Date:</strong> ${formattedDate}</li>
      <li><strong>Session Time:</strong> ${sessionTime}</li>
      <li><strong>WhatsApp Updates:</strong> ${
        whatsappUpdates ? "Yes" : "No"
      }</li>
      </ul>
      
      ${
        message
          ? `
        <h2>Additional Message:</h2>
        <p style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #ddd">
        ${message}
        </p>
        `
          : ""
      }
      `,
    });

    // Email to client
    const clientEmailResult = await resend.emails.send({
      from: `Eduwise Solutions <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Your Counselling Session is Confirmed",
      html: `
      <h1>Your Booking is Confirmed!</h1>
      
      <p>Dear ${fullName},</p>
      <p>Thank you for booking a private counselling session with us. We have received your 
      request and are looking forward to speaking with you.</p>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 25px 0;">
      <h2 style="margin-top: 0;">Session Details:</h2>
      <ul>
      <li><strong>Your Email:</strong> ${email}</li>
      <li><strong>Your Phone Number:</strong> ${phoneNumber}</li>
      <li><strong>Date:</strong> ${formattedDate}</li>
      <li><strong>Time Slot Selected:</strong> ${sessionTime}</li>
      <li><strong>Course Interest:</strong> ${course}</li>
      ${
        message
          ? `
        <h2>Additional Message:</h2>
        <p style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #ddd">
        ${message}
        </p>
        `
          : ""
      }
      </ul>
      </div>
      
      <p>Our counselor will contact you at the scheduled time. If you need to reschedule,
      please reply to this email or contact us directly.</p>
      
      <p>Best regards,<br />
      Eduwise Solutions Team</p>
      `,
    });

    // Create lead in Odoo CRM (non-blocking - errors won't fail the request)
    try {
      const odooResult = await createLeadFromBookingForm({
        fullName,
        email,
        phoneNumber,
        course,
        sessionDate: formattedDate,
        sessionTime,
        message,
      });

      if (odooResult.success) {
        console.log("Odoo lead created for booking, ID:", odooResult.leadId);
      } else {
        console.warn("Odoo lead creation skipped or failed:", odooResult.error);
      }
    } catch (odooError) {
      console.error("Odoo integration error (non-fatal):", odooError);
    }

    return NextResponse.json(
      {
        message: "Booking confirmed successfully",
        adminEmailResult,
        clientEmailResult,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) || "Failed to process booking" },
      { status: 500 }
    );
  }
}
