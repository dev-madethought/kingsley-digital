import { defineField, defineType } from "sanity"

export default defineType({
  name: "contacts",
  title: "Contacts",
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

    defineField({
      name: "address",
      title: "Address",
      type: "internationalizedArrayString",
    }),

    defineField({
      name: "gps",
      title: "Google Maps GPS",
      type: "url",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),

    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "internationalizedArrayString",
              title: "Label",
            },
            { name: "email", type: "string", title: "Email" },
          ],
        },
      ],
    }),

    defineField({
      name: "numbers",
      title: "Phone Numbers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "internationalizedArrayString",
              title: "Label",
            },
            { name: "phone", type: "string", title: "Phone" },
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Contacts Component",
      }
    },
  },
})
