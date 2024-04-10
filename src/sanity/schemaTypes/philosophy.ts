import { defineField, defineType } from "sanity"

export default defineType({
  name: "philosophy",
  title: "Philosophy",
  type: "document",
  groups: [
    { title: "English", name: "english", default: true },
    { title: "Korean", name: "korean" },
  ],
  fields: [
    // ENGLISH
    defineField({
      name: "englishTitle",
      title: "Title",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "englishBody",
      title: "Body",
      type: "blockContent",
      group: "english",
    }),
    // KOREAN
    defineField({
      name: "koreanTitle",
      title: "Title",
      type: "string",
      group: "korean",
    }),
    defineField({
      name: "koreanBody",
      title: "Body",
      type: "blockContent",
      group: "korean",
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
