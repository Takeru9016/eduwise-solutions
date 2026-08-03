import { ArrowDown, ArrowRight } from "lucide-react";
import React from "react";

interface FlowchartStep {
  _key: string;
  color?: string;
  description?: string;
  label: string;
}

interface FlowchartProps {
  direction?: "vertical" | "horizontal";
  steps: FlowchartStep[];
  title?: string;
}

export function Flowchart({
  title,
  steps,
  direction = "vertical",
}: FlowchartProps) {
  const isVertical = direction === "vertical";
  const ArrowIcon = isVertical ? ArrowDown : ArrowRight;

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {title && (
        <h3 className="mb-6 text-center font-bold text-2xl text-slate-900">
          {title}
        </h3>
      )}

      <div
        className={`flex ${
          isVertical ? "flex-col" : "flex-row flex-wrap"
        } items-center justify-center gap-4`}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step._key}>
            {/* Step Box */}
            <div
              className={`group relative rounded-lg px-6 py-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                step.color === "primary"
                  ? "bg-primary-75 text-white"
                  : step.color === "secondary"
                    ? "bg-blue-500 text-white"
                    : step.color === "success"
                      ? "bg-green-500 text-white"
                      : "border-2 border-slate-200 bg-white text-slate-900"
              }
                ${isVertical ? "w-full max-w-md" : "min-w-[200px]"}
              `}
            >
              <div className="mb-1 font-semibold text-lg">{step.label}</div>
              {step.description && (
                <div
                  className={`text-sm ${
                    step.color ? "opacity-90" : "text-slate-600"
                  }`}
                >
                  {step.description}
                </div>
              )}
            </div>

            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <div
                className={`flex items-center justify-center ${
                  isVertical ? "my-2" : "mx-2"
                }`}
              >
                <ArrowIcon
                  className="animate-pulse text-primary-75"
                  size={32}
                  strokeWidth={3}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
