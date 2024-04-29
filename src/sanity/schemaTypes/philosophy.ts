import { defineField, defineType } from "sanity"

export default defineType({
  name: "philosophy",
  title: "Philosophy",
  type: "object",
  fields: [
    defineField({
      name: "anchor",
      title: "Anchor",
      type: "string",
    }),
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
    defineField({
      name: "image",
      type: "image",
      title: "Image",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Philosophy Component",
      }
    },
  },
})
