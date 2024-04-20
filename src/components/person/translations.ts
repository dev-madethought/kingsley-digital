import { Person } from "@/types/sanity"

export const getPrimaryName = (language: string, props: Person) => {
  const data = props.name?.find((g) => g._key === language)
  return data?.value
}

export const getSecondaryName = (language: string, props: Person) => {
  const data = props.name?.find((g) => g._key !== language)
  return data?.value
}

export const getPrimaryRole = (language: string, props: Person) => {
  const data = props.role?.find((g) => g._key === language)
  return data?.value
}

export const getSecondaryRole = (language: string, props: Person) => {
  const data = props.role?.find((g) => g._key !== language)
  return data?.value
}

export const getBio = (language: string, props: Person) => {
  const data = props.bio?.find((g) => g._key === language)
  return data?.value
}

export const getCTA = (language: string, props: any) => {
  const data = props?.biography?.find((g: any) => g._key === language)
  return data?.value
}
