import { useDispatch, useSelector } from "react-redux"
import Cookie from "universal-cookie"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { setLanguage } from "@/state/reducers/global"
import { RootState } from "@/state/store"
import { English, Korean, Languages } from "@/types/language"

export const Language = ({ color }: { color: string }) => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)

  const handleLanguage = (nextLanguage: Languages) => {
    dispatch(setLanguage(nextLanguage))

    const cookies = new Cookie()
    cookies.set("language", nextLanguage, { path: "/" })
  }

  console.log("language", color)

  return (
    <Box
      css={{
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        color,
      }}
    >
      <Button
        variant="language"
        disabled={language === English}
        onClick={() => handleLanguage(English)}
      >
        ENG
      </Button>
      <span>/</span>
      <Button
        variant="language"
        disabled={language === Korean}
        onClick={() => handleLanguage(Korean)}
      >
        KO
      </Button>
    </Box>
  )
}
