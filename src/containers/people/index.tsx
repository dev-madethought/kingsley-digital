/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useRef } from "react"
import { scroll } from "framer-motion/dom"
import { useDispatch, useSelector } from "react-redux"

import { AnimationFadeIn } from "@/components/animation-fade-in"
import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { useDebug } from "@/components/grid"
import { Person } from "@/components/person"
import {
  getCTA,
  getPrimaryDepartment,
  getPrimaryName,
  getPrimaryRole,
} from "@/components/person/translations"
import { Text } from "@/components/text"
import { urlForImage } from "@/sanity/lib/image"
import { setModal } from "@/state/reducers/modals"
import { setPerson } from "@/state/reducers/people"
import { RootState } from "@/state/store"
import { People as PeopleProps } from "@/types/sanity"

import {
  getPrimaryDescription,
  getSecondaryDescription,
  getTitle,
} from "./translations"

export const People = (props: PeopleProps) => {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.global.language)
  const settings = useSelector((state: RootState) => state.global.settings)
  const { debug, boxShadow } = useDebug()

  const domElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let unsubscribe = null

    if (domElement.current) {
      unsubscribe = scroll(() => null, {
        source: domElement.current,
        axis: "x",
      })
    }

    return () => {
      unsubscribe?.()
    }
  }, [])

  const handlePersonClick = (person: any) => {
    dispatch(setPerson({ ...person }))
    dispatch(setModal({ type: "person" }))
  }

  return (
    <Container
      debug={debug}
      css={{
        paddingTop: 120,
        paddingBottom: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",

        "@tablet": {
          paddingTop: 172,
          paddingBottom: 108,
        },
      }}
    >
      <Grid>
        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            marginBottom: 40,
            boxShadow,

            "@tablet": {
              marginBottom: 88,
              gridColumn: "1 / span 5",
            },
          }}
        >
          <AnimationFadeIn>
            <Text headingM>{getTitle(language, props)}</Text>
          </AnimationFadeIn>
        </Box>

        <Box
          css={{
            flexDirection: "column",
            gridColumn: "span 12",
            boxShadow,

            "@tablet": {
              gridColumn: "8 / span 8",
            },

            "@desktop": {
              gridColumn: "1 / span 6",
            },
          }}
        >
          <AnimationFadeIn>
            {getPrimaryDescription(language, props)}
          </AnimationFadeIn>
        </Box>

        <Box
          tablet
          css={{
            "@tablet": {
              flexDirection: "column",
              gridColumn: "17 / span 8",
              opacity: 0.5,
              boxShadow,
            },

            "@desktop": {
              gridColumn: "8 / span 6",
            },
          }}
        >
          <AnimationFadeIn>
            {getSecondaryDescription(language, props)}
          </AnimationFadeIn>
        </Box>
      </Grid>

      {/* mobile grid */}
      <Box mobile css={{ width: "100%" }}>
        <Grid
          css={{
            paddingTop: 40,
            width: "100%",
            paddingBottom: 40,

            rowGap: 20,
          }}
        >
          {props.people?.map((person, i) => (
            <Fragment key={i}>
              <Box
                css={{
                  // 5 span col
                  gridColumn: "span 5",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* image */}
                <Box
                  css={{
                    flexShrink: 0,
                    column: 5,
                    marginBottom: 28,
                  }}
                >
                  <AnimationFadeIn>
                    <img src={urlForImage(person.image)} alt="Person image" />
                  </AnimationFadeIn>
                </Box>

                {/* name and title */}
                <Box
                  css={{
                    flexShrink: 0,
                    column: 5,
                    marginBottom: 28,
                  }}
                >
                  {getPrimaryName(language, person)}
                  <br />
                  {getPrimaryRole(language, person)}
                  <br />
                  {getPrimaryDepartment(language, person)}
                </Box>

                {/* cta */}
                <Box
                  css={{
                    flexShrink: 0,
                  }}
                >
                  <Button
                    variant="primary"
                    onClick={() => handlePersonClick(person)}
                  >
                    {getCTA(language, settings?.buttons)}
                  </Button>
                </Box>
              </Box>

              {i < (props.people?.length || 1) - 1 && (
                <Box
                  css={{
                    gridColumn: "span 1",
                  }}
                />
              )}
            </Fragment>
          ))}
        </Grid>
      </Box>

      {/* tablet and desktop scroll */}
      <Box
        tablet
        css={{
          paddingTop: 88,
          paddingBottom: 40,
          overflowX: "auto",
          column: 12,
          gap: 10,

          "@tablet": {
            paddingTop: 88,
            column: 24,
          },

          "@desktop": {
            column: 15,
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
        {props.people?.map((person, i) => (
          <Fragment key={i}>
            <Person person={person} index={i} />
            {i < (props.people?.length || 1) - 1 && (
              <Box tablet css={{ flexShrink: 0, column: 1, boxShadow }} />
            )}
          </Fragment>
        ))}
      </Box>
    </Container>
  )
}
