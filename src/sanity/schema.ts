import { type SchemaTypeDefinition } from "sanity"

import blockContent from "./schemaTypes/blockContent"
import contacts from "./schemaTypes/contacts"
import hero from "./schemaTypes/hero"
import page from "./schemaTypes/page"
import people from "./schemaTypes/people"
import person from "./schemaTypes/person"
import philosophy from "./schemaTypes/philosophy"
import service from "./schemaTypes/service"
import services from "./schemaTypes/services"
import settings from "./schemaTypes/settings"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    contacts,
    hero,
    page,
    people,
    person,
    philosophy,
    service,
    services,
    settings,
  ],
}
