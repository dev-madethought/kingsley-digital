import { defineField, defineType } from "sanity"

export default defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  groups: [
    { title: "English", name: "english", default: true },
    { title: "Korean", name: "korean" },
  ],
  fields: [
    // ENGLISH
    defineField({
      name: "englishGreeting",
      title: "Greeting",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "englishSentence",
      title: "Sentence",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "englishTitle",
      title: "Title",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "englishDescription",
      title: "Description",
      type: "blockContent",
      group: "english",
    }),

    // KOREAN
    defineField({
      name: "koreanGreeting",
      title: "Greeting",
      type: "string",
      group: "korean",
    }),
    defineField({
      name: "koreanSentence",
      title: "Sentence",
      type: "string",
      group: "korean",
    }),
    defineField({
      name: "koreanTitle",
      title: "Title",
      type: "string",
      group: "korean",
    }),
    defineField({
      name: "koreanDescription",
      title: "Description",
      type: "blockContent",
      group: "korean",
    }),

    // COMMON
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Hero Component",
      }
    },
  },
})
