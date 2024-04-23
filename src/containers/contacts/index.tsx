import Image from "next/image"
import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { useDebug } from "@/components/grid"
import { Grid } from "@/components/grid"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { RootState } from "@/state/store"
import { Contacts as ContactsProps } from "@/types/sanity"

import {
  getButtonContactUs,
  getButtonMap,
  getPrimaryAddress,
  getPrimaryDescription,
  getPrimaryEmailLabel,
  getPrimaryPhoneLabel,
  getSecondaryAddress,
  getSecondaryDescription,
  getSecondaryEmailLabel,
  getSecondaryPhoneLabel,
  getTitle,
} from "./translations"

export const Contacts = (props: ContactsProps) => {
  const settings = useSelector((state: RootState) => state.global.settings)
  const language = useSelector((state: RootState) => state.global.language)
  const { debug, boxShadow } = useDebug()

  const image = urlForImage(props.image)

  return (
    <Container debug={debug} css={{ background: "$background" }}>
      <Grid
        css={{
          "@tablet": {
            paddingTop: 172,
            paddingBottom: 78,
          },
        }}
      >
        {/* title */}
        <Box
          css={{
            gridColumn: "1 / span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "1 / span 11",
            },
          }}
        >
          <Text headingL>{getTitle(language, props)}</Text>
        </Box>

        {/* description */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "1 / span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "1 / span 8",
              marginTop: 154,
            },
          }}
        >
          <Text body>{getPrimaryDescription(language, props)}</Text>
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "1 / span 12",
            opacity: 0.5,
            boxShadow,

            "@tablet": {
              gridColumn: "10 / span 8",
              marginTop: 154,
            },
          }}
        >
          <Text body>{getSecondaryDescription(language, props)}</Text>
        </Box>

        {/* contacts */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "1 / span 12",
            boxShadow,

            "@tablet": {
              marginTop: 36,
            },
          }}
        >
          <Button>{getButtonContactUs(language, settings?.buttons)}</Button>
        </Box>

        {/* emails */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "10 / span 3",
            boxShadow,

            "@tablet": {
              marginTop: 36,
            },
          }}
        >
          {props.links?.map((link) => (
            <Text key={link._key} cta>
              {getPrimaryEmailLabel(language, link)}
            </Text>
          ))}
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "13 / span 3",
            boxShadow,
            opacity: 0.5,

            "@tablet": {
              marginTop: 36,
            },
          }}
        >
          {props.links?.map((link) => (
            <Text key={link._key} cta>
              {getSecondaryEmailLabel(language, link)}
            </Text>
          ))}
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "20 / span 5",
            boxShadow,

            "@tablet": {
              marginTop: 36,
            },
          }}
        >
          {props.links?.map((link) => (
            <Button
              key={link._key}
              type="secondary"
              href={`mailto:${link.email}`}
            >
              <Text cta css={{ textAlign: "right" }}>
                {link.email}
              </Text>
            </Button>
          ))}
        </Box>

        {/* phones */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "10 / span 3",
            boxShadow,

            "@tablet": {
              marginTop: 16,
            },
          }}
        >
          {props.numbers?.map((number) => (
            <Text key={number._key} cta>
              {getPrimaryPhoneLabel(language, number)}
            </Text>
          ))}
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "13 / span 3",
            boxShadow,
            opacity: 0.5,

            "@tablet": {
              marginTop: 16,
            },
          }}
        >
          {props.numbers?.map((number) => (
            <Text key={number._key} cta>
              {getSecondaryPhoneLabel(language, number)}
            </Text>
          ))}
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "20 / span 5",
            boxShadow,

            "@tablet": {
              marginTop: 16,
            },
          }}
        >
          {props.numbers?.map((number) => (
            <Button
              key={number._key}
              type="secondary"
              href={`tel:${number.phone}`}
            >
              <Text cta css={{ textAlign: "right" }}>
                {number.phone}
              </Text>
            </Button>
          ))}
        </Box>

        {/* Address */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "1 / span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "10 / span 5",
              marginTop: 189,
            },
          }}
        >
          <Text body css={{ marginBottom: 24 }}>
            {getPrimaryAddress(language, props)}
          </Text>
          <Text body css={{ marginBottom: 16, opacity: 0.5 }}>
            {getSecondaryAddress(language, props)}
          </Text>
          <Button type="secondary" href={props.gps}>
            {getButtonMap(language, settings?.buttons)}
          </Button>
        </Box>

        {/* image */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "1 / span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "18 / span 7",
              marginTop: 189,
            },
          }}
        >
          <Box
            css={{
              // column: 9,

              img: {
                width: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "top",
              },
            }}
          >
            {image && (
              <Image src={image} alt="image" width={390} height={521} />
            )}
          </Box>
        </Box>
      </Grid>
    </Container>
  )
}
