import { BookIcon } from "@sanity/icons/Book";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { HomeIcon } from "@sanity/icons/Home";
import { RocketIcon } from "@sanity/icons/Rocket";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Pages (singletons)
      S.listItem()
        .title("Pages")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home Page")
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType("homePage")
                    .documentId("homePage")
                    .title("Home Page")
                ),
              S.listItem()
                .title("AWS Certification Page")
                .icon(RocketIcon)
                .child(
                  S.document()
                    .schemaType("awsPage")
                    .documentId("awsPage")
                    .title("AWS Certification Page")
                ),
              S.documentTypeListItem("awsCertification").title(
                "AWS Certifications"
              ),
            ])
        ),
      S.divider(),
      // Blog section
      S.listItem()
        .title("Blog")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),
      S.divider(),
      // Courses section
      S.listItem()
        .title("Courses")
        .icon(BookIcon)
        .child(
          S.documentTypeList("course")
            .title("All Courses")
            .defaultOrdering([{ direction: "asc", field: "category" }])
        ),
      S.divider(),
      // Website Content section
      S.listItem()
        .title("Website Content")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Website Content")
            .items([
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("faqCategory").title("FAQ Categories"),
              S.documentTypeListItem("devopsFAQ").title("DevOps FAQ"),
              S.documentTypeListItem("pressFeature").title("Press Features"),
              S.documentTypeListItem("leadMagnet").title(
                "Lead Magnets (Free Guides)"
              ),
              S.documentTypeListItem("placedStudent").title("Placed Students"),
              S.documentTypeListItem("googleReview").title("Google Reviews"),
            ])
        ),
      S.divider(),
      // Other items
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "testimonial",
            "faqCategory",
            "devopsFAQ",
            "pressFeature",
            "leadMagnet",
            "placedStudent",
            "googleReview",
            "course",
            "homePage",
            "awsPage",
            "awsCertification",
          ].includes(item.getId()!)
      ),
    ]);
