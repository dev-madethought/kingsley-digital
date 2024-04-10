import { defineField, defineType } from "sanity"

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  groups: [
    { title: "English", name: "english", default: true },
    { title: "Korean", name: "korean" },
  ],
  fields: [
    defineField({
      name: "test",
      title: "Test",
      type: "string",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Footer Component",
      }
    },
  },
})
