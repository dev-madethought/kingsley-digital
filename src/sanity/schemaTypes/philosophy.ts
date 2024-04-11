import { defineField, defineType } from "sanity"

export default defineType({
  name: "philosophy",
  title: "Philosophy",
  type: "object",
  groups: [
    { title: "English", name: "english" },
    { title: "Korean", name: "korean" },
  ],
  fields: [
    // COMMON
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    // ENGLISH
    defineField({
      name: "englishTitle",
      title: "English Title",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "englishBody",
      title: "English Body",
      type: "blockContent",
      group: "english",
    }),
    // KOREAN
    defineField({
      name: "koreanTitle",
      title: "Korean Title",
      type: "string",
      group: "korean",
    }),
    defineField({
      name: "koreanBody",
      title: "Korean Body",
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
