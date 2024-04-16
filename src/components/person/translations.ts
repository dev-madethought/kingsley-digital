import { Person } from "@/types/sanity"

export const getName = (language: string, props: Person) => {
  const data = props.name?.find((g) => g._key === language)
  return data?.value
}

export const getRole = (language: string, props: Person) => {
  const data = props.role?.find((g) => g._key === language)
  return data?.value
}

export const getBio = (language: string, props: Person) => {
  const data = props.bio?.find((g) => g._key === language)
  return data?.value
}
