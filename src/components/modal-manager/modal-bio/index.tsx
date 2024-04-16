/* eslint-disable @next/next/no-img-element */
import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Dialog } from "@/components/dialog"
import { Grid, useDebug } from "@/components/grid"
import { Text } from "@/components/text"

type ModalBioProps = {
  open?: boolean
  data: {
    image: string
    name: string
    role: string
    email: string
    phone: string
    linkedin: string
  }
  onOpenChange?: (value: boolean) => void
}

export const ModalBio = ({ open, onOpenChange, data }: ModalBioProps) => {
  const { border } = useDebug()
  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) onOpenChange(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Container>
        <Grid css={{ position: "relative" }}>
          <Box
            css={{
              position: "absolute",
              gridColumn: "14 / span 11",
              width: "calc(100% + 40px)",
              height: "100vh",
              backgroundColor: "$background",
              zIndex: -1,
            }}
          />
          <Box css={{ gridColumn: "14 / span 4" }}>
            {data.image && <img src={data.image} alt={data.name} />}
          </Box>

          <Box
            css={{
              gridColumn: "15 / span 4",
              flexDirection: "column",
              border,
            }}
          >
            <Box>{data.name}</Box>
            <Box>{data.role}</Box>
          </Box>

          <Box
            css={{
              gridColumn: "19 / span 4",
              flexDirection: "column",
              opacity: 0.5,
              border,
            }}
          >
            <Box>{data.name}</Box>
            <Box>{data.role}</Box>
          </Box>

          <Box css={{ gridColumn: "15 / span 4", border }}>English text</Box>
          <Box css={{ gridColumn: "19 / span 4", border }}>Korean text</Box>

          <Box css={{ gridColumn: "15 / span 10", border }}>
            <Box
              css={{
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button type="secondary" href={`mailto:${data.email}`}>
                Email
              </Button>
              <Button type="tertiary" href={`tel:${data.phone}`}>
                {data.phone}
              </Button>
              <Button type="secondary" href={data.linkedin}>
                LinkedIN
              </Button>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Dialog>
  )
}
