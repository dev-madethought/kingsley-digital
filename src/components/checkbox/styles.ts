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
    // boxShadow: "inset 0px 0px 0px 1px $typography",
    border: "1px solid $typography",
    transition: "background-color 0.3s",
  },

  // checkmark
  // "& input:checked ~ span:after": {
  //   display: "block",
  //   content: '""',
  //   position: "absolute",
  //   left: 5,
  //   top: 1,
  //   width: 4,
  //   height: 8,
  //   border: "solid $typography",
  //   borderWidth: "0 3px 3px 0",
  //   transform: "rotate(45deg)",
  // },

  // cross
  "& input:checked ~ span:before, & input:checked ~ span:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 8,
    height: 17,
    width: 1,
    backgroundColor: "$typography",
  },
  "& input:checked ~ span:before": { transform: "rotate(45deg)" },
  "& input:checked ~ span:after": { transform: "rotate(-45deg)" },
})

export const Input = styled("input", {
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  height: 0,
  width: 0,
})
