import { Section } from "@/components/section"
import { Contacts } from "@/containers/contacts"
import { Hero } from "@/containers/hero"
import { Legal } from "@/containers/legal"
import { People } from "@/containers/people"
import { Philosophy } from "@/containers/philosophy"
import { Services } from "@/containers/services"
import {
  Contacts as ContactsProps,
  Hero as HeroProps,
  Legal as LegalProps,
  People as PeopleProps,
  Philosophy as PhilosophyProps,
  Services as ServicesProps,
} from "@/types/sanity"

export type ContentItem = (
  | ContactsProps
  | HeroProps
  | PeopleProps
  | PhilosophyProps
  | ServicesProps
  | LegalProps
) & {
  _key: string
}

export const renderComponent = (props: ContentItem) => {
  const common = { id: props._type }
  switch (props._type) {
    case "hero":
      return (
        <Section key={props._key} {...common}>
          <Hero {...props} />
        </Section>
      )
    case "philosophy":
      return (
        <Section key={props._key} {...common}>
          <Philosophy {...props} />
        </Section>
      )
    case "people":
      return (
        <Section key={props._key} {...common}>
          <People {...props} />
        </Section>
      )
    case "services":
      return (
        <Section key={props._key} {...common}>
          <Services {...props} />
        </Section>
      )
    case "contacts":
      return (
        <Section key={props._key} {...common}>
          <Contacts {...props} />
        </Section>
      )
    case "legal":
      return (
        <Section key={props._key} {...common}>
          <Legal {...props} />
        </Section>
      )
    default:
      return null
  }
}
