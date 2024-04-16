import { useSelector } from "react-redux"

import { RootState } from "@/state/store"
import { Person as PersonProps } from "@/types/sanity"

import { Box } from "../box"
import { useDebug } from "../grid"

import { getName } from "./translations"

export const Person = (props: PersonProps) => {
  const language = useSelector((state: RootState) => state.global.language)
  const { border } = useDebug()
  // console.log("person", props)

  return (
    <Box
      css={{
        // width: "var(--span6)",
        // border: "2px dashed black",

        width: "100%",
        flexShrink: 0,
        aspectRatio: "16 / 9",
        background: "red",
      }}
    >
      {/* {getName(language, props)} */}
      <Box
        css={{
          gridColumn: "3 / span 3",
          border: "1px solid black",
          aspectRatio: 9 / 16,
        }}
      >
        image
      </Box>
    </Box>
  )
}
