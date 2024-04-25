import { Button } from "@/components/button"
import { Text } from "@/components/text"

export const components = {
  block: {
    normal: ({ children }: any) => {
      return (
        <Text cta css={{ textTransform: "uppercase" }}>
          {children}
        </Text>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      return (
        <Button variant="secondary" href={value.href}>
          {children}
        </Button>
      )
    },
  },
}
