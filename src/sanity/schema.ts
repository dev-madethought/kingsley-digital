import { type SchemaTypeDefinition } from "sanity"

import blockContent from "./schemaTypes/blockContent"
import hero from "./schemaTypes/hero"
import page from "./schemaTypes/page"
import people from "./schemaTypes/people"
import philosophy from "./schemaTypes/philosophy"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, hero, page, people, philosophy],
}
