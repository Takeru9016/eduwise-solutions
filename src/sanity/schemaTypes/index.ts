import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { courseType } from "./courseType";
import { devopsFAQType } from "./devopsFAQ";
import { faqCategoryType } from "./faqCategoryType";
import { flowchart } from "./flowchart";
import { googleReviewType } from "./googleReviewType";
import { placedStudentType } from "./placedStudentType";
import { postType } from "./postType";
import { pressFeatureType } from "./pressFeatureType";
import { testimonialType } from "./testimonialType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    flowchart,
    placedStudentType,
    googleReviewType,
    testimonialType,
    faqCategoryType,
    devopsFAQType,
    pressFeatureType,
    courseType,
  ],
};
