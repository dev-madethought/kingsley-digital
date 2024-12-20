import { Text } from "./text"

export const components = {
  block: {
    normal: ({ children }: any) => {
      return <Text body>{children}</Text>
    },
  },
}
