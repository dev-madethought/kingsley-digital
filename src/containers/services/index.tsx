import { Box } from "@/components/box"
import { useDebug } from "@/components/grid"

export const Services = () => {
  const { boxShadow } = useDebug()

  return (
    <Box
      css={{
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        boxShadow,
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
