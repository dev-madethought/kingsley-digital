/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Dialog } from "@/components/dialog"
import { getWidth, useDebug } from "@/components/grid"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { RootState } from "@/state/store"

import {
  getName,
  getPrimaryBio,
  getRole,
  getSecondaryBio,
} from "./translations"

type ModalBioProps = {
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const ModalBio = ({ open, onOpenChange }: ModalBioProps) => {
  const { boxShadow } = useDebug()
  const language = useSelector((state: RootState) => state.global.language)
  const person = useSelector((state: RootState) => state.people.person)

  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) onOpenChange(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Box
        css={{
          width: getWidth(11),
          maxWidth: "100%",
          height: "100vh",
          overflow: "auto",
          marginRight: 20,
          flexDirection: "column",

          // "&::-webkit-scrollbar": {
          //   height: 5,
          //   width: 5,
          //   background: "$darker",
          //   borderRadius: "1ex",
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   background: "$typography",
          //   borderRadius: "1ex",
          // },

          "@tablet": {
            marginRight: 40,
          },
        }}
      >
        {/* image */}
        <Box
          css={{
            width: getWidth(4),
            marginBottom: 44,
          }}
        >
          {person?.image && (
            <img
              src={urlForImage(person.image)}
              alt={`${getName(language, person)} image`}
            />
          )}
        </Box>

        {/* name */}
        <Box css={{ gap: 10, marginBottom: 27 }}>
          <Box css={{ width: getWidth(1) }} />

          <Box
            css={{
              width: getWidth(4),
              boxShadow,
            }}
          >
            {person && (
              <Text headingS>
                {getName(language, person)}
                <br />
                {getRole(language, person)}
              </Text>
            )}
          </Box>
        </Box>

        <Box css={{ gap: 10 }}>
          <Box css={{ width: getWidth(1) }} />
          <Box
            css={{
              flexDirection: "column",
              width: getWidth(4),
              boxShadow,
            }}
          >
            {person && (
              <PortableText
                value={getPrimaryBio(language, person) as any}
                components={components}
              />
            )}
          </Box>
          <Box css={{ width: getWidth(1) }} />
          <Box
            css={{
              flexDirection: "column",
              width: getWidth(4),
              boxShadow,
            }}
          >
            {person && (
              <PortableText
                value={getSecondaryBio(language, person) as any}
                components={components}
              />
            )}
          </Box>
        </Box>

        {person && (
          <Box
            css={{
              width: getWidth(11),
              gap: 10,
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            <Box css={{ width: getWidth(1) }} />

            <Box css={{ width: getWidth(10), boxShadow }}>
              <Box
                css={{
                  justifyContent: "space-between",
                  width: "100%",
                  textTransform: "uppercase",
                }}
              >
                <Button type="secondary" href={`mailto:${person.email}`}>
                  Email
                </Button>
                <Button type="tertiary" href={`tel:${person.phone}`}>
                  {person.phone}
                </Button>
                <Button type="secondary" href={person.linkedin}>
                  LinkedIN
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  )
}
