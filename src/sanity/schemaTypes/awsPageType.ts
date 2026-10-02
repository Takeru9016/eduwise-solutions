import { RocketIcon } from "@sanity/icons/Rocket";
import { defineField, defineType } from "sanity";
import {
  iconField,
  objectList,
  section,
  stringList,
  textField,
} from "./pageFields";

const TINT_OPTIONS = [
  { title: "Light mint", value: "bg-primary-99" },
  { title: "Gold", value: "bg-gold-90" },
];

export const awsPageType = defineType({
  fields: [
    defineField({
      group: "seo",
      name: "seo",
      title: "SEO",
      type: "pageSeo",
    }),
    defineField({
      fields: [
        textField("badgeText", "Badge text (next to AWS logo)"),
        textField("headline", "Headline"),
        textField("highlight", "Highlighted part of the headline"),
        textField("body", "Body text", { rows: 4 }),
        stringList("trustSignals", "Trust signals (small pills)"),
        textField("ctaLabel", "Button label (jumps to certifications)"),
      ],
      group: "content",
      name: "hero",
      options: { collapsed: true, collapsible: true },
      title: "Hero",
      type: "object",
    }),
    objectList(
      "stats",
      "Stats bar",
      [iconField(), textField("value", "Value"), textField("label", "Label")],
      "label",
      "value"
    ),
    section({
      description:
        "Certification cards come from the AWS Certifications documents.",
      name: "certGrid",
      title: "Certification Grid",
    }),
    section({
      description:
        "Syllabus tabs come from the AWS Certifications documents (domains, tips, sample Q&A).",
      name: "syllabus",
      title: "Syllabus & Sample Q&A",
    }),
    section({
      fields: [
        objectList(
          "cards",
          "Track cards (2)",
          [
            textField("letter", "Badge letter"),
            textField("title", "Title"),
            textField("intro", "Intro text", { rows: 4 }),
            textField("listLabel", "List label (e.g. Suitable for:)"),
            stringList("items", "List items"),
            defineField({
              name: "tint",
              options: { list: TINT_OPTIONS },
              title: "Card colour",
              type: "string",
            }),
          ],
          "title"
        ),
      ],
      name: "tracks",
      title: "Which Track Fits You",
    }),
    section({
      fields: [
        objectList(
          "rows",
          "Career rows",
          [
            textField("cert", "Certification"),
            textField("roles", "Roles", { rows: 2 }),
            textField("level", "Experience level"),
            textField("responsibilities", "Responsibilities", { rows: 2 }),
            textField("indSalary", "India salary"),
            textField("usSalary", "US salary"),
          ],
          "cert",
          "roles"
        ),
        textField("note", "Footnote", { rows: 2 }),
      ],
      name: "career",
      title: "Career Opportunities",
    }),
    section({
      fields: [
        objectList(
          "steps",
          "Steps",
          [
            textField("label", "Title"),
            textField("detail", "Description", { rows: 2 }),
            iconField(),
          ],
          "label",
          "detail"
        ),
        textField("pricingBadge", "Pricing card: badge"),
        textField("pricingTitle", "Pricing card: title"),
        textField("pricingBody", "Pricing card: text", { rows: 3 }),
        textField("pricingCta", "Pricing card: button label"),
      ],
      name: "voucher",
      title: "How to Get a Voucher",
    }),
    section({
      fields: [
        objectList(
          "steps",
          "Steps",
          [textField("label", "Title"), iconField()],
          "label"
        ),
      ],
      name: "schedule",
      title: "How to Schedule the Exam",
    }),
    section({
      fields: [
        objectList(
          "items",
          "Questions",
          [
            textField("question", "Question"),
            textField("answer", "Answer", { rows: 4 }),
          ],
          "question"
        ),
      ],
      name: "faq",
      title: "FAQs",
    }),
    defineField({
      fields: [
        defineField({
          initialValue: true,
          name: "enabled",
          title: "Show this section",
          type: "boolean",
        }),
        textField("eyebrow", "Small label"),
        textField("headline", "Headline"),
        textField("highlight", "Highlighted part of the headline"),
        textField("body", "Body text", { rows: 3 }),
        textField("primaryCta", "Primary button label"),
        textField("secondaryCta", "Secondary button label"),
      ],
      group: "content",
      name: "conclusion",
      options: { collapsed: true, collapsible: true },
      title: "Closing Call to Action",
      type: "object",
    }),
  ],
  groups: [
    { default: true, name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  icon: RocketIcon,
  name: "awsPage",
  preview: { prepare: () => ({ title: "AWS Certification Page" }) },
  title: "AWS Certification Page",
  type: "document",
});
