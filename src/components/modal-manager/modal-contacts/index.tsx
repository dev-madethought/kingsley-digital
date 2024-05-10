/* eslint-disable @next/next/no-img-element */
import { FormEvent, useState } from "react"
import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Checkbox } from "@/components/checkbox"
import { Dialog } from "@/components/dialog"
import { useDebug } from "@/components/grid"
import { Input } from "@/components/input"
import { Select } from "@/components/select"
import { Spinner } from "@/components/spinner"
import { Text } from "@/components/text"
import { sendContactForm } from "@/lib/api"
import { RootState } from "@/state/store"

import {
  getEmail,
  getMessage,
  getName,
  getOrganisation,
  getPhone,
  getPrimaryDescription,
  getSecondaryDescription,
  getSubject,
  getSubjectsArray,
  getSubmitButton,
  getSubscribe,
  getSuccessMessage,
  getTitle,
} from "./translations"

type ModalContactsProps = {
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const ModalContacts = ({ open, onOpenChange }: ModalContactsProps) => {
  const { boxShadow } = useDebug()
  const settings = useSelector((state: RootState) => state.global.settings)
  const language = useSelector((state: RootState) => state.global.language)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) onOpenChange(value)

    if (!value) {
      // reset on modal close
      setSending(false)
      setSent(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(true)

    const data = new FormData(event.currentTarget)
    const name = data.get("name")
    const phone = data.get("phone")
    const organisation = data.get("organisation")
    const email = data.get("email")
    const subject = data.get("subject")
    const message = data.get("message")
    const subscribe = data.get("subscribe") === "on"

    // send email
    const result = await sendContactForm({
      name,
      phone,
      organisation,
      email,
      subject,
      message,
      subscribe,
    })

    const d = await result.json()

    setSent(true)
    setSending(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} color="$darker">
      <Box
        css={{
          height: "var(--vh)",
          overflowY: "auto",
          marginRight: 20,
          flexDirection: "column",
          column: 12,

          "@tablet": {
            column: 11,
            marginRight: 40,
          },

          "&::-webkit-scrollbar": {
            height: 5,
            width: 5,
            background: "$darker",
            borderRadius: "1ex",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "$typography",
            borderRadius: "1ex",
          },
        }}
      >
        <Box
          css={{
            gap: 10,
            marginTop: 56,
            marginBottom: 32,

            "@tablet": {
              marginTop: 80,
              marginBottom: 27,
            },
          }}
        >
          <Box css={{ column: 1 }} />

          <Box
            css={{
              column: 10,
              boxShadow,

              "@tablet": {
                column: 4,
              },
            }}
          >
            <Text headingS>{getTitle(language, settings?.contacts)}</Text>
          </Box>
        </Box>

        <Box
          css={{
            gap: 10,
            marginTop: 40,
            marginBottom: 32,

            "@tablet": {
              marginBottom: 27,
            },
          }}
        >
          <Box css={{ column: 1 }} />

          <Box
            css={{
              column: 10,
              boxShadow,
              "@tablet": {
                column: 4,
              },
            }}
          >
            <Text body>
              {getPrimaryDescription(language, settings?.contacts)}
            </Text>
          </Box>
          <Box css={{ column: 1 }} />

          <Box
            tablet
            css={{
              column: 4,
              boxShadow,
              opacity: 0.5,
            }}
          >
            <Text body>
              {getSecondaryDescription(language, settings?.contacts)}
            </Text>
          </Box>
        </Box>

        {/* FORM */}
        {!sent ? (
          <Box
            as="form"
            css={{
              flexDirection: "column",
              gap: 16,
              color: "$typography",
              boxShadow,
            }}
            onSubmit={handleSubmit}
          >
            <Box
              css={{
                gap: 10,
                borderBottom: "1px solid $typography",
              }}
            >
              <Box css={{ column: 1 }} />
              <Input
                name="name"
                placeholder={getName(language, settings?.contacts)}
                required
                disabled={sending}
              />
            </Box>

            <Box
              css={{
                gap: 10,
                borderBottom: "1px solid $typography",
              }}
            >
              <Box css={{ column: 1 }} />
              <Box css={{ column: 5 }}>
                <Input
                  name="phone"
                  placeholder={getPhone(language, settings?.contacts)}
                  type="tel"
                  required
                  disabled={sending}
                />
              </Box>
              <Box css={{ column: 5 }}>
                <Input
                  name="organisation"
                  placeholder={getOrganisation(language, settings?.contacts)}
                  disabled={sending}
                />
              </Box>
            </Box>

            <Box
              css={{
                gap: 10,
                borderBottom: "1px solid $typography",
              }}
            >
              <Box css={{ column: 1 }} />
              <Input
                name="email"
                placeholder={getEmail(language, settings?.contacts)}
                required
                disabled={sending}
              />
            </Box>

            <Box
              css={{
                gap: 10,
                borderBottom: "1px solid $typography",
              }}
            >
              <Box css={{ column: 1 }} />
              <Select
                name="subject"
                placeholder={getSubject(language, settings?.contacts)}
                required
                disabled={sending}
                options={getSubjectsArray(language, settings?.contacts)}
              />
            </Box>
            <Box
              css={{
                gap: 10,
                borderBottom: "1px solid $typography",
              }}
            >
              <Box css={{ column: 1 }} />

              <Input
                name="message"
                placeholder={getMessage(language, settings?.contacts)}
                disabled={sending}
                required
                textarea
              />
            </Box>

            <Box css={{ gap: 10 }}>
              <Box css={{ column: 1 }} />
              <Checkbox
                name="subscribe"
                label={getSubscribe(language, settings?.contacts)}
                disabled={sending}
              />
            </Box>

            <Box css={{ gap: 10 }}>
              <Box css={{ column: 1 }} />
              <Button type="submit" disabled={sending}>
                {sending && (
                  <Box css={{ marginRight: 16 }}>
                    <Spinner />
                  </Box>
                )}
                {getSubmitButton(language, settings?.buttons)}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box css={{ gap: 10 }}>
            <Box css={{ column: 1 }} />
            <Box css={{ column: 9, boxShadow }}>
              <Text>{getSuccessMessage(language, settings?.contacts)}</Text>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  )
}
