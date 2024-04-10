import { Text } from "@/components/text"
import useDebug from "@/hooks/useDebug"

export const Sentence = ({
  greeting,
  sentence,
}: {
  greeting: string
  sentence: string
}) => {
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
          content: greeting,
          fontSize: 18,
          padding: "0 40px",
          verticalAlign: "middle",
        },
      }}
    >
      {sentence}
    </Text>
  )
}
