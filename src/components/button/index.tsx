import React, { ReactNode, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { theme } from "@/styles/stitches"

import { Box } from "../box"

interface ButtonProps {
  type?: "primary" | "secondary" | "tertiary"
  children: ReactNode
  href?: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Layout = ({
  type,
  disabled,
  children,
}: {
  type: string
  disabled?: boolean
  children?: ReactNode
}) => {
  const [hover, setHover] = useState(false)
  const begin = "circle(4px at 20px 50%)"
  const end = "circle(100% at 50% 50%)"

  switch (type) {
    case "primary":
      return (
        <Box
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          css={{
            position: "relative",
            borderRadius: "100px",
            overflow: "hidden",
            padding: "16px 32px",
            cursor: "pointer",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: theme.colors.typography.value,
              zIndex: 0,
            }}
            initial={{ clipPath: begin }}
            animate={{
              clipPath: hover ? end : begin,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          <Box
            css={{
              color: hover ? "$white" : "$typography",
              zIndex: 2,
              fontFamily: "$favorit",
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: 400,
              letterSpacing: "0.28px",
              transition: "all 0.3s linear",
              textTransform: "uppercase",
            }}
          >
            {children}
          </Box>
        </Box>
      )
    case "secondary":
      return (
        <Box
          as="span"
          css={{
            display: "inline-flex",
            fontFamily: "$favorit",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 400,
            letterSpacing: "0.28px",
            color: "$typography",
            textDecoration: "underline",
            cursor: "pointer",
            alignItems: "center",
            gap: 8,

            "&:hover": {
              color: "$black",
            },
          }}
        >
          {children}
        </Box>
      )

    case "tertiary":
      return (
        <Box
          as="span"
          css={{
            display: "inline-flex",
            fontFamily: "$favorit",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 400,
            letterSpacing: "0.28px",
            color: "$typography",
            cursor: "pointer",
            alignItems: "center",
            gap: 8,

            ...(!disabled && {
              "&:hover": {
                color: "$black",
              },
            }),

            ...(disabled && {
              opacity: 0.5,
              pointerEvents: "none",
            }),
          }}
        >
          {children}
        </Box>
      )

    default:
      return (
        <Box
          as="span"
          css={{ display: "inline-block", border: "1px dashed red" }}
        >
          {children}
        </Box>
      )
  }
}

export const Button = ({
  type = "primary",
  children,
  className,
  onClick,
  href,
  disabled,
}: ButtonProps) => {
  if (href) {
    const rel = href.startsWith("/") ? "noreferrer noopener" : undefined
    return (
      <Link href={href} rel={rel} className={className}>
        <Layout type={type} disabled={disabled}>
          {children}
        </Layout>
      </Link>
    )
  }

  return (
    <Box
      as="button"
      onClick={onClick}
      className={className}
      css={{
        background: "none",
        border: "none",
      }}
    >
      <Layout type={type} disabled={disabled}>
        {children}
      </Layout>
    </Box>
  )
}
