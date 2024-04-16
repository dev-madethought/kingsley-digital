import { defineField, defineType } from "sanity"

export default defineType({
  name: "person",
  title: "Person",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "internationalizedArrayBlockContent",
    }),
  ],

  preview: {
    select: {
      title: "name",
    },
    prepare(selection) {
      const { title } = selection
      return {
        ...selection,
        title: title[0].value || "Person",
      }
    },
  },
})
