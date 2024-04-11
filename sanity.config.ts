/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/pages/admin/[[...index]].tsx` route
 */

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { internationalizedArray } from "sanity-plugin-internationalized-array"

import { visionTool } from "@sanity/vision"

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env"
import { schema } from "./src/sanity/schema"

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
    internationalizedArray({
      languages: [
        { id: "en", title: "English" },
        { id: "ko", title: "Korean" },
      ],
      defaultLanguages: ["en"],
      fieldTypes: ["string", "blockContent"],
    }),
  ],
})
