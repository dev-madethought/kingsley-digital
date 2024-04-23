import { Service } from "@/types/sanity"

export const getTitle = (language: string, props: Service) => {
  const data = props?.title?.find((g) => g._key === language)
  return data?.value
}

export const getPrimarySinopsis = (language: string, props: Service) => {
  const data = props?.sinopsis?.find((g) => g._key === language)
  return data?.value
}

export const getSecondarySinopsis = (language: string, props: Service) => {
  const data = props?.sinopsis?.find((g) => g._key !== language)
  return data?.value
}

export const getPrimaryDescription = (language: string, props: Service) => {
  const data = props?.description?.find((g) => g._key === language)
  return data?.value
}

export const getSecondaryDescription = (language: string, props: Service) => {
  const data = props?.description?.find((g) => g._key !== language)
  return data?.value
}
