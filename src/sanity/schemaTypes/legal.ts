import { defineField, defineType } from "sanity"

export default defineType({
  name: "legal",
  title: "Legal",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "internationalizedArrayBlockContent",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Legal Component",
      }
    },
  },
})
