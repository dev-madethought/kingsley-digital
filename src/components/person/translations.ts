import { Person } from "@/types/sanity"

export const getName = (language: string, props: Person) => {
  const data = props.name?.find((g) => g._key === language)
  return data?.value
}
