import { defineField, defineType } from "sanity";

export const courseType = defineType({
  name: "course",
  title: "Course",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "curriculum", title: "Curriculum" },
    { name: "pricing", title: "Pricing" },
    { name: "extras", title: "Extras" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Content Group
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Tagline",
      type: "string",
      group: "content",
      description:
        'E.g. "Become a DevOps Engineer with 100% Placement Assurance"',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      group: "content",
      rows: 3,
      description: "Used in hero section and SEO fallback.",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Development", value: "development" },
          { title: "AI & Data", value: "ai-data" },
          { title: "Cloud, DevOps & Security", value: "cloud-devops-security" },
          { title: "Engineering & Design", value: "engineering" },
          { title: "Business & Finance", value: "business" },
          { title: "Career", value: "career" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color (Tailwind gradient)",
      type: "string",
      group: "content",
      description: 'E.g. "from-blue-500 to-cyan-500"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Emoji Icon",
      type: "string",
      group: "content",
      description: 'Single emoji, e.g. "🚀"',
      validation: (Rule) => Rule.required().max(4),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "content",
      description: 'E.g. "3.5 Months"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage?",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),

    // Stats (hero counters)
    defineField({
      name: "stats",
      title: "Hero Stats",
      type: "array",
      group: "content",
      description: "Counter items shown below the hero image.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: 'Lucide icon name, e.g. "Users", "Clock"',
            },
            {
              name: "value",
              title: "Value",
              type: "string",
              description: 'E.g. "2000+"',
            },
            {
              name: "label",
              title: "Label",
              type: "string",
              description: 'E.g. "Students Trained"',
            },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),

    // Features — "Why Choose This Program"
    defineField({
      name: "features",
      title: "Program Features (Why Choose)",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon Name", type: "string" },
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(6),
    }),

    // Highlights — "Program Benefits"
    defineField({
      name: "highlights",
      title: "Program Benefits / Highlights",
      type: "array",
      group: "content",
      description:
        "Category-grouped benefit cards (e.g. Classes, Projects, Support, Certification).",
      of: [
        {
          type: "object",
          fields: [
            { name: "category", title: "Category Name", type: "string" },
            { name: "icon", title: "Icon Name", type: "string" },
            {
              name: "color",
              title: "Gradient Color",
              type: "string",
              description: 'E.g. "from-blue-500 to-blue-600"',
            },
            {
              name: "points",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: { select: { title: "category" } },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),

    // Curriculum Group
    defineField({
      name: "modules",
      title: "Curriculum Modules",
      type: "array",
      group: "curriculum",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Module Title", type: "string" },
            {
              name: "description",
              title: "Module Description",
              type: "string",
            },
            {
              name: "submodules",
              title: "Sub Modules",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Sub Module Name", type: "string" },
                    {
                      name: "subtopics",
                      title: "Subtopics",
                      type: "array",
                      of: [{ type: "string" }],
                    },
                    {
                      name: "handsOn",
                      title: "Hands-on",
                      type: "array",
                      of: [{ type: "string" }],
                    },
                  ],
                  preview: { select: { title: "title" } },
                },
              ],
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Curriculum Journey (Sections 2-5)
    defineField({
      name: "isJobGuaranteeProgram",
      title: "Is Job Guarantee Program?",
      type: "boolean",
      group: "curriculum",
      description:
        "Enable to show Placement Readiness Test, ISA Agreement, and Career Track sections.",
      initialValue: false,
    }),
    defineField({
      name: "prtSteps",
      title: "Placement Readiness Test Steps",
      type: "array",
      group: "curriculum",
      description:
        "Milestones students must complete to qualify for placement.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      hidden: ({ document }) => !document?.isJobGuaranteeProgram,
    }),
    defineField({
      name: "isaSteps",
      title: "ISA Agreement Steps",
      type: "array",
      group: "curriculum",
      description: "Steps for the Income Share Agreement process.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      hidden: ({ document }) => !document?.isJobGuaranteeProgram,
    }),
    defineField({
      name: "careerTrack",
      title: "Career Track Items",
      type: "array",
      group: "curriculum",
      description: "Career development areas and their topics.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
            {
              name: "topics",
              title: "Topics",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      hidden: ({ document }) => !document?.isJobGuaranteeProgram,
    }),
    defineField({
      name: "hiringPartners",
      title: "Hiring Partners",
      type: "array",
      group: "curriculum",
      description: "List of company names that hire graduates of this course.",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Company Name", type: "string" },
            {
              name: "logo",
              title: "Company Logo",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: "name", media: "logo" } },
        },
      ],
    }),
    defineField({
      name: "careerServiceFee",
      title: "Career Service Fee (₹)",
      type: "number",
      group: "curriculum",
      description: "Fee payable after placement, in INR. E.g. 20000",
      hidden: ({ document }) => !document?.isJobGuaranteeProgram,
    }),

    // Pricing Group
    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      group: "pricing",
      description: "Current discounted price in INR.",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (₹)",
      type: "number",
      group: "pricing",
      description: "Strikethrough price shown for comparison.",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "emiOption",
      title: "EMI Option",
      type: "string",
      group: "pricing",
      description: 'E.g. "₹5,000/month" — leave empty if no EMI.',
    }),
    defineField({
      name: "whatsIncluded",
      title: "What's Included",
      type: "array",
      group: "pricing",
      description: "Bullet points shown on the pricing card.",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(3),
    }),

    // Extras Group (Optional)
    defineField({
      name: "careerPaths",
      title: "Career Opportunities",
      type: "array",
      group: "extras",
      description: "Career roles with optional salary ranges.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Job Title", type: "string" },
            {
              name: "salary",
              title: "Salary Range",
              type: "string",
              description: 'E.g. "₹8-15 LPA"',
            },
            { name: "icon", title: "Icon Name", type: "string" },
          ],
          preview: { select: { title: "title", subtitle: "salary" } },
        },
      ],
    }),
    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "array",
      group: "extras",
      description: "Who should take this course.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "icon", title: "Icon Name", type: "string" },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "tools",
      title: "Tools & Technologies",
      type: "array",
      group: "extras",
      description: "Technology logos/names used in this course.",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Tool Name", type: "string" },
            {
              name: "logo",
              title: "Tool Logo",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: "name", media: "logo" } },
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "extras",
      description: "Course-specific frequently asked questions.",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text", rows: 3 },
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
    defineField({
      name: "batchInfo",
      title: "Batch Info",
      type: "object",
      group: "extras",
      description: "Optional floating card info in hero section.",
      fields: [
        {
          name: "label",
          title: "Label",
          type: "string",
          description: 'E.g. "Batch 2026"',
        },
        {
          name: "status",
          title: "Status",
          type: "string",
          description: 'E.g. "Admissions Open"',
        },
        {
          name: "enrolledCount",
          title: "Enrolled Count",
          type: "string",
          description: 'E.g. "2000+ Students Enrolled"',
        },
      ],
    }),
    defineField({
      name: "industryGrowth",
      title: "Industry Growth %",
      type: "string",
      group: "extras",
      description: 'Optional badge on career section, e.g. "+45%".',
    }),

    // SEO Group
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Override for page title tag. Falls back to course title.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "seo",
      rows: 2,
      description:
        "Override for meta description. Falls back to course description.",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "heroImage",
    },
  },
  orderings: [
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
  ],
});
