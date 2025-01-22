import { styled } from "@/styles/stitches"

export const Label = styled("label", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  fontSize: 10,
  gap: 8,
  cursor: "pointer",

  span: {
    display: "inline-block",
    width: 17,
    height: 17,
    backgroundColor: "transparent",
    border: "1px solid $typography",
    transition: "background-color 0.3s",
  },

  // checkmark
  "& input:checked ~ span:after": {
    display: "block",
    content: '""',
    position: "absolute",
    left: 5,
    top: 3,
    width: 5,
    height: 9,
    border: "solid $typography",
    borderWidth: "0 1px 1px 0",
    transform: "rotate(45deg)",
  },
})

export const Input = styled("input", {
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  height: 0,
  width: 0,
})
