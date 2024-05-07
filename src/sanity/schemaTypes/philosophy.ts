import { defineField, defineType } from "sanity"

export default defineType({
  name: "philosophy",
  title: "Philosophy",
  type: "object",
  fields: [
    defineField({
      name: "menu",
      title: "Menu",
      type: "internationalizedArrayString",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "internationalizedArrayString",
            },
            {
              name: "description",
              title: "Description",
              type: "internationalizedArrayString",
            },
          ],
        },
      ],
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
