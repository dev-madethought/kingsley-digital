import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  TextareaHTMLAttributes,
  useState,
} from "react"

import styles from "./styles.module.css"

interface InputProps {
  name: string
  placeholder: string
  textarea?: boolean
  required?: boolean
  onChange?: (name: string, value: string) => void
}

type InputElementProps = InputHTMLAttributes<HTMLInputElement>
type TextareaElementProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Input = ({
  name,
  placeholder,
  textarea = false,
  required = false,
  onChange,
  ...props
}: InputProps & (InputElementProps | TextareaElementProps)) => {
  const [value, setValue] = useState<string>("")

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nextValue = event.target.value
    setValue(nextValue)
    onChange?.(name, nextValue)
  }

  return (
    <div className={styles.container}>
      {textarea ? (
        <textarea
          name={name}
          className={value ? styles.filled : styles.element}
          value={value}
          onChange={handleChange}
          rows={1}
          required={required}
          {...(props as TextareaElementProps)}
        />
      ) : (
        <input
          name={name}
          className={value ? styles.filled : styles.element}
          value={value}
          onChange={handleChange}
          required={required}
          {...(props as InputElementProps)}
        />
      )}
      <label className={styles.label}>
        {placeholder}
        {required ? "*" : ""}
      </label>
    </div>
  )
}
