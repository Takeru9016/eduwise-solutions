// Search exclusions requested in the SEO audit spreadsheet.
// Target pages and replacement URLs are intentionally not excluded.
export const NOINDEX_PATHS = new Set([
  "/blogs/top-3-tech-courses-2026-high-paying-career",
  "/blogs/top-devops-skills-get-hired-2026",
  "/blogs/devops-tools-2026-complete-guide",
  "/blogs/devops-periodic-table-complete-guide-2026",
  "/blogs/devops-mistakes-beginners-2026",
  "/blogs/devops-market-india-2026-opportunities",
  "/blogs/devops-engineer-salary-india-2026-guide",
  "/blogs/companies-hiring-devops-roles-2026",
  "/blogs/ci-cd-pipeline-guide-devops-2026",
  "/blogs/cloud-service-equivalents-aws-azure-gcp-2026",
  "/blogs/aws-azure-gcp-devops-comparison-2026",
  "/blogs/2026-must-learn-skills-why-devops-is-the-smartest-career-move-in-india",
  "/blogs/five-strategic-pillars-of-devops-transformation",
  "/blogs/essential-linux-skills-devops-engineers",
  "/blogs/devops-interview-questions-preparation-guide",
  "/blogs/ai-devops-automation-future-engineers",
  "/blogs/aws-certification-roadmap-students-2026",
  "/blogs/become-aws-engineer-no-experience-2026",
  "/blogs/is-cybersecurity-high-salary-career-2026-india",
  "/blogs/future-cybersecurity-jobs-skills-2026",
  "/blogs/cybersecurity-salaries-india-2026-guide",
  "/blogs/why-cybersecurity-smartest-skill-2026",
  "/blogs/cybersecurity-career-guide-roadmap-2026",
  "/blogs/aws-vs-data-science-vs-web-development-2026",
  "/blogs/will-ai-replace-data-analysts-2026",
  "/blogs/is-3-5-months-enough-for-data-science-2026",
  "/blogs/ui-ux-vs-data-science-2026",
  "/blogs/12th-pass-data-scientist-guide-2026",
  "/blogs/mba-vs-data-science-2026",
  "/blogs/how-to-become-data-scientist-after-graduation-2026",
  "/blogs/top-skills-to-become-data-scientist-2026",
  "/blogs/is-data-science-good-career-india-2026",
  "/blogs/data-science-roadmap-beginners-india-2026",
  "/blogs/how-to-get-cloud-engineer-job-india-2026",
  "/blogs/cloud-engineer-roadmap-beginners-india-2026",
  "/blogs/top-skills-to-become-cloud-engineer",
  "/blogs/cloud-skills-high-demand-2026-guide",
  "/blogs/what-is-cloud-computing-complete-guide",
  "/courses/full-stack-development",
  "/courses/frontend-web-development",
  "/courses/ui-ux-product-design",
  "/courses/autocad-design",
  "/courses/placement-accelerator",
  "/courses/python-programming",
  "/courses/applied-psychology",
  "/courses/finance-and-accounting",
  "/courses/stock-market-and-investing",
  "/courses/embedded-systems-and-iot",
  "/courses/java-backend-development",
  "/courses/hr-management",
]);

// These articles remain indexable but are omitted from the sitemap.
export const SITEMAP_ONLY_EXCLUSIONS = new Set([
  "/blogs/what-is-devops-a-complete-beginner-s-guide-for-2025",
  "/blogs/rise-of-ai-machine-learning-2026",
]);

const TRAILING_SLASHES = /\/+$/;

export function normalizePath(path: string) {
  return path.replace(TRAILING_SLASHES, "") || "/";
}

export function shouldNoIndex(path: string) {
  return NOINDEX_PATHS.has(normalizePath(path));
}

export function shouldIncludeInSitemap(path: string) {
  const normalized = normalizePath(path);
  return !(
    NOINDEX_PATHS.has(normalized) || SITEMAP_ONLY_EXCLUSIONS.has(normalized)
  );
}
