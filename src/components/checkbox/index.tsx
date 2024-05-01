import { InputHTMLAttributes } from "react"

import { Text } from "../text"

import * as Styles from "./styles"

type CheckboxProps = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export const Checkbox = ({ label, ...props }: CheckboxProps) => (
  <Styles.Label>
    <Styles.Input type="checkbox" {...props} />
    <span />
    <Text caption>{label}</Text>
  </Styles.Label>
)
