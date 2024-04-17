/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Dialog } from "@/components/dialog"
import { Grid, useDebug } from "@/components/grid"
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
      <Container>
        <Grid
          css={{
            position: "relative",
            overflowX: "auto",
            overflowY: "scroll",
            // height: "100vh",
          }}
        >
          <Box
            css={{
              position: "fixed",
              top: 0,
              bottom: 0,
              gridColumn: "14 / span 11",
              width: "calc(100% + 40px)",
              height: "100vh",
              backgroundColor: "$background",
              zIndex: -1,
            }}
          />

          <Box
            css={{
              gridColumn: "14 / span 4",
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

          {person && (
            <Box
              css={{
                gridColumn: "15 / span 4",
                flexDirection: "column",
                marginBottom: 27,
                boxShadow,
              }}
            >
              <Text headingS>{getName(language, person)}</Text>
              <Text headingS>{getRole(language, person)}</Text>
            </Box>
          )}

          {person && (
            <Box
              css={{
                flexDirection: "column",
                gridColumn: "15 / span 4",
                boxShadow,
              }}
            >
              <PortableText
                value={getPrimaryBio(language, person) as any}
                components={components}
              />
            </Box>
          )}

          {person && (
            <Box
              css={{
                flexDirection: "column",
                gridColumn: "20 / span 4",
                opacity: 0.5,
                boxShadow,
              }}
            >
              <PortableText
                value={getSecondaryBio(language, person) as any}
                components={components}
              />
            </Box>
          )}

          {person && (
            <Box
              css={{
                gridColumn: "15 / span 10",
                marginTop: 50,
                marginBottom: 50,
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
          )}
        </Grid>
      </Container>
    </Dialog>
  )
}
