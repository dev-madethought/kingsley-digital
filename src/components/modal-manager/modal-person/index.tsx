/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Dialog } from "@/components/dialog"
import { useDebug } from "@/components/grid"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { RootState } from "@/state/store"

import {
  getEmailButton,
  getLinkedinButton,
  getName,
  getPrimaryBio,
  getRole,
  getSecondaryBio,
} from "./translations"

type ModalPersonProps = {
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const ModalPerson = ({ open, onOpenChange }: ModalPersonProps) => {
  const { boxShadow } = useDebug()
  const language = useSelector((state: RootState) => state.global.language)
  const settings = useSelector((state: RootState) => state.global.settings)
  const person = useSelector((state: RootState) => state.people.person)

  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) onOpenChange(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Box
        css={{
          height: "var(--vh)",
          overflowY: "auto",
          marginRight: 20,
          flexDirection: "column",
          column: 11,

          "@tablet": {
            marginRight: 40,
          },

          "&::-webkit-scrollbar": {
            height: 5,
            width: 5,
            background: "$darker",
            borderRadius: "1ex",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "$typography",
            borderRadius: "1ex",
          },
        }}
      >
        {/* image */}
        <Box
          css={{
            column: 4,
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
          <Box css={{ column: 1 }} />

          <Box
            css={{
              column: 4,
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
          <Box css={{ column: 1 }} />
          <Box
            css={{
              flexDirection: "column",
              column: 4,
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
          <Box css={{ column: 1 }} />
          <Box
            css={{
              flexDirection: "column",
              column: 4,
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
              gap: 10,
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            <Box
              css={{
                column: 1,
              }}
            />

            <Box
              css={{
                column: 10,
                boxShadow,
              }}
            >
              <Box
                css={{
                  justifyContent: "space-between",
                  width: "100%",
                  textTransform: "uppercase",
                }}
              >
                <Button variant="secondary" href={`mailto:${person.email}`}>
                  {getEmailButton(language, settings?.buttons)}
                </Button>
                <Button variant="tertiary" href={`tel:${person.phone}`}>
                  {person.phone}
                </Button>
                <Button variant="secondary" href={person.linkedin}>
                  {getLinkedinButton(language, settings?.buttons)}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  )
}
