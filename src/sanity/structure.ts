import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Blog section
      S.listItem()
        .title("Blog")
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
        .child(
          S.documentTypeList("course")
            .title("All Courses")
            .defaultOrdering([{ direction: "asc", field: "category" }])
        ),
      S.divider(),
      // Website Content section
      S.listItem()
        .title("Website Content")
        .child(
          S.list()
            .title("Website Content")
            .items([
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("faqCategory").title("FAQ Categories"),
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
            "placedStudent",
            "googleReview",
            "course",
          ].includes(item.getId()!)
      ),
    ]);
