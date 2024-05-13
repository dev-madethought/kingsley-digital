/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"

import { Box } from "@/components/box"
import { Dialog } from "@/components/dialog"
import { useDebug } from "@/components/grid"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { RootState } from "@/state/store"

import {
  getPrimaryDescription,
  getPrimarySinopsis,
  getSecondaryDescription,
  getSecondarySinopsis,
  getTitle,
} from "./translations"

type ModalServiceProps = {
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

const description = {
  block: {
    normal: ({ children }: any) => {
      return <Text cta>{children}</Text>
    },
  },
}

export const ModalService = ({ open, onOpenChange }: ModalServiceProps) => {
  const { boxShadow } = useDebug()
  const language = useSelector((state: RootState) => state.global.language)
  const service = useSelector((state: RootState) => state.service.service)

  const image = service?.images?.[1]

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
          column: 12,

          "@tablet": {
            column: 20,
            marginRight: 40,
          },

          "@desktop": {
            column: 13,
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
            column: 11,
            marginBottom: 40,

            img: {
              width: "100%",
              aspectRatio: "16 / 7",
              objectFit: "cover",
            },

            "@tablet": {
              column: 18,
            },

            "@desktop": {
              column: 11,
            },
          }}
        >
          {image && <img src={urlForImage(image)} alt="header image" />}
        </Box>

        {/* title */}
        <Box css={{ gap: 10, marginBottom: 27 }}>
          <Box css={{ column: 1 }} />

          <Box
            css={{
              column: 10,
              boxShadow,

              "@tablet": {
                column: 10,
              },

              "@desktop": {
                column: 4,
              },
            }}
          >
            <Text headingS>{getTitle(language, service)}</Text>
          </Box>
        </Box>

        <Box css={{ gap: 10 }}>
          <Box css={{ column: 1 }} />
          <Box
            css={{
              flexDirection: "column",
              column: 10,
              marginBottom: 48,
              boxShadow,

              "@tablet": {
                column: 8,
              },

              "@desktop": {
                column: 5,
              },
            }}
          >
            <Text body>{getPrimarySinopsis(language, service)}</Text>
          </Box>

          <Box tablet css={{ column: 1 }} />
          <Box
            tablet
            css={{
              "@tablet": {
                flexDirection: "column",
                column: 8,
                opacity: 0.5,
                marginBottom: 48,
                boxShadow,
              },

              "@desktop": {
                column: 5,
              },
            }}
          >
            <Text body>{getSecondarySinopsis(language, service)}</Text>
          </Box>
        </Box>

        <Box css={{ gap: 10 }}>
          <Box css={{ column: 1 }} />
          <Box
            css={{
              flexDirection: "column",
              column: 10,
              marginBottom: 50,
              boxShadow,

              "@tablet": {
                column: 8,
              },

              "@desktop": {
                column: 5,
              },
            }}
          >
            <PortableText
              value={getPrimaryDescription(language, service) as any}
              components={description}
            />
          </Box>

          <Box tablet css={{ column: 1 }} />
          <Box
            tablet
            css={{
              "@tablet": {
                flexDirection: "column",
                column: 8,
                opacity: 0.5,
                marginBottom: 50,
                boxShadow,
              },

              "@desktop": {
                column: 5,
              },
            }}
          >
            <PortableText
              value={getSecondaryDescription(language, service) as any}
              components={description}
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
