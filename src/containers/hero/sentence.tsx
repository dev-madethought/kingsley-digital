import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"

export const Sentence = () => {
  const { border } = useDebug()

  return (
    <Text
      css={{
        position: "relative",
        color: "white",
        leadingTrim: "both",
        textEdge: "cap",
        fontFamily: "$favorit",
        fontSize: "100px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "90%",

        gridColumn: "span 12",
        border,

        "@tablet": {
          gridColumn: "span 16",
        },

        "&:before": {
          content: "안녕",
          fontSize: 18,
          padding: "0 40px",
          verticalAlign: "middle",
        },
      }}
    >
      We Invest in the World &rsquo;s Potential
    </Text>
  )
}
