import { keyframes, styled } from "@/styles/stitches"

const l2 = keyframes({
  to: {
    transform: "rotate(1turn)",
  },
})

export const Spinner = styled("div", {
  width: 16,
  aspectRatio: 1,
  borderRadius: 9999,
  border: "2px solid $darker",
  borderRightColor: "$typography",
  animation: `${l2} 1s infinite linear`,
})
