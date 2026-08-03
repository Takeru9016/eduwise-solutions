import { Send } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
      <div className="mx-4 max-w-sm rounded-xl border border-light-90 bg-white/90 p-8 text-center shadow-lg">
        {/* Loading Animation Container */}
        <div className="relative mx-auto mb-6 h-16 w-16">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 rounded-full border-4 border-primary-95" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary-75 border-t-transparent" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Send className="text-primary-75 opacity-80" size={20} />
          </div>
        </div>

        {/* Loading Text */}
        <h3 className="mb-2 font-semibold font-vietnam text-grey-20 text-lg">
          Sending Message
        </h3>
        <p className="text-grey-35">
          Please wait while we process your request...
        </p>

        {/* Progress Bar */}
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-light-90">
          <div className="h-full origin-left animate-progress rounded-full bg-primary-75" />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(0.7);
          }
          100% {
            transform: scaleX(0.9);
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
