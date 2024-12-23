import { ReactElement, useState } from "react"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"

import { PortableText } from "@portabletext/react"
import { getImageDimensions } from "@sanity/asset-utils"
import { type SanityImageSource } from "@sanity/image-url/lib/types/types"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { AnimationMaskReveal } from "@/components/animation-mask-reveal"
import { Box } from "@/components/box"
// import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid, useDebug } from "@/components/grid"
import Heading from "@/components/heading"
import { components } from "@/components/portable-text"
import { Text } from "@/components/text"
import { TranslatedRow } from "@/components/translated-row"
import { urlFor, urlForImage } from "@/sanity/lib/image"
import { setModal } from "@/state/reducers/modals"
import { setService } from "@/state/reducers/service"
import { RootState } from "@/state/store"
import { Services as ServicesProps } from "@/types/sanity"

import * as Styles from "./styles"
import {
  // getLearnMoreButton,
  getServiceDescription,
  getServiceTitle,
} from "./translations"

// New type definitions
type ServiceImage = {
  _key: string
  images?: string[]
}

// Custom hook for service management
const useServiceManagement = (props: ServicesProps) => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)
  const [activeKey, setActiveKey] = useState<string | undefined>()

  const handleServiceChange = (value: string) => {
    const service = props.allServices?.find((s) => s._key === value)
    if (service) {
      dispatch(setService({ ...service }))
      setActiveKey(value === activeKey ? undefined : value)
    }
  }

  return {
    activeKey,
    language,
    handleServiceChange,
  }
}

// Image layout components
const DefaultImage = ({ image }: { image: any }) => (
  <Box
    css={{
      position: "relative",
      alignItems: "flex-start",
      column: 9,
      img: {
        width: "100%",
        height: "auto",
        objectFit: "contain",
      },
    }}
  >
    <AnimationMaskReveal>
      <Image src={urlForImage(image)} alt="default" width={732} height={556} />
    </AnimationMaskReveal>
  </Box>
)

const ServiceImages = ({ images }: { images: string[] }) => (
  <Box css={{ gap: 10 }}>
    <Box
      css={{
        column: 7,
        position: "relative",
        alignItems: "flex-start",
        img: {
          width: "100%",
          height: "auto",
          objectFit: "contain",
          objectPosition: "top",
        },
      }}
    >
      {images[0] && (
        <AnimationMaskReveal>
          <Image src={images[0]} alt="image 1" width={504} height={756} />
        </AnimationMaskReveal>
      )}
    </Box>

    <Box
      desktop
      css={{
        column: 6,
        position: "relative",
        alignItems: "flex-start",
        img: {
          width: "100%",
          height: "auto",
          objectFit: "contain",
          objectPosition: "top",
        },
      }}
    >
      {images[1] && (
        <AnimationMaskReveal delay={0.125}>
          <Image src={images[1]} alt="image 2" width={275} height={200} />
        </AnimationMaskReveal>
      )}
    </Box>
  </Box>
)

// Accordion item component
const ServiceAccordionItem = ({
  service,
  index,
  language,
}: {
  service: any
  index: number
  language: string
}) => (
  <Styles.AccordionItem value={service._key}>
    <Styles.AccordionTrigger>
      <Box css={{ gap: 10 }}>
        <Box css={{ column: 1, paddingLeft: 8, alignItems: "center" }}>
          {String(index + 1).padStart(2, "0")}
        </Box>
        <Text headingS>{getServiceTitle(language, service)}</Text>
      </Box>
      <Box
        css={{
          position: "relative",
          alignItems: "center",
          justifyContent: "flex-end",
          width: 24,
          height: 24,

          "&:before": {
            content: '""',
            position: "absolute",
            top: "50%",
            right: 6,
            width: 13,
            height: 1,
            background: "$typography",
            transition: "all 300ms ease-out",
          },

          "&:after": {
            content: '""',
            position: "absolute",
            right: 12,
            width: 1,
            height: 13,
            background: "$typography",
            opacity: 1,
            transition: "all 300ms ease-out",
          },

          "[data-state=open] &": {
            "&:before": {
              transform: "rotate(180deg)",
            },

            "&:after": {
              opacity: 0,
              transform: "rotate(270deg)",
            },
          },
        }}
      />
    </Styles.AccordionTrigger>
    <Styles.AccordionContent>
      <Box css={{ column: 1 }} />
      <Box
        css={{
          column: 8,
          flexDirection: "column",
          gap: 24,
          paddingTop: 24,
          paddingBottom: 64,

          "@tablet": {
            column: 12,
            paddingBottom: 48,
          },

          "@desktop": {
            column: 8,
            paddingBottom: 64,
          },
        }}
      >
        <AnimationFadeIn>
          <PortableText
            value={getServiceDescription(language, service) as any}
            components={components}
          />
        </AnimationFadeIn>
      </Box>
    </Styles.AccordionContent>
  </Styles.AccordionItem>
)

// Main component
export const Services = (props: ServicesProps) => {
  const { debug, boxShadow } = useDebug()
  const { activeKey, language, handleServiceChange } =
    useServiceManagement(props)

  const renderImageLayout = () => {
    if (!activeKey) {
      return <DefaultImage image={props.image} />
    }

    const activeService = props.allServices?.find((s) => s._key === activeKey)
    const images = activeService?.images?.map((i) => urlForImage(i)) || []
    return <ServiceImages images={images} />
  }

  return (
    <Container
      debug={debug}
      css={{
        paddingTop: 166,
        paddingBottom: 56,

        "@tablet": {
          paddingTop: 172,
          paddingBottom: 108,
        },
      }}
    >
      <Grid
        css={{
          rowGap: 40,
        }}
      >
        <Heading props={props} language={language} translationKey="title" />
        <TranslatedRow props={props} translationKey="description" />

        {/* Images Section */}
        <Box
          css={{
            gridColumn: "span 10",
            marginTop: 56,
            marginBottom: 48,

            "@tablet": {
              marginBottom: 0,
              gridColumn: "1 / span 9",
            },

            "@desktop": {
              marginBottom: 0,
              gridColumn: "1 / span 14",
            },
          }}
        >
          <AnimatePresence>{renderImageLayout()}</AnimatePresence>
        </Box>

        {/* Accordion Section */}
        <Box
          css={{
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "10 / span 15",
              marginTop: 56,
            },

            "@desktop": {
              gridColumn: "15 / span 10",
              marginTop: 56,
            },
          }}
        >
          <Styles.AccordionRoot
            type="single"
            collapsible
            onValueChange={handleServiceChange}
          >
            {props.allServices?.map((service, i) => (
              <ServiceAccordionItem
                key={service._key}
                service={service}
                index={i}
                language={language}
              />
            ))}
          </Styles.AccordionRoot>
        </Box>
      </Grid>
    </Container>
  )
}
