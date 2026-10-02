import { HomeIcon } from "@sanity/icons/Home";
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
  { title: "White", value: "bg-white" },
  { title: "Mint", value: "bg-primary-90" },
];

export const homePageType = defineType({
  fields: [
    defineField({
      group: "seo",
      name: "seo",
      title: "SEO",
      type: "pageSeo",
    }),
    defineField({
      description: "Top section of the home page.",
      fields: [
        stringList(
          "headlineLines",
          "Headline (one line per row, 3 rows)",
          "Each row is shown on its own line in the big heading."
        ),
        textField("subtext", "Sub-text under the headline", { rows: 3 }),
        textField("ctaLabel", "Button label (links to /courses)"),
        objectList(
          "skillTags",
          "Floating skill tags",
          [
            textField("label", "Label"),
            defineField({
              initialValue: false,
              name: "filled",
              title: "Highlight (gold)",
              type: "boolean",
            }),
          ],
          "label"
        ),
        objectList(
          "learningPath",
          "Learning path checklist",
          [
            textField("label", "Label"),
            defineField({
              initialValue: false,
              name: "done",
              title: "Ticked",
              type: "boolean",
            }),
          ],
          "label"
        ),
        textField("stickerValue", "Gold sticker: big number"),
        textField("stickerLabel", "Gold sticker: label"),
        textField("floatingCardTitle", "Floating card: title"),
        textField("floatingCardBody", "Floating card: text", { rows: 3 }),
        objectList(
          "stats",
          "Stats row",
          [textField("value", "Value"), textField("label", "Label")],
          "label",
          "value"
        ),
        textField("stripHeading", "Heading beside the photo", { rows: 2 }),
        objectList(
          "toolIcons",
          "Icon row beside the photo",
          [iconField(), textField("label", "Label (tooltip)")],
          "label"
        ),
      ],
      group: "content",
      name: "hero",
      options: { collapsed: true, collapsible: true },
      title: "Hero",
      type: "object",
    }),
    section({
      description:
        'Course category cards. The cards themselves come from your courses; here you edit the text. The "17+ Career Programs" pill is automatic.',
      name: "domains",
      title: "Domains (Pick Your Path)",
    }),
    section({
      fields: [
        objectList(
          "steps",
          "Steps",
          [
            textField("title", "Title"),
            textField("description", "Description", { rows: 2 }),
            iconField(),
          ],
          "title",
          "description"
        ),
      ],
      heading: false,
      name: "howItWorks",
      title: "How It Works",
    }),
    section({
      description:
        "Press logos and articles come from Website Content > Press Features.",
      name: "press",
      title: "Press (As Seen In)",
    }),
    section({
      description:
        "Program cards come from Courses marked 'Featured on Homepage'.",
      fields: [],
      heading: false,
      name: "programs",
      title: "Featured Programs",
    }),
    section({
      fields: [
        textField("ctaLabel", "Button label (links to /courses)"),
        objectList(
          "items",
          "Benefit cards",
          [
            textField("title", "Title"),
            textField("description", "Description", { rows: 2 }),
            iconField(),
            defineField({
              name: "tint",
              options: { list: TINT_OPTIONS },
              title: "Card colour (text cards)",
              type: "string",
            }),
            textField("imagePath", "Image path (image cards)", {
              description:
                "If set, the card is shown as a photo card, e.g. /home/benefits/mentor-support.jpg. Leave empty for an icon card.",
            }),
          ],
          "title",
          "description"
        ),
      ],
      heading: false,
      name: "benefits",
      title: "Benefits",
    }),
    section({
      description: "Testimonials come from Website Content > Testimonials.",
      name: "testimonials",
      title: "Testimonials",
    }),
    section({
      fields: [
        textField("helpTitle", "Help card: title"),
        textField("helpBody", "Help card: text", { rows: 2 }),
        textField("helpCta", "Help card: button label (links to /contact)"),
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
  ],
  groups: [
    { default: true, name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  icon: HomeIcon,
  name: "homePage",
  preview: { prepare: () => ({ title: "Home Page" }) },
  title: "Home Page",
  type: "document",
});
