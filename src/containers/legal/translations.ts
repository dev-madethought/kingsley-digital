import { Legal } from "@/types/sanity"

export const getPrimaryTitle = (language: string, props: Legal) => {
  const data = props.title?.find((e) => e._key === language)
  return data?.value
}

export const getSecondaryTitle = (language: string, props: Legal) => {
  const data = props.title?.find((e) => e._key !== language)
  return data?.value
}

export const getPrimaryBody = (language: string, props: Legal) => {
  const data = props.body?.find((e) => e._key === language)
  return data?.value
}

export const getSecondaryBody = (language: string, props: Legal) => {
  const data = props.body?.find((e) => e._key !== language)
  return data?.value
}
