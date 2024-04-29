import { Box } from "../box"
import { Button } from "../button"
import { Container } from "../container"
import { Grid, useDebug } from "../grid"
import { LogoMark, LogoWords } from "../icons"

import * as Styles from "./styles"

export const Header = () => {
  const { debug, boxShadow } = useDebug()

  const smoothScrollTo = (e) => {
    e.preventDefault()
    const element = document.getElementById("search")
    element.scrollIntoView({
      block: "start",
      behavior: "smooth", // smooth scroll
    })
  }
  return (
    <Styles.Header>
      <Container debug={debug} css={{ color: "white" }}>
        <Grid css={{ paddingTop: 40 }}>
          <Box
            css={{
              gridColumn: "1 / span 2",
              boxShadow,
              // svg: {
              //   preserveAspectRatio: "none",
              //   width: "100%",
              //   height: "auto",
              // },
            }}
          >
            <LogoWords />
          </Box>

          <Box
            css={{
              gridColumn: "4 / span 19",
              boxShadow,
            }}
          >
            <Button variant="tertiary">Here</Button>
          </Box>

          <Box
            css={{
              gridColumn: "23 / span 2",
              boxShadow,
              justifyContent: "flex-end",
            }}
          >
            <LogoMark />
          </Box>
        </Grid>
      </Container>
    </Styles.Header>
  )
}
