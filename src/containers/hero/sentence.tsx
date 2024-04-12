import { Text } from "@/components/text"

export const Sentence = ({
  greeting,
  sentence,
}: {
  greeting: string
  sentence: string
}) => {
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

        "&:before": {
          content: greeting,
          fontSize: 18,
          padding: "0 $space$40",
          verticalAlign: "middle",
        },
      }}
    >
      {sentence}
    </Text>
  )
}
