
import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const placedStudentType = defineType({
  name: 'placedStudent',
  title: 'Placed Student',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'previousRole',
      title: 'Previous Role',
      type: 'string',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'newRole',
        title: 'New Role',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'placedAt',
        title: 'Placed At (Company Name)',
        type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'newRole',
      media: 'image',
    },
  },
})
