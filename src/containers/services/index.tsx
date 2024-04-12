import { Box } from "@/components/box"
import { useDebug } from "@/components/grid"

export const Services = () => {
  const { border } = useDebug()

  return (
    <Box
      css={{
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        border,
        padding: "$20",
        "@tablet": {
          padding: "$40",
        },
      }}
    >
      Services
    </Box>
  )
}
