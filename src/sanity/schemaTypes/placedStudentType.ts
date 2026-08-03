import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const placedStudentType = defineType({
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      options: {
        hotspot: true,
      },
      title: "Image",
      type: "image",
    }),
    defineField({
      description: 'e.g., "5 Years of Experience"',
      name: "experience",
      title: "Years of Experience",
      type: "string",
    }),
    defineField({
      name: "previousRole",
      title: "Previous Role",
      type: "string",
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previousCompanyLogo",
      options: {
        hotspot: true,
      },
      title: "Previous Company Logo",
      type: "image",
    }),
    defineField({
      name: "newRole",
      title: "New Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyLogo",
      options: {
        hotspot: true,
      },
      title: "New Company Logo",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "placedAt",
      title: "Placed At (Company Name)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      to: [{ type: "category" }],
      type: "reference",
      validation: (Rule) => Rule.required(),
    }),
  ],
  icon: UsersIcon,
  name: "placedStudent",
  preview: {
    select: {
      media: "image",
      subtitle: "newRole",
      title: "name",
    },
  },
  title: "Placed Student",
  type: "document",
});
