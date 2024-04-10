import { Korean } from "@/types/language"
import { Hero } from "@/types/sanity"

export const getGreeting = (language: string, props: Hero) => {
  if (language === Korean) {
    return props.koreanGreeting
  }

  return props.englishGreeting
}

export const getSentence = (language: string, props: Hero) => {
  if (language === Korean) {
    return props.koreanSentence
  }

  return props.englishSentence
}

export const getMainTitle = (language: string, props: Hero) => {
  if (language === Korean) {
    return props.koreanTitle
  }

  return props.englishTitle
}

export const getSecondaryTitle = (language: string, props: Hero) => {
  if (language === Korean) {
    return props.englishTitle
  }

  return props.koreanTitle
}

export const getMainDescription = (language: string, props: Hero) => {
  if (language === Korean) {
    return props.koreanDescription
  }

  return props.englishDescription
}

export const getSecondaryDescription = (language: string, props: Hero) => {
  if (language === Korean) {
    return props.englishDescription
  }

  return props.koreanDescription
}
