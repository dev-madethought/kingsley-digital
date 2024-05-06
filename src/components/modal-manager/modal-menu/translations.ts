export const getPrimaryLabel = (language: string, props: any) => {
  const data = props?.label?.find((g: any) => g._key === language)
  return data?.value
}
