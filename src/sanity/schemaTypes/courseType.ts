import { defineField, defineType } from "sanity";

export const courseType = defineType({
  fields: [
    // Content Group
    defineField({
      group: "content",
      name: "title",
      title: "Course Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      group: "content",
      name: "slug",
      options: { maxLength: 96, source: "title" },
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description:
        'E.g. "Become a DevOps Engineer with 100% Placement Assurance"',
      group: "content",
      name: "subtitle",
      title: "Subtitle / Tagline",
      type: "string",
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      description: "Used in hero section and SEO fallback.",
      group: "content",
      name: "description",
      rows: 3,
      title: "Short Description",
      type: "text",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      group: "content",
      name: "category",
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
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      name: "heroImage",
      options: { hotspot: true },
      title: "Hero Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: 'E.g. "from-blue-500 to-cyan-500"',
      group: "content",
      name: "accentColor",
      title: "Accent Color (Tailwind gradient)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: 'Single emoji, e.g. "🚀"',
      group: "content",
      name: "emoji",
      title: "Emoji Icon",
      type: "string",
      validation: (Rule) => Rule.required().max(4),
    }),
    defineField({
      description: 'E.g. "3.5 Months"',
      group: "content",
      name: "duration",
      title: "Duration",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "content",
      initialValue: false,
      name: "featured",
      title: "Featured on Homepage?",
      type: "boolean",
    }),

    // Stats (hero counters)
    defineField({
      description: "Counter items shown below the hero image.",
      group: "content",
      name: "stats",
      of: [
        {
          fields: [
            {
              description: 'Lucide icon name, e.g. "Users", "Clock"',
              name: "icon",
              title: "Icon Name",
              type: "string",
            },
            {
              description: 'E.g. "2000+"',
              name: "value",
              title: "Value",
              type: "string",
            },
            {
              description: 'E.g. "Students Trained"',
              name: "label",
              title: "Label",
              type: "string",
            },
          ],
          preview: { select: { subtitle: "value", title: "label" } },
          type: "object",
        },
      ],
      title: "Hero Stats",
      type: "array",
      validation: (Rule) => Rule.required().min(2).max(6),
    }),

    // Features — "Why Choose This Program"
    defineField({
      group: "content",
      name: "features",
      of: [
        {
          fields: [
            { name: "icon", title: "Icon Name", type: "string" },
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              rows: 2,
              title: "Description",
              type: "text",
            },
          ],
          preview: { select: { subtitle: "description", title: "title" } },
          type: "object",
        },
      ],
      title: "Program Features (Why Choose)",
      type: "array",
      validation: (Rule) => Rule.required().min(3).max(6),
    }),

    // Highlights — "Program Benefits"
    defineField({
      description:
        "Category-grouped benefit cards (e.g. Classes, Projects, Support, Certification).",
      group: "content",
      name: "highlights",
      of: [
        {
          fields: [
            { name: "category", title: "Category Name", type: "string" },
            { name: "icon", title: "Icon Name", type: "string" },
            {
              description: 'E.g. "from-blue-500 to-blue-600"',
              name: "color",
              title: "Gradient Color",
              type: "string",
            },
            {
              name: "points",
              of: [{ type: "string" }],
              title: "Bullet Points",
              type: "array",
            },
          ],
          preview: { select: { title: "category" } },
          type: "object",
        },
      ],
      title: "Program Benefits / Highlights",
      type: "array",
      validation: (Rule) => Rule.required().min(2).max(6),
    }),

    // Curriculum Group
    defineField({
      group: "curriculum",
      name: "modules",
      of: [
        {
          fields: [
            { name: "title", title: "Module Title", type: "string" },
            {
              name: "description",
              title: "Module Description",
              type: "string",
            },
            {
              name: "submodules",
              of: [
                {
                  fields: [
                    { name: "title", title: "Sub Module Name", type: "string" },
                    {
                      name: "subtopics",
                      of: [{ type: "string" }],
                      title: "Subtopics",
                      type: "array",
                    },
                    {
                      name: "handsOn",
                      of: [{ type: "string" }],
                      title: "Hands-on",
                      type: "array",
                    },
                  ],
                  preview: { select: { title: "title" } },
                  type: "object",
                },
              ],
              title: "Sub Modules",
              type: "array",
            },
          ],
          preview: { select: { subtitle: "description", title: "title" } },
          type: "object",
        },
      ],
      title: "Curriculum Modules",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
    }),

    // Curriculum Journey (Sections 2-5)
    defineField({
      description:
        "Enable to show Placement Readiness Test, ISA Agreement, and Career Track sections.",
      group: "curriculum",
      initialValue: false,
      name: "isJobGuaranteeProgram",
      title: "Is Job Guarantee Program?",
      type: "boolean",
    }),
    defineField({
      description:
        "Milestones students must complete to qualify for placement.",
      group: "curriculum",
      hidden: ({ document }) => !document?.isJobGuaranteeProgram,
      name: "prtSteps",
      of: [
        {
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              rows: 2,
              title: "Description",
              type: "text",
            },
          ],
          preview: { select: { subtitle: "description", title: "title" } },
          type: "object",
        },
      ],
      title: "Placement Readiness Test Steps",
      type: "array",
    }),
    defineField({
      description: "Steps for the Income Share Agreement process.",
      group: "curriculum",
      hidden: ({ document }) => !document?.isJobGuaranteeProgram,
      name: "isaSteps",
      of: [
        {
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              rows: 2,
              title: "Description",
              type: "text",
            },
          ],
          preview: { select: { subtitle: "description", title: "title" } },
          type: "object",
        },
      ],
      title: "ISA Agreement Steps",
      type: "array",
    }),
    defineField({
      description: "Career development areas and their topics.",
      group: "curriculum",
      hidden: ({ document }) => !document?.isJobGuaranteeProgram,
      name: "careerTrack",
      of: [
        {
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "description",
              rows: 2,
              title: "Description",
              type: "text",
            },
            {
              name: "topics",
              of: [{ type: "string" }],
              title: "Topics",
              type: "array",
            },
          ],
          preview: { select: { subtitle: "description", title: "title" } },
          type: "object",
        },
      ],
      title: "Career Track Items",
      type: "array",
    }),
    defineField({
      description: "List of company names that hire graduates of this course.",
      group: "curriculum",
      name: "hiringPartners",
      of: [
        {
          fields: [
            { name: "name", title: "Company Name", type: "string" },
            {
              name: "logo",
              options: { hotspot: true },
              title: "Company Logo",
              type: "image",
            },
          ],
          preview: { select: { media: "logo", title: "name" } },
          type: "object",
        },
      ],
      title: "Hiring Partners",
      type: "array",
    }),
    defineField({
      description: "Fee payable after placement, in INR. E.g. 20000",
      group: "curriculum",
      hidden: ({ document }) => !document?.isJobGuaranteeProgram,
      name: "careerServiceFee",
      title: "Career Service Fee (₹)",
      type: "number",
    }),

    // Pricing Group
    defineField({
      description: "Current discounted price in INR.",
      group: "pricing",
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      description: "Strikethrough price shown for comparison.",
      group: "pricing",
      name: "originalPrice",
      title: "Original Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      description: 'E.g. "₹5,000/month" — leave empty if no EMI.',
      group: "pricing",
      name: "emiOption",
      title: "EMI Option",
      type: "string",
    }),
    defineField({
      description: "Bullet points shown on the pricing card.",
      group: "pricing",
      name: "whatsIncluded",
      of: [{ type: "string" }],
      title: "What's Included",
      type: "array",
      validation: (Rule) => Rule.required().min(3),
    }),

    // Extras Group (Optional)
    defineField({
      description: "Career roles with optional salary ranges.",
      group: "extras",
      name: "careerPaths",
      of: [
        {
          fields: [
            { name: "title", title: "Job Title", type: "string" },
            {
              description: 'E.g. "₹8-15 LPA"',
              name: "salary",
              title: "Salary Range",
              type: "string",
            },
            { name: "icon", title: "Icon Name", type: "string" },
          ],
          preview: { select: { subtitle: "salary", title: "title" } },
          type: "object",
        },
      ],
      title: "Career Opportunities",
      type: "array",
    }),
    defineField({
      description: "Who should take this course.",
      group: "extras",
      name: "targetAudience",
      of: [
        {
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "icon", title: "Icon Name", type: "string" },
          ],
          preview: { select: { title: "title" } },
          type: "object",
        },
      ],
      title: "Target Audience",
      type: "array",
    }),
    defineField({
      description: "Technology logos/names used in this course.",
      group: "extras",
      name: "tools",
      of: [
        {
          fields: [
            { name: "name", title: "Tool Name", type: "string" },
            {
              name: "logo",
              options: { hotspot: true },
              title: "Tool Logo",
              type: "image",
            },
          ],
          preview: { select: { media: "logo", title: "name" } },
          type: "object",
        },
      ],
      title: "Tools & Technologies",
      type: "array",
    }),
    defineField({
      description: "Course-specific frequently asked questions.",
      group: "extras",
      name: "faq",
      of: [
        {
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", rows: 3, title: "Answer", type: "text" },
          ],
          preview: { select: { title: "question" } },
          type: "object",
        },
      ],
      title: "FAQ",
      type: "array",
    }),
    defineField({
      description: "Optional floating card info in hero section.",
      fields: [
        {
          description: 'E.g. "Batch 2026"',
          name: "label",
          title: "Label",
          type: "string",
        },
        {
          description: 'E.g. "Admissions Open"',
          name: "status",
          title: "Status",
          type: "string",
        },
        {
          description: 'E.g. "2000+ Students Enrolled"',
          name: "enrolledCount",
          title: "Enrolled Count",
          type: "string",
        },
      ],
      group: "extras",
      name: "batchInfo",
      title: "Batch Info",
      type: "object",
    }),
    defineField({
      description: 'Optional badge on career section, e.g. "+45%".',
      group: "extras",
      name: "industryGrowth",
      title: "Industry Growth %",
      type: "string",
    }),

    // SEO Group
    defineField({
      description: "Override for page title tag. Falls back to course title.",
      group: "seo",
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      description:
        "Override for meta description. Falls back to course description.",
      group: "seo",
      name: "seoDescription",
      rows: 2,
      title: "SEO Description",
      type: "text",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  groups: [
    { default: true, name: "content", title: "Content" },
    { name: "curriculum", title: "Curriculum" },
    { name: "pricing", title: "Pricing" },
    { name: "extras", title: "Extras" },
    { name: "seo", title: "SEO" },
  ],
  name: "course",
  orderings: [
    {
      by: [{ direction: "asc", field: "title" }],
      name: "titleAsc",
      title: "Title",
    },
    {
      by: [{ direction: "asc", field: "category" }],
      name: "categoryAsc",
      title: "Category",
    },
  ],
  preview: {
    select: {
      media: "heroImage",
      subtitle: "category",
      title: "title",
    },
  },
  title: "Course",
  type: "document",
});
