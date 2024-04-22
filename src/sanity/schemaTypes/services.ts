import { defineField, defineType } from "sanity"

export default defineType({
  name: "services",
  title: "Services",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayString",
    }),

    defineField({
      name: "image",
      type: "image",
      title: "Image",
    }),

    defineField({
      name: "allServices",
      title: "Services",
      type: "array",
      of: [{ type: "service" }],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Services Component",
      }
    },
  },
})
