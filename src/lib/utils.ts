import {
  Contacts,
  Hero,
  InternationalizedArrayBlockContentValue,
  InternationalizedArrayStringValue,
  People,
  Person,
  Philosophy,
  Services,
} from "@/types/sanity"

import { languages } from "../../sanity.config"

type ContentTypes = Hero | Philosophy | People | Person | Contacts | Services

// Define the structure we are interested in exactly
type ValuesWithTranslations =
  | Array<
      | InternationalizedArrayStringValue
      | InternationalizedArrayBlockContentValue
    >
  | Array<{
      [key: string]:
        | Array<
            | InternationalizedArrayStringValue
            | InternationalizedArrayBlockContentValue
          >
        | string
        | undefined
    }>

// Utility type to get keys whose values match the required array structure
type KeysOfMatchingType<T, U> = {
  [K in keyof T]: undefined extends T[K]
    ? T[K] extends undefined | U
      ? K
      : never
    : T[K] extends U
    ? K
    : never
}[keyof T]

type BaseProps = {
  language: (typeof languages)[number]["id"]
}

type GenericTranslatableProps<T> = {
  props: T
  translationKey: KeysOfMatchingType<T, ValuesWithTranslations>
}

export type TranslatableProps = BaseProps &
  (
    | GenericTranslatableProps<Hero>
    | GenericTranslatableProps<Philosophy>
    | GenericTranslatableProps<People>
    | GenericTranslatableProps<Person>
    | GenericTranslatableProps<Contacts>
    | GenericTranslatableProps<Services>
  )

export function getTranslationForKey({
  language,
  props,
  translationKey,
}: TranslatableProps): string | undefined {
  if (!translationKey) return undefined

  const data = // @ts-ignore
    (props[translationKey] as Array<{ _key: string; value: any }>)?.find(
      (g) => g._key === language
    )
  return data?.value
}

export default getTranslationForKey

// type TranslatablePhilosophyKeys = KeysOfMatchingType<
//   Philosophy,
//   TranslatableArray
// >
