import { defineField, defineType } from "sanity"

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  groups: [
    {
      title: "Social Links",
      name: "socialLinks",
    },
    {
      title: "Internal Links",
      name: "internalLinks",
    },
    {
      title: "Newsletter",
      name: "newsletter",
    },
    {
      title: "Cookies",
      name: "cookies",
    },
    {
      title: "Buttons",
      name: "buttons",
    },
  ],
  fields: [
    // SOCIAL LINKS
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "socialLinks",
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

    // INTERNAL LINKS
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      group: "internalLinks",
      of: [{ type: "reference", to: [{ type: "page" }] }],
      description: 'Select existing "page" documents',
    }),

    // NEWSLETTER
    defineField({
      name: "newsletterTitle",
      title: "Title",
      type: "internationalizedArrayString",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Placeholder",
      type: "internationalizedArrayString",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterAgreement",
      title: "Agreement",
      type: "internationalizedArrayString",
      group: "newsletter",
    }),

    // COOKIES
    defineField({
      name: "cookiesMessage",
      title: "Message",
      type: "internationalizedArrayBlockContent", // "internationalizedArrayString",
      group: "cookies",
    }),
    defineField({
      name: "cookiesCTA",
      title: "CTA",
      type: "internationalizedArrayString",
      group: "cookies",
    }),

    // BUTTONS
    defineField({
      name: "buttonsReadBio",
      title: "Bio",
      type: "internationalizedArrayString",
      group: "buttons",
    }),
    defineField({
      name: "buttonsEmail",
      title: "Email",
      type: "internationalizedArrayString",
      group: "buttons",
    }),
    defineField({
      name: "buttonsLinkedIn",
      title: "LinkedIN",
      type: "internationalizedArrayString",
      group: "buttons",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Settings Component",
        description: "Edit global settings here",
      }
    },
  },
})
