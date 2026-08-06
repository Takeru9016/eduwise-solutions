import { describe, expect, it } from "vitest";
import { computeRecommendedCategory, wantsJobGuaranteeProgram } from "./quiz";

describe("computeRecommendedCategory", () => {
  it("picks the category with the highest combined score", () => {
    const result = computeRecommendedCategory({
      interest: "ai-data",
      style: "ai-data",
    });
    expect(result).toBe("ai-data");
  });

  it("lets a strong style answer break a weak interest signal", () => {
    const result = computeRecommendedCategory({
      interest: "career",
      style: "development",
      timeline: "urgent",
    });
    // career: 2 (interest) + 1 (timeline) = 3, development: 1 (style) = 1
    expect(result).toBe("career");
  });

  it("falls back to career when no answers are given", () => {
    expect(computeRecommendedCategory({})).toBe("career");
  });

  it("ignores unanswered or unknown question ids", () => {
    const result = computeRecommendedCategory({
      interest: "engineering",
      somethingElse: "whatever",
    });
    expect(result).toBe("engineering");
  });
});

describe("wantsJobGuaranteeProgram", () => {
  it("returns true for a beginner in a hurry", () => {
    expect(
      wantsJobGuaranteeProgram({ experience: "beginner", timeline: "urgent" })
    ).toBe(true);
  });

  it("returns true for a career switcher in a hurry", () => {
    expect(
      wantsJobGuaranteeProgram({
        experience: "career-switch",
        timeline: "urgent",
      })
    ).toBe(true);
  });

  it("returns false for a beginner who isn't in a hurry", () => {
    expect(
      wantsJobGuaranteeProgram({ experience: "beginner", timeline: "soon" })
    ).toBe(false);
  });

  it("returns false for an upskilling professional even if urgent", () => {
    expect(
      wantsJobGuaranteeProgram({
        experience: "upskilling",
        timeline: "urgent",
      })
    ).toBe(false);
  });

  it("returns false when answers are missing", () => {
    expect(wantsJobGuaranteeProgram({})).toBe(false);
  });
});
