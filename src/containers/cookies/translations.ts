export const getCookiesMessage = (language: string, props: any) => {
  const data = props?.message?.find((g: any) => g._key === language)
  return data?.value
}

export const getCookiesCTA = (language: string, props: any) => {
  const data = props?.cta?.find((g: any) => g._key === language)
  return data?.value
}
