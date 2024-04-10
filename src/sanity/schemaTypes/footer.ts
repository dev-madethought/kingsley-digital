import { defineField, defineType } from "sanity"

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  groups: [
    { title: "English", name: "english" },
    { title: "Korean", name: "korean" },
  ],
  fields: [
    // newsletter
    defineField({
      name: "newsletterTitle",
      title: "Newsletter Title",
      type: "string",
    }),
    defineField({
      name: "newsletterAgreement",
      title: "Newsletter Agreement",
      type: "string",
    }),
    // Social links
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
    // internal links
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "reference", to: [{ type: "page" }] }],
      description: 'Select existing "page" documents',
    },
  ],

  preview: {
    prepare() {
      return {
        title: "Footer Component",
      }
    },
  },
})
