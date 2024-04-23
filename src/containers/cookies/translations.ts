export const getCookiesMessage = (language: string, props: any) => {
  const data = props?.message?.find((g: any) => g._key === language)
  return data?.value
}

export const getButtonGotIt = (language: string, props: any) => {
  const data = props?.gotit?.find((g: any) => g._key === language)
  return data?.value
}
