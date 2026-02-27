import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { flowchart } from "./flowchart";
import { placedStudentType } from "./placedStudentType";
import { googleReviewType } from "./googleReviewType";
import { testimonialType } from "./testimonialType";
import { faqCategoryType } from "./faqCategoryType";
import { devopsFAQType } from "./devopsFAQ";
import { pressFeatureType } from "./pressFeatureType";
import { courseType } from "./courseType";

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
