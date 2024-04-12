import { People } from "@/types/sanity"

export const getTitle = (language: string, props: People) => {
  const data = props.title?.find((g) => g._key === language)
  return data?.value
}

export const getPrimaryDescription = (language: string, props: People) => {
  const data = props.description?.find((g) => g._key === language)
  return data?.value
}
export const getSecondaryDescription = (language: string, props: People) => {
  const data = props.description?.find((g) => g._key !== language)
  return data?.value
}
