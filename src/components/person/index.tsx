/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from "react-redux"

import { urlForImage } from "@/sanity/lib/image"
import { setModal } from "@/state/reducers/modals"
import { setPerson } from "@/state/reducers/people"
import { RootState } from "@/state/store"
import { Person as PersonProps } from "@/types/sanity"

import { AnimationFadeIn } from "../animation-fade-in"
import { AnimationMaskReveal } from "../animation-mask-reveal"
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

export const Person = ({
  person,
  index,
}: {
  person: PersonProps
  index: number
}) => {
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
      <Box
        css={{
          column: 9,
          gap: 10,

          "@tablet": {
            column: 9,
          },

          "@desktop": {
            column: 6,
          },
        }}
      >
        <Box css={{ column: 2, "@tablet": { column: 1 } }} />
        <Box
          css={{
            flexShrink: 0,
            column: 5,
            "@tablet": {
              column: 5,
            },

            "@desktop": {
              column: 2,
            },
          }}
        >
          <AnimationMaskReveal delay={Math.min(0.1 * index, 0.2)}>
            <img src={urlForImage(person.image)} alt="Person image" />
          </AnimationMaskReveal>
        </Box>
      </Box>

      {/* TEXT */}
      <Box
        css={{
          marginTop: 28,
          gap: 10,
          "@tablet": {
            marginTop: 60,
          },
        }}
      >
        <Box mobile css={{ column: 2 }} />
        <Text
          body
          css={{
            column: 5,
            boxShadow,

            "@tablet": {
              column: 5,
            },

            "@desktop": {
              column: 3,
            },
          }}
        >
          {getPrimaryName(language, person)}
          <br />
          {getPrimaryRole(language, person)}
        </Text>

        <Box
          tablet
          css={{
            column: 4,
            opacity: 0.5,
            boxShadow,

            "@desktop": {
              column: 3,
            },
          }}
        >
          <Text body>
            {getSecondaryName(language, person)}
            <br />
            {getSecondaryRole(language, person)}
          </Text>
        </Box>
      </Box>

      {/* BUTTON */}
      <Box>
        <Box mobile css={{ column: 2 }} />
        <Button variant="primary" onClick={handlePersonClick}>
          {getCTA(language, settings?.buttons)}
        </Button>
      </Box>
    </Box>
  )
}
