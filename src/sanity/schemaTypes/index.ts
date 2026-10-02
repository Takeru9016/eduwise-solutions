import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { awsCertificationType } from "./awsCertificationType";
import { awsPageType } from "./awsPageType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { courseType } from "./courseType";
import { devopsFAQType } from "./devopsFAQ";
import { faqCategoryType } from "./faqCategoryType";
import { flowchart } from "./flowchart";
import { googleReviewType } from "./googleReviewType";
import { homePageType } from "./homePageType";
import { leadMagnetType } from "./leadMagnetType";
import { pageSeoType } from "./pageFields";
import { placedStudentType } from "./placedStudentType";
import { postType } from "./postType";
import { pressFeatureType } from "./pressFeatureType";
import { redirectType } from "./redirectType";
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
    leadMagnetType,
    redirectType,
    pageSeoType,
    homePageType,
    awsPageType,
    awsCertificationType,
  ],
};
