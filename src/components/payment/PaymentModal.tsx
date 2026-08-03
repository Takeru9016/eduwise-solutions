"use client";

import { X } from "lucide-react";

import PaymentForm from "./PaymentForm";

interface PaymentModalProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete?: (
    status: "success" | "failure" | "cancelled",
    message: string
  ) => void;
  programName: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  amount,
  programName,
  onPaymentComplete,
}: PaymentModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-in-out">
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-2">
          <PaymentForm
            amount={amount}
            onPaymentComplete={onPaymentComplete}
            programName={programName}
          />
        </div>
      </div>
    </div>
  );
}
