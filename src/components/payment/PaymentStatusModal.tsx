import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useCallback, useEffect } from "react";

interface PaymentStatusModalProps {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
  status: "success" | "failure" | "cancelled";
}

interface StatusDetails {
  bgColor: string;
  color: string;
  description: string;
  icon: typeof CheckCircle2;
  title: string;
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
      if (e.key === "Escape") {
        onClose();
      }
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

  if (!isOpen) {
    return null;
  }

  const getStatusDetails = (): StatusDetails => {
    switch (status) {
      case "success":
        return {
          bgColor: "bg-green-50",
          color: "text-green-500",
          description:
            message || "Thank you for enrolling in our Professional Program.",
          icon: CheckCircle2,
          title: "Payment Successful!",
        };
      case "failure":
        return {
          bgColor: "bg-red-50",
          color: "text-red-500",
          description:
            message ||
            "There was an error processing your payment. Please try again.",
          icon: XCircle,
          title: "Payment Failed",
        };
      case "cancelled":
        return {
          bgColor: "bg-yellow-50",
          color: "text-yellow-500",
          description: message || "You have cancelled the payment process.",
          icon: AlertCircle,
          title: "Payment Cancelled",
        };
    }
  };

  const details = getStatusDetails();
  const Icon = details.icon;

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
      <div className="relative mx-4 w-full max-w-md transform rounded-lg bg-white p-8 shadow-xl transition-all duration-300 ease-in-out">
        <div
          className={`${details.bgColor} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full`}
        >
          <Icon className={`h-8 w-8 ${details.color}`} />
        </div>

        <h3 className="mb-2 text-center font-bold font-vietnam text-2xl text-grey-15">
          {details.title}
        </h3>

        <p className="mb-6 text-center text-grey-35">{details.description}</p>

        <div className="flex justify-center">
          <button
            aria-label={status === "success" ? "Continue" : "Try Again Later"}
            className="rounded-lg bg-primary-75 px-6 py-2 font-semibold text-white transition-colors hover:bg-primary-85"
            onClick={onClose}
          >
            {status === "success" ? "Continue" : "Try Again Later"}
          </button>
        </div>
      </div>
    </div>
  );
}
