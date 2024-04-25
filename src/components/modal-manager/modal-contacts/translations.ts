import { Person } from "@/types/sanity"

export const getName = (language: string, props: Person) => {
  const data = props.name?.find((g) => g._key === language)
  return data?.value
}

export const getRole = (language: string, props: Person) => {
  const data = props.role?.find((g) => g._key === language)
  return data?.value
}

export const getPrimaryBio = (language: string, props: Person) => {
  const data = props.bio?.find((g) => g._key === language)
  return data?.value
}

export const getSecondaryBio = (language: string, props: Person) => {
  const data = props.bio?.find((g) => g._key !== language)
  return data?.value
}

export const getEmailButton = (language: string, props: any) => {
  const data = props?.email?.find((g: any) => g._key === language)
  return data?.value
}

export const getLinkedinButton = (language: string, props: any) => {
  const data = props?.linkedin?.find((g: any) => g._key === language)
  return data?.value
}
