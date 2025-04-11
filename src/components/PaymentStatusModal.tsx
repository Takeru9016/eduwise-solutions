import { useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "failure" | "cancelled";
  message?: string;
}

interface StatusDetails {
  icon: typeof CheckCircle2;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export default function PaymentStatusModal({
  isOpen,
  onClose,
  status,
  message,
}: PaymentStatusModalProps) {
  // Handle escape key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const getStatusDetails = (): StatusDetails => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle2,
          title: "Payment Successful!",
          description:
            message || "Thank you for enrolling in our Professional Program.",
          color: "text-green-500",
          bgColor: "bg-green-50",
        };
      case "failure":
        return {
          icon: XCircle,
          title: "Payment Failed",
          description:
            message ||
            "There was an error processing your payment. Please try again.",
          color: "text-red-500",
          bgColor: "bg-red-50",
        };
      case "cancelled":
        return {
          icon: AlertCircle,
          title: "Payment Cancelled",
          description: message || "You have cancelled the payment process.",
          color: "text-yellow-500",
          bgColor: "bg-yellow-50",
        };
    }
  };

  const details = getStatusDetails();
  const Icon = details.icon;

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
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl transform transition-all duration-300 ease-in-out">
        <div
          className={`${details.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className={`w-8 h-8 ${details.color}`} />
        </div>

        <h3 className="text-2xl font-vietnam font-bold text-grey-15 text-center mb-2">
          {details.title}
        </h3>

        <p className="text-grey-35 text-center mb-6">{details.description}</p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-primary-75 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-85 transition-colors"
            aria-label={status === "success" ? "Continue" : "Try Again Later"}
          >
            {status === "success" ? "Continue" : "Try Again Later"}
          </button>
        </div>
      </div>
    </div>
  );
}
