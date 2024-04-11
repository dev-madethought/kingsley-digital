import { defineField, defineType } from "sanity"

export default defineType({
  name: "services",
  title: "Services",
  type: "object",
  groups: [
    { title: "English", name: "english", default: true },
    { title: "Korean", name: "korean" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    // ENGLISH
    defineField({
      name: "englishBody",
      title: "Body",
      type: "blockContent",
      group: "english",
    }),
    // KOREAN
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
        title: "Services Component",
      }
    },
  },
})
