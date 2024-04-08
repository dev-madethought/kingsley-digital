import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { RootState } from "@/state/store"

export const Language = () => {
  const language = useSelector((state: RootState) => state.global.language)
  console.log("language", language)

  return <Box>Language: END / KO</Box>
}
