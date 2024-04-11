export const getNewsletterTitle = (language: string, props: any) => {
  const data = props.newsletter?.title?.find((g: any) => g._key === language)
  return data?.value
}

export const getNewsletterPlaceholder = (language: string, props: any) => {
  const data = props.newsletter?.placeholder?.find(
    (g: any) => g._key === language
  )
  return data?.value
}

export const getNewsletterAgreement = (language: string, props: any) => {
  const data = props.newsletter?.agreement?.find(
    (g: any) => g._key === language
  )
  return data?.value
}
