import { ChangeEvent, SelectHTMLAttributes, useState } from "react"

import styles from "./styles.module.css"

type SelectElementProps = SelectHTMLAttributes<HTMLSelectElement>

type SelectOptionsProps = {
  value: string
  label: string
}

type SelectProps = {
  name: string
  placeholder: string
  required?: boolean
  disabled?: boolean
  options?: SelectOptionsProps[]
  onChange?: (name: string, value: string) => void
}

export const Select = ({
  name,
  options,
  placeholder,
  required,
  onChange,
  ...props
}: SelectProps) => {
  const [value, setValue] = useState("")

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.target.value
    setValue(nextValue)
    onChange?.(name, nextValue)
  }

  return (
    <div className={styles.container}>
      <select
        name={name}
        value={value}
        className={value !== "" ? styles.filled : styles.element}
        onChange={handleChange}
        required={required}
        disabled={props.disabled}
        {...(props as SelectElementProps)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option: SelectOptionsProps) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label className={styles.label}>
        {placeholder}
        {required ? "*" : ""}
      </label>
    </div>
  )
}
