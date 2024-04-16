import { useDispatch, useSelector } from "react-redux"

import { urlForImage } from "@/sanity/lib/image"
import { setModal } from "@/state/reducers/modals"
import { RootState } from "@/state/store"
import { Person as PersonProps } from "@/types/sanity"

import { Box } from "../box"
import { useDebug } from "../grid"

import { getBio, getName, getRole } from "./translations"

export const Person = (props: PersonProps) => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)
  const { border } = useDebug()
  // console.log("person", props)

  const handlePersonClick = () => {
    dispatch(
      setModal({
        type: "bio",
        data: {
          ...props,
          name: getName(language, props),
          role: getRole(language, props),
          bio: getBio(language, props),
          image: urlForImage(props.image),
        },
      })
    )
  }

  return (
    <Box
      css={{
        width: "100%",
        flexShrink: 0,
        aspectRatio: "16 / 9",
        background: "red",
      }}
      onClick={handlePersonClick}
    >
      {getName(language, props)}
    </Box>
  )
}
