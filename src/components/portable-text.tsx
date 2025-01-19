import { Text } from "./text"

export const components = {
  block: {
    normal: ({ children }: any) => {
      return <Text cta>{children}</Text>
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const { href, target } = value
      return (
        <a
          href={href}
          target={target || "_blank"}
          rel={!target ? "noopener noreferrer" : undefined}
          style={{
            color: "inherit",
            textDecoration: "underline",
          }}
        >
          {children}
        </a>
      )
    },
  },
}
