/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/pages/admin/[[...index]].tsx` route
 */

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import {
  internationalizedArray,
  Language,
} from "sanity-plugin-internationalized-array"

import { visionTool } from "@sanity/vision"

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env"
import { schema } from "./src/sanity/schema"

export const languages = [
  { id: "en", title: "English" },
  { id: "ko", title: "Korean" },
] as const

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
      languages: languages as unknown as Language[],
      defaultLanguages: ["en"],
      fieldTypes: ["string", "blockContent"],
    }),
  ],
})
