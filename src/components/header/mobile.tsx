import Link from "next/link"
import { useDispatch } from "react-redux"

import { setModal } from "@/state/reducers/modals"

import { Box } from "../box"
import { Container } from "../container"
import { Grid, useDebug } from "../grid"
import { Hamburger, LogoFull } from "../icons"

import * as Styles from "./styles"

export const Mobile = ({ color }: { color: string }) => {
  const dispatch = useDispatch()
  const { debug, boxShadow } = useDebug()

  const handleOpen = () => {
    dispatch(setModal({ type: "menu" }))
  }

  return (
    <Styles.Header>
      <Container debug={debug}>
        <Grid css={{ paddingTop: 32, color }}>
          <Box
            css={{
              gridColumn: "1 / span 9",
              boxShadow,

              svg: {
                height: 24,
              },

              a: {
                color: "inherit",
              },
            }}
          >
            <Link href="/">
              <LogoFull />
            </Link>
          </Box>
          <Box
            css={{
              alignItems: "center",
              justifyContent: "center",
              gridColumn: "12 / span 1",
              cursor: "pointer",
              boxShadow,
            }}
            onClick={handleOpen}
          >
            <Hamburger />
          </Box>
        </Grid>
      </Container>
    </Styles.Header>
  )
}
