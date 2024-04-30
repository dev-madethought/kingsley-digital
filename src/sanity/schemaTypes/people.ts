import { defineField, defineType } from "sanity"

export default defineType({
  name: "people",
  title: "People",
  type: "object",
  fields: [
    defineField({
      name: "menu",
      title: "Menu",
      type: "internationalizedArrayString",
    }),
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
      name: "people",
      title: "People",
      type: "array",
      // of: [{ type: "reference", to: [{ type: "person" }] }],
      of: [{ type: "person" }],
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
