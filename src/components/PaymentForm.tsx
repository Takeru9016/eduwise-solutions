"use client";

import { useState } from "react";
import { IndianRupee, Loader2 } from "lucide-react";

import PaymentStatusModal from "./PaymentStatusModal";

// Add Razorpay types
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
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
  open: () => void;
  close: () => void;
  on: (event: string, handler: (response: RazorpayResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface PaymentFormProps {
  amount: number;
  programName: string;
}

export default function PaymentForm({ amount, programName }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const [paymentStatus, setPaymentStatus] = useState<{
    isOpen: boolean;
    status: "success" | "failure" | "cancelled";
    message?: string;
  }>({
    isOpen: false,
    status: "success",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      email: "",
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!data.order) {
        throw new Error("Failed to create order");
      }

      // Initialize Razorpay
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Eduwise Solutions",
        description: `${programName} Payment`,
        order_id: data.order.id,
        handler: async function (response: RazorpayResponse) {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Store user data in Google Sheets
              await storeUserData(response.razorpay_payment_id);
              
              setPaymentStatus({
                isOpen: true,
                status: "success",
                message: `Your payment was successful! Welcome to our ${programName}.`,
              });
            } else {
              setPaymentStatus({
                isOpen: true,
                status: "failure",
                message: "Payment verification failed. Please contact support.",
              });
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            setPaymentStatus({
              isOpen: true,
              status: "failure",
              message: "Payment verification failed. Please contact support.",
            });
          }
        },
        modal: {
          ondismiss: function () {
            setPaymentStatus({
              isOpen: true,
              status: "cancelled",
              message: "You have cancelled the payment process.",
            });
          },
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus({
        isOpen: true,
        status: "failure",
        message: "Failed to initiate payment. Please try again.",
      });
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formData.email,
          mobile: formData.mobile, // This will be stored in "Mobile Number" column
          subject: programName,
          message: `Payment ID: ${paymentId}`,
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        console.error("Failed to store user data:", data.error);
      }
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const handleCloseModal = () => {
    setPaymentStatus((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4">Complete Your Enrollment</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your 10-digit mobile number"
          />
          {errors.mobile && (
            <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
          )}
        </div>
        
        <div className="pt-4">
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-primary-75 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Pay Now ₹{amount}
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Payment Status Modal */}
      <PaymentStatusModal
        isOpen={paymentStatus.isOpen}
        onClose={handleCloseModal}
        status={paymentStatus.status}
        message={paymentStatus.message}
      />
    </div>
  );
} 