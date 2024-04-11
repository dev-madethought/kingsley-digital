import { Philosophy } from "@/types/sanity"

export const getMainTitle = (language: string, props: Philosophy) => {
  const data = props.title?.find((e) => e._key === language)
  return data?.value
}

export const getSecondaryTitle = (language: string, props: Philosophy) => {
  const data = props.title?.find((e) => e._key !== language)
  return data?.value
}

export const getMainBody = (language: string, props: Philosophy) => {
  const data = props.body?.find((e) => e._key === language)
  return data?.value
}

export const getSecondaryBody = (language: string, props: Philosophy) => {
  const data = props.body?.find((e) => e._key !== language)
  return data?.value
}
