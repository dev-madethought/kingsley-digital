import { Korean } from "@/types/language"
import { Philosophy } from "@/types/sanity"

export const getMainTitle = (language: string, props: Philosophy) => {
  if (language === Korean) {
    return props.koreanTitle
  }

  return props.englishTitle
}

export const getSecondaryTitle = (language: string, props: Philosophy) => {
  if (language === Korean) {
    return props.englishTitle
  }

  return props.koreanTitle
}

export const getMainBody = (language: string, props: Philosophy) => {
  if (language === Korean) {
    return props.koreanBody
  }

  return props.englishBody
}

export const getSecondaryBody = (language: string, props: Philosophy) => {
  if (language === Korean) {
    return props.englishBody
  }

  return props.koreanBody
}
