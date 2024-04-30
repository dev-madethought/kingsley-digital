import { defineField, defineType } from "sanity"

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "greeting",
      title: "Greeting",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "sentence",
      title: "Sentence",
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
      type: "internationalizedArrayBlockContent",
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
