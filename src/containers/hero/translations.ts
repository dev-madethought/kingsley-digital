import { Hero } from "@/types/sanity"

export const getGreeting = (language: string, props: Hero) => {
  const data = props.greeting?.find((g) => g._key === language)
  return data?.value
}

export const getSentence = (language: string, props: Hero) => {
  const data = props.sentence?.find((g) => g._key === language)
  return data?.value
}

export const getMainTitle = (language: string, props: Hero) => {
  const data = props.title?.find((g) => g._key === language)
  return data?.value
}

export const getSecondaryTitle = (language: string, props: Hero) => {
  const data = props.title?.find((g) => g._key !== language)
  return data?.value
}

export const getMainDescription = (language: string, props: Hero) => {
  const data = props.description?.find((g) => g._key === language)
  return data?.value
}

export const getSecondaryDescription = (language: string, props: Hero) => {
  const data = props.description?.find((g) => g._key !== language)
  return data?.value
}
