import { Button } from "@/components/button"
import { Text } from "@/components/text"

export const components = {
  block: {
    normal: ({ children }: any) => {
      return <Text cta>{children}</Text>
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      return (
        <Button type="secondary" href={value.href}>
          {children}
        </Button>
      )
    },
  },
}
