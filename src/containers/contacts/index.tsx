import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { useDebug } from "@/components/grid"
import { Grid } from "@/components/grid"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { setModal } from "@/state/reducers/modals"
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
  const dispatch = useDispatch()
  const settings = useSelector((state: RootState) => state.global.settings)
  const language = useSelector((state: RootState) => state.global.language)
  const { debug, boxShadow } = useDebug()

  const image = urlForImage(props.image)

  const handleClick = () => {
    dispatch(setModal({ type: "contacts" }))
  }

  return (
    <Container debug={debug} css={{ background: "$darker" }}>
      <Grid
        css={{
          paddingTop: 145,
          paddingBottom: 95,

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
            marginBottom: 56,
            boxShadow,
            textWrap: "balance",

            "@tablet": {
              gridColumn: "1 / span 19",
              marginBottom: 0,
            },

            "@desktop": {
              gridColumn: "1 / span 11",
              marginBottom: 0,
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
              gridColumn: "1 / span 11",
              marginTop: 154,
            },

            "@desktop": {
              gridColumn: "1 / span 8",
              marginTop: 154,
            },
          }}
        >
          <Text body>{getPrimaryDescription(language, props)}</Text>
        </Box>

        <Box
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              opacity: 0.5,
              boxShadow,
              gridColumn: "13 / span 11",
              marginTop: 154,
            },

            "@desktop": {
              gridColumn: "10 / span 8",
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
            marginTop: 40,

            "@tablet": {
              marginBottom: 80,
            },
          }}
        >
          <Button onClick={handleClick}>
            {getButtonContactUs(language, settings?.buttons)}
          </Button>
        </Box>

        {/* emails & links MOBILE*/}
        <Box
          mobile
          css={{
            flexDirection: "column",
            gridColumn: "1 / span 12",
            boxShadow,
            marginTop: 36,
            gap: 20,
          }}
        >
          {/* links mobile */}
          {props.links?.map((link) => (
            <Box key={link._key} css={{ flexDirection: "column" }}>
              <Text cta>{getPrimaryEmailLabel(language, link)}</Text>
              <Button
                key={link._key}
                variant="secondary"
                href={`mailto:${link.email}`}
              >
                <Text cta css={{ textAlign: "right" }}>
                  {link.email}
                </Text>
              </Button>
            </Box>
          ))}

          {/* numbers mobile */}
          {props.numbers?.map((link) => (
            <Box key={link._key} css={{ flexDirection: "column" }}>
              <Text cta>{getPrimaryPhoneLabel(language, link)}</Text>
              <Button
                key={link._key}
                variant="secondary"
                href={`mailto:${link.phone}`}
              >
                <Text cta css={{ textAlign: "right" }}>
                  {link.phone}
                </Text>
              </Button>
            </Box>
          ))}
        </Box>

        {/* emails & links TABLET / DESKTOP */}
        <Box
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              gridColumn: "1 / span 5",
              boxShadow,
              marginTop: 36,
            },

            "@desktop": {
              flexDirection: "column",
              gridColumn: "10 / span 2",
              boxShadow,
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
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              gridColumn: "7 / span 5",
              boxShadow,
              opacity: 0.5,
              marginTop: 36,
            },

            "@desktop": {
              gridColumn: "13 / span 3",
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
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              gridColumn: "13 / span 3",
              boxShadow,
              marginTop: 36,
            },

            "@desktop": {
              gridColumn: "16 / span 5",
            },
          }}
        >
          {props.links?.map((link) => (
            <Button
              key={link._key}
              variant="secondary"
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
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              gridColumn: "1 / span 5",
              boxShadow,
              marginTop: 16,
            },

            "@desktop": {
              gridColumn: "10 / span 2",
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
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              gridColumn: "7 / span 5",
              boxShadow,
              opacity: 0.5,
              marginTop: 16,
            },

            "@desktop": {
              gridColumn: "13 / span 3",
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
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              gridColumn: "13 / span 3",
              boxShadow,
              marginTop: 16,
            },

            "@desktop": {
              gridColumn: "16 / span 5",
            },
          }}
        >
          {props.numbers?.map((number) => (
            <Button
              key={number._key}
              variant="secondary"
              href={`tel:${number.phone}`}
            >
              <Text cta css={{ textAlign: "right" }}>
                {number.phone}
              </Text>
            </Button>
          ))}
        </Box>

        {/* image mobile */}
        <Box
          mobile
          css={{
            flexDirection: "column",
            gridColumn: "3 / span 10",
            boxShadow,
            marginTop: 80,
          }}
        >
          <Box
            css={{
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

        {/* Address */}
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "1 / span 12",
            marginTop: 64,
            boxShadow,

            "@tablet": {
              gridColumn: "7 / span 8",
              marginTop: 189,
            },

            "@desktop": {
              gridColumn: "10 / span 5",
            },
          }}
        >
          <Text body css={{ marginBottom: 24 }}>
            {getPrimaryAddress(language, props)}
          </Text>
          <Text body css={{ marginBottom: 16, opacity: 0.5 }}>
            {getSecondaryAddress(language, props)}
          </Text>
          <Button variant="secondary" href={props.gps}>
            {getButtonMap(language, settings?.buttons)}
          </Button>
        </Box>

        {/* image desktop */}
        <Box
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              boxShadow,
              gridColumn: "17 / span 8",
              marginTop: 189,
            },

            "@desktop": {
              gridColumn: "18 / span 7",
            },
          }}
        >
          <Box
            css={{
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
