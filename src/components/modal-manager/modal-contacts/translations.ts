import { Contacts } from "@/types/sanity"

export const getTitle = (language: string, props: Contacts) => {
  const data = props?.title?.find((g: any) => g._key === language)
  return data?.value
}

export const getPrimaryDescription = (language: string, props: Contacts) => {
  const data = props?.description?.find((g: any) => g._key === language)
  return data?.value
}

export const getSecondaryDescription = (language: string, props: Contacts) => {
  const data = props?.description?.find((g: any) => g._key !== language)
  return data?.value
}

// form
export const getName = (language: string, props: any) => {
  const data = props?.name?.find((g: any) => g._key === language)
  return data?.value
}

export const getPhone = (language: string, props: any) => {
  const data = props?.phone?.find((g: any) => g._key === language)
  return data?.value
}

export const getOrganisation = (language: string, props: any) => {
  const data = props?.organisation?.find((g: any) => g._key === language)
  return data?.value
}

export const getEmail = (language: string, props: any) => {
  const data = props?.email?.find((g: any) => g._key === language)
  return data?.value
}

export const getSubject = (language: string, props: any) => {
  const data = props?.subject?.find((g: any) => g._key === language)
  return data?.value
}

export const getSubjectsArray = (language: string, props: any) => {
  const data = props?.subjects?.map((s: any) => {
    const found = s.label.find((g: any) => g._key === language)
    return { value: found.value, label: found.value, key: s._key }
  })

  return data
}

export const getMessage = (language: string, props: any) => {
  const data = props?.message?.find((g: any) => g._key === language)
  return data?.value
}

export const getSubscribe = (language: string, props: any) => {
  const data = props?.subscribe?.find((g: any) => g._key === language)
  return data?.value
}
export const getSubmitButton = (language: string, props: any) => {
  const data = props?.submit?.find((g: any) => g._key === language)
  return data?.value
}
