import { ChangeEvent, FormEvent, useRef, useState } from "react"

import { Box } from "@/components/box"
import { Text } from "@/components/text"

import { ArrowRight } from "./icon"

export const Newsletter = ({
  title,
  placeholder,
  agreement,
}: {
  title: string
  placeholder: string
  agreement: string
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSubmit, setShowSubmit] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value
    setShowSubmit(email.trim() !== "")
    setInvalidEmail(false)
    setIsTyping(true)
  }

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const isValid = validateEmail(email)
    setInvalidEmail(!isValid)
    setIsTyping(false)
    if (isValid) {
      asyncRequest(email)
    }
  }

  const asyncRequest = async (email: string) => {
    const request = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const message = await request.text()

    if (inputRef.current) {
      inputRef.current.value = message
      setShowSubmit(false)
    }
  }

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmitForm}
      noValidate
      css={{
        flexDirection: "column",
        "@tablet": {
          maxWidth: 333,
        },
      }}
    >
      <Text headingS>{title}</Text>
      <Box css={{ position: "relative" }}>
        <Box
          ref={inputRef}
          as="input"
          type="email"
          name="email"
          placeholder={placeholder}
          onChange={handleInputChange}
          css={{
            background: "transparent",
            border: "none",
            borderRadius: 0,
            outline: "none",
            borderBottom: `1px solid ${
              invalidEmail && !isTyping ? "$colors$red" : "$colors$typography"
            }`,
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 400,
            letterSpacing: "0.02em",
            padding: "16px 0",
            color:
              invalidEmail && !isTyping ? "$colors$red" : "$colors$typography",
            width: "100%",

            "&::placeholder": {
              color: "$colors$darker",
            },
          }}
        />
        {showSubmit && (
          <Box
            as="button"
            type="submit"
            css={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              border: "none",
              color:
                invalidEmail && !isTyping
                  ? "$colors$red"
                  : "$colors$typography",
            }}
          >
            <ArrowRight />
          </Box>
        )}
      </Box>

      <Text caption css={{ marginTop: 15, fontStyle: "italic" }}>
        {agreement}
      </Text>
    </Box>
  )
}
