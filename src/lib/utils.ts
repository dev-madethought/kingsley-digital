import {
  Contacts,
  Hero,
  InternationalizedArrayBlockContentValue,
  InternationalizedArrayStringValue,
  People,
  Person,
  Philosophy,
} from "@/types/sanity"

import { languages } from "../../sanity.config"

type ContentTypes = Hero | Philosophy | People | Person | Contacts

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

type TranslatableProps<P> = BaseProps & {
  props: P
  key: KeysOfMatchingType<P, ValuesWithTranslations>
}

export function getTranslationForKey<T extends ContentTypes = ContentTypes>({
  language,
  props,
  key,
}: TranslatableProps<T>): string | undefined {
  const data = (props[key] as Array<{ _key: string; value: any }>)?.find(
    (g) => g._key === language
  )
  return data?.value
}

export default getTranslationForKey

// type TranslatablePhilosophyKeys = KeysOfMatchingType<
//   Philosophy,
//   TranslatableArray
// >
