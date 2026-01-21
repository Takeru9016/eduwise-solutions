import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { flowchart } from "./flowchart";
import { placedStudentType } from "./placedStudentType";
import { googleReviewType } from "./googleReviewType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    flowchart,
    placedStudentType,
    googleReviewType,
  ],
};
