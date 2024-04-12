import { defineField, defineType } from "sanity"

export default defineType({
  name: "people",
  title: "People",
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
  ],

  preview: {
    prepare() {
      return {
        title: "People Component",
      }
    },
  },
})
