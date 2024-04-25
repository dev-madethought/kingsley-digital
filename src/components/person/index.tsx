/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from "react-redux"

import { setModal } from "@/state/reducers/modals"
import { setPerson } from "@/state/reducers/people"
import { RootState } from "@/state/store"
import { Person as PersonProps } from "@/types/sanity"

import { Box } from "../box"
import { Button } from "../button"
import { useDebug } from "../grid"
import { Text } from "../text"

import {
  getCTA,
  getPrimaryName,
  getPrimaryRole,
  getSecondaryName,
  getSecondaryRole,
} from "./translations"

export const Person = ({ person }: { person: PersonProps }) => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)
  const settings = useSelector((state: RootState) => state.global.settings)
  const { boxShadow } = useDebug()

  const handlePersonClick = () => {
    dispatch(setPerson({ ...person }))
    dispatch(setModal({ type: "person" }))
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
      <Box css={{ column: 6, gap: 10 }}>
        <Box css={{ column: 1 }} />
        <Box css={{ flexShrink: 0, column: 2 }}>
          <img src="/test.png" alt="Yo" />
        </Box>
      </Box>

      {/* TEXT */}
      <Box css={{ marginTop: 60, gap: 10 }}>
        <Text
          body
          css={{
            column: 3,
            boxShadow,
          }}
        >
          {getPrimaryName(language, person)}
          <br />
          {getPrimaryRole(language, person)}
        </Text>

        <Text
          body
          css={{
            column: 3,
            opacity: 0.5,
            boxShadow,
          }}
        >
          {getSecondaryName(language, person)}
          <br />
          {getSecondaryRole(language, person)}
        </Text>
      </Box>

      {/* BUTTON */}
      <Button variant="primary" onClick={handlePersonClick}>
        {getCTA(language, settings?.buttons)}
      </Button>
    </Box>
  )
}
