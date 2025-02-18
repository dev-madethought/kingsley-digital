export const getMenuTitle = (language: string, props: any) => {
  const data = props.menu?.find((e: any) => e._key === language)
  return data?.value
}

export const getPrimaryTitle = (language: string, props: any) => {
  const data = props.title?.find((e: any) => e._key === language)
  return data?.value
}

export const getSecondaryTitle = (language: string, props: any) => {
  const data = props.title?.find((e: any) => e._key !== language)
  return data?.value
}

export const getPrimaryDescription = (language: string, props: any) => {
  const data = props.description?.find((e: any) => e._key === language)
  return data?.value
}

export const getSecondaryDescription = (language: string, props: any) => {
  const data = props.description?.find((e: any) => e._key !== language)
  return data?.value
}

export const getCaption = (language: string, props: any) => {
  const data = props.caption?.find((e: any) => e._key === language)
  return data?.value
}

export const getSecondaryCaption = (language: string, props: any) => {
  const data = props.caption?.find((e: any) => e._key !== language)
  return data?.value
}
