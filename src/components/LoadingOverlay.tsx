import { Send } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg text-center max-w-sm mx-4 border border-light-90">
        {/* Loading Animation Container */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 rounded-full border-4 border-primary-95" />
          <div className="absolute inset-0 rounded-full border-4 border-primary-75 border-t-transparent animate-spin" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Send size={20} className="text-primary-75 opacity-80" />
          </div>
        </div>

        {/* Loading Text */}
        <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-2">
          Sending Message
        </h3>
        <p className="text-grey-35">
          Please wait while we process your request...
        </p>

        {/* Progress Bar */}
        <div className="mt-6 h-1 bg-light-90 rounded-full overflow-hidden">
          <div className="h-full bg-primary-75 rounded-full animate-progress origin-left" />
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
