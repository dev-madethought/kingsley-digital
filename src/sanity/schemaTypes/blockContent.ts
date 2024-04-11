import { defineArrayMember, defineType } from "sanity"

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Title", value: "h1" },
      ],
      // marks: {
      //   decorators: [
      //     { title: "Internal Link", value: "internalLink" },
      //   ],
      // },
    }),
    // {
    //   type: "reference",
    //   name: "internalLink",
    //   title: "Internal Link",
    //   to: [{ type: "page" }],
    // },
  ],
})
