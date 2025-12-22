import { defineType, defineField, defineArrayMember } from 'sanity'

export const flowchart = defineType({
    name: 'flowchart',
    type: 'object',
    title: 'Flowchart',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            description: 'Optional title for the flowchart'
        }),
        defineField({
            name: 'direction',
            type: 'string',
            title: 'Direction',
            options: {
                list: [
                    { title: 'Vertical (↓)', value: 'vertical' },
                    { title: 'Horizontal (→)', value: 'horizontal' }
                ],
                layout: 'radio'
            },
            initialValue: 'vertical'
        }),
        defineField({
            name: 'steps',
            type: 'array',
            title: 'Steps',
            description: 'Add steps in order from start to finish',
            of: [
                defineArrayMember({
                    type: 'object',
                    title: 'Step',
                    fields: [
                        defineField({
                            name: 'label',
                            type: 'string',
                            title: 'Label',
                            description: 'Main text for this step',
                            validation: (Rule) => Rule.required()
                        }),
                        defineField({
                            name: 'description',
                            type: 'text',
                            title: 'Description',
                            description: 'Optional additional details',
                            rows: 2
                        }),
                        defineField({
                            name: 'color',
                            type: 'string',
                            title: 'Color Theme',
                            options: {
                                list: [
                                    { title: 'Default (White)', value: 'default' },
                                    { title: 'Primary (Brand Color)', value: 'primary' },
                                    { title: 'Secondary (Blue)', value: 'secondary' },
                                    { title: 'Success (Green)', value: 'success' }
                                ],
                                layout: 'radio'
                            },
                            initialValue: 'default'
                        })
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'description',
                            color: 'color'
                        },
                        prepare({ title, subtitle, color }) {
                            return {
                                title: title || 'Untitled Step',
                                subtitle: subtitle || `Color: ${color || 'default'}`
                            }
                        }
                    }
                })
            ],
            validation: (Rule) => Rule.required().min(2).max(20)
        })
    ],
    preview: {
        select: {
            title: 'title',
            steps: 'steps'
        },
        prepare({ title, steps }) {
            return {
                title: title || 'Flowchart',
                subtitle: `${steps?.length || 0} steps`
            }
        }
    }
})