import { AnimateRectMask } from "@/components/animate-rect-mask"
import { Box } from "@/components/box"
import { Contacts } from "@/containers/contacts"
import { Footer } from "@/containers/footer"
import { Hero } from "@/containers/hero"
import { People } from "@/containers/people"
import { Philosophy } from "@/containers/philosophy"
import { Services } from "@/containers/services"

export default function Page() {
  return (
    <Box
      css={{
        flexDirection: "column",
      }}
    >
      {true && <Hero />}
      {true && <Philosophy />}
      {false && <People />}
      {false && <Services />}
      {false && <Contacts />}
      {true && <Footer />}
    </Box>
  )
}
