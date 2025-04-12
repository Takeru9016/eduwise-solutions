"use client";

import { X } from "lucide-react";

import PaymentForm from "./PaymentForm";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  programName: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  amount,
  programName,
}: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl transform transition-all duration-300 ease-in-out">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-2">
          <PaymentForm amount={amount} programName={programName} />
        </div>
      </div>
    </div>
  );
} 