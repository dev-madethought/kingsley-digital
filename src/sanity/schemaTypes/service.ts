import { defineField, defineType } from "sanity"

export default defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
    }),

    defineField({
      name: "sinopsis",
      title: "Sinopsis",
      type: "internationalizedArrayString",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayBlockContent",
    }),

    defineField({
      name: "images",
      type: "array",
      title: "Images",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
      validation: (Rule) => Rule.min(2).max(2),
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection
      return {
        ...selection,
        title: title[0].value || "Service",
      }
    },
  },
})
