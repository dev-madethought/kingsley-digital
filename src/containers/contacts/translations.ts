import { Contacts } from "@/types/sanity"

export const getTitle = (language: string, props: Contacts) => {
  const data = props.title?.find((e) => e._key === language)
  return data?.value
}

export const getPrimaryDescription = (language: string, props: Contacts) => {
  const data = props.description?.find((e) => e._key === language)
  return data?.value
}

export const getSecondaryDescription = (language: string, props: Contacts) => {
  const data = props.description?.find((e) => e._key !== language)
  return data?.value
}

export const getPrimaryAddress = (language: string, props: Contacts) => {
  const data = props.address?.find((e) => e._key === language)
  return data?.value
}

export const getSecondaryAddress = (language: string, props: Contacts) => {
  const data = props.address?.find((e) => e._key !== language)
  return data?.value
}

export const getButtonMap = (language: string, props: any) => {
  const data = props?.map?.find((e: any) => e._key === language)
  return data?.value
}

export const getButtonContactUs = (language: string, props: any) => {
  const data = props?.contactus?.find((e: any) => e._key === language)
  return data?.value
}

export const getPrimaryEmailLabel = (language: string, props: any) => {
  const data = props?.label?.find((e: any) => e._key === language)
  return data?.value
}

export const getSecondaryEmailLabel = (language: string, props: any) => {
  const data = props?.label?.find((e: any) => e._key !== language)
  return data?.value
}

export const getPrimaryPhoneLabel = (language: string, props: any) => {
  const data = props?.label?.find((e: any) => e._key === language)
  return data?.value
}

export const getSecondaryPhoneLabel = (language: string, props: any) => {
  const data = props?.label?.find((e: any) => e._key !== language)
  return data?.value
}
