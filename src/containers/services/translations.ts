import { Service, Services } from "@/types/sanity"

export const getTitle = (language: string, props: Services) => {
  const data = props.title?.find((g) => g._key === language)
  return data?.value
}

export const getPrimaryDescription = (language: string, props: Services) => {
  const data = props.description?.find((g) => g._key === language)
  return data?.value
}

export const getSecondaryDescription = (language: string, props: Services) => {
  const data = props.description?.find((g) => g._key !== language)
  return data?.value
}

export const getServiceTitle = (language: string, props: Service) => {
  const data = props.title?.find((g) => g._key === language)
  return data?.value
}

export const getServiceSinopsis = (language: string, props: Service) => {
  const data = props.sinopsis?.find((g) => g._key === language)
  return data?.value
}

export const getLearnMoreButton = (language: string, props: any) => {
  const data = props?.learnMore?.find((g: any) => g._key === language)
  return data?.value
}
