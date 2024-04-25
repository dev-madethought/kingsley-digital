import { useDispatch, useSelector } from "react-redux"
import Cookie from "universal-cookie"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Text } from "@/components/text"
import { setLanguage } from "@/state/reducers/global"
import { RootState } from "@/state/store"
import { English, Korean, Languages } from "@/types/language"

export const Language = () => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)

  const handleLanguage = (nextLanguage: Languages) => {
    dispatch(setLanguage(nextLanguage))

    const cookies = new Cookie()
    cookies.set("language", nextLanguage, { path: "/" })
  }

  return (
    <Box
      css={{
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        marginBottom: 24,
      }}
    >
      <Button
        variant="tertiary"
        disabled={language === English}
        onClick={() => handleLanguage(English)}
      >
        ENG
      </Button>
      <span>/</span>
      <Button
        variant="tertiary"
        disabled={language === Korean}
        onClick={() => handleLanguage(Korean)}
      >
        KO
      </Button>
    </Box>
  )
}
