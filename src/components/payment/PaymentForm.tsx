"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

// Add Razorpay types
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  amount: number;
  currency: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  key: string;
  modal: {
    ondismiss: () => void;
  };
  name: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  close: () => void;
  on: (event: string, handler: (response: RazorpayResponse) => void) => void;
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface PaymentFormProps {
  amount: number;
  onPaymentComplete?: (
    status: "success" | "failure" | "cancelled",
    message: string
  ) => void;
  programName: string;
}

export default function PaymentForm({
  amount,
  programName,
  onPaymentComplete,
}: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    mobile: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      fullName: "",
      mobile: "",
    };

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      // Create order
      const response = await fetch("/api/create-order", {
        body: JSON.stringify({ amount }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await response.json();

      if (!data.order) {
        throw new Error("Failed to create order");
      }

      // Initialize Razorpay
      const options: RazorpayOptions = {
        amount: data.order.amount,
        currency: data.order.currency,
        description: `${programName} Payment`,
        async handler(response: RazorpayResponse) {
          try {
            setIsVerifying(true);
            // Verify payment
            const verifyResponse = await fetch("/api/verify-payment", {
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Store user data in Google Sheets
              await storeUserData(response.razorpay_payment_id);

              if (onPaymentComplete) {
                onPaymentComplete(
                  "success",
                  `Your payment was successful! Welcome to our ${programName}.`
                );
              }
            } else if (onPaymentComplete) {
              onPaymentComplete(
                "failure",
                "Payment verification failed. Please contact support."
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            if (onPaymentComplete) {
              onPaymentComplete(
                "failure",
                "Payment verification failed. Please contact support."
              );
            }
          } finally {
            setIsVerifying(false);
          }
        },
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        modal: {
          ondismiss() {
            if (onPaymentComplete) {
              onPaymentComplete(
                "cancelled",
                "You have cancelled the payment process."
              );
            }
          },
        },
        name: "Eduwise Solutions",
        order_id: data.order.id,
        prefill: {
          contact: formData.mobile,
          email: formData.email,
          name: formData.fullName,
        },
        theme: {
          color: "#04956A",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      if (onPaymentComplete) {
        onPaymentComplete(
          "failure",
          "Failed to initiate payment. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const storeUserData = async (paymentId: string) => {
    try {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      // Store data in Google Sheets
      const response = await fetch("/api/contact-form", {
        body: JSON.stringify({
          email: formData.email,
          firstName,
          lastName,
          message: `Payment ID: ${paymentId}`,
          mobile: formData.mobile, // This will be stored in "Mobile Number" column
          subject: programName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await response.json();

      if (!data.success) {
        console.error("Failed to store user data:", data.error);
      }
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  return (
    <div className="relative rounded-lg bg-white p-4">
      {isVerifying && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-white/80 backdrop-blur-xs">
          <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary-75" />
          <p className="font-semibold text-gray-900 text-lg">
            Verifying payment...
          </p>
          <p className="mt-2 px-4 text-center text-gray-500 text-sm">
            Please do not close this window
          </p>
        </div>
      )}

      <h3 className="mb-4 font-semibold text-xl">Complete Your Enrollment</h3>

      <div className="space-y-4">
        <div>
          <label
            className="mb-1 block font-medium text-gray-700 text-sm"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className={`w-full rounded-md border px-3 py-2 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            id="fullName"
            name="fullName"
            onChange={handleInputChange}
            placeholder="Enter your full name"
            type="text"
            value={formData.fullName}
          />
          {errors.fullName && (
            <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            className="mb-1 block font-medium text-gray-700 text-sm"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className={`w-full rounded-md border px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            id="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Enter your email address"
            type="email"
            value={formData.email}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            className="mb-1 block font-medium text-gray-700 text-sm"
            htmlFor="mobile"
          >
            Mobile Number
          </label>
          <input
            className={`w-full rounded-md border px-3 py-2 ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            }`}
            id="mobile"
            name="mobile"
            onChange={handleInputChange}
            placeholder="Enter your 10-digit mobile number"
            type="tel"
            value={formData.mobile}
          />
          {errors.mobile && (
            <p className="mt-1 text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

        <div className="pt-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-75 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-85 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            onClick={handlePayment}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>Pay Now ₹{amount}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
