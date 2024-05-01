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
      headingXL
      css={{
        position: "relative",
        color: "white",

        "&:before": {
          content: greeting,
          padding: "0 $space$40",
        },
      }}
    >
      {sentence}
    </Text>
  )
}
