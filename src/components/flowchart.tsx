import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

type FlowchartStep = {
  _key: string;
  label: string;
  description?: string;
  color?: string;
};

type FlowchartProps = {
  title?: string;
  steps: FlowchartStep[];
  direction?: "vertical" | "horizontal";
};

export function Flowchart({
  title,
  steps,
  direction = "vertical",
}: FlowchartProps) {
  const isVertical = direction === "vertical";
  const ArrowIcon = isVertical ? ArrowDown : ArrowRight;

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
      {title && (
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
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
              className={`
                group relative px-6 py-4 rounded-lg shadow-md
                transition-all duration-300 hover:shadow-xl hover:scale-105
                ${
                  step.color === "primary"
                    ? "bg-primary-75 text-white"
                    : step.color === "secondary"
                    ? "bg-blue-500 text-white"
                    : step.color === "success"
                    ? "bg-green-500 text-white"
                    : "bg-white text-slate-900 border-2 border-slate-200"
                }
                ${isVertical ? "w-full max-w-md" : "min-w-[200px]"}
              `}
            >
              <div className="font-semibold text-lg mb-1">{step.label}</div>
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
                  className="text-primary-75 animate-pulse"
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
