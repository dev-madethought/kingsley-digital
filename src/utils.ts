import { languages } from "../sanity.config"

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const otherLanguage = (language: string) => {
  return language === "en" ? "ko" : "en"
}
