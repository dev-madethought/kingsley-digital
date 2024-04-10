import { type SchemaTypeDefinition } from "sanity"

import blockContent from "./schemaTypes/blockContent"
import contacts from "./schemaTypes/contacts"
import footer from "./schemaTypes/footer"
import hero from "./schemaTypes/hero"
import page from "./schemaTypes/page"
import people from "./schemaTypes/people"
import philosophy from "./schemaTypes/philosophy"
import services from "./schemaTypes/services"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    contacts,
    footer,
    hero,
    page,
    people,
    philosophy,
    services,
  ],
}
