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
      title: "Contacts",
      name: "contacts",
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

    // CONTACTS
    defineField({
      name: "contactsTitle",
      title: "Title",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsDescription",
      title: "Description",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsName",
      title: "Name",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsPhone",
      title: "Phone",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsOrganisation",
      title: "Organisation",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsEmail",
      title: "Email",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsSubject",
      title: "Subject",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsSubjects",
      title: "Subjects",
      type: "array",
      group: "contacts",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "internationalizedArrayString",
              title: "Label",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "contactsMessage",
      title: "Message",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsSubscribe",
      title: "Subscribe",
      type: "internationalizedArrayString",
      group: "contacts",
    }),
    defineField({
      name: "contactsSuccess",
      title: "Contact Success",
      type: "internationalizedArrayString",
      group: "contacts",
    }),

    // BUTTONS
    defineField({
      name: "buttonsReadBio",
      title: "Read Bio",
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
    defineField({
      name: "buttonsGotIt",
      title: "Got it",
      type: "internationalizedArrayString",
      group: "buttons",
    }),
    defineField({
      name: "buttonsLearnMore",
      title: "Learn More",
      type: "internationalizedArrayString",
      group: "buttons",
    }),
    defineField({
      name: "buttonsContactUs",
      title: "Contact Us",
      type: "internationalizedArrayString",
      group: "buttons",
    }),
    defineField({
      name: "buttonsMap",
      title: "Map",
      type: "internationalizedArrayString",
      group: "buttons",
    }),
    defineField({
      name: "buttonsSubmit",
      title: "Submit",
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
