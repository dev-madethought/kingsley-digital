/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from "react-redux"

import { getWidth } from "@/components/grid"
import { setModal } from "@/state/reducers/modals"
import { setPerson } from "@/state/reducers/people"
import { RootState } from "@/state/store"
import { Person as PersonProps } from "@/types/sanity"

import { Box } from "../box"
import { Button } from "../button"
import { useDebug } from "../grid"
import { Text } from "../text"

import { getName } from "./translations"

export const Person = ({ person }: { person: PersonProps }) => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)
  const { boxShadow } = useDebug()

  const handlePersonClick = () => {
    // set person
    dispatch(setPerson({ ...person }))
    // show
    dispatch(
      setModal({
        type: "bio",
        data: person,
      })
    )
  }

  return (
    <Box
      css={{
        flexDirection: "column",
        flexShrink: 0,
        gap: 10,
        boxShadow,
      }}
    >
      {/* IMAGE */}
      <Box css={{ width: getWidth(6), gap: 10 }}>
        <Box css={{ width: getWidth(1) }} />
        <Box css={{ flexShrink: 0, width: getWidth(2) }}>
          <img src="/test.png" alt="Yo" />
        </Box>
      </Box>

      {/* TEXT */}
      <Box css={{ marginTop: 60, gap: 10 }}>
        <Text body css={{ width: getWidth(3), boxShadow }}>
          {getName(language, person)}
          <br />
          CEO
        </Text>

        <Text body css={{ width: getWidth(3), opacity: 0.5, boxShadow }}>
          Person KO
          <br />
          CEO
        </Text>
      </Box>

      {/* BUTTON */}
      <Box>
        <Button type="primary" onClick={handlePersonClick}>
          READ BIO
        </Button>
      </Box>
    </Box>
  )
}
