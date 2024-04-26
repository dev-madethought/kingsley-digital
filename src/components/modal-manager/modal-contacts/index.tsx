/* eslint-disable @next/next/no-img-element */
import { useState } from "react"

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

type ModalContactsProps = {
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const ModalContacts = ({ open, onOpenChange }: ModalContactsProps) => {
  const { boxShadow } = useDebug()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) onOpenChange(value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Box
        css={{
          height: "var(--vh)",
          overflowY: "auto",
          marginRight: 20,
          flexDirection: "column",
          column: 11,

          "@tablet": {
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
        <Box css={{ gap: 10, marginTop: 80, marginBottom: 27 }}>
          <Box css={{ column: 1 }} />

          <Box
            css={{
              column: 4,
              boxShadow,
            }}
          >
            <Text headingS>Contact Us</Text>
          </Box>
        </Box>

        <Box css={{ gap: 10, marginTop: 40, marginBottom: 27 }}>
          <Box css={{ column: 1 }} />

          <Box
            css={{
              column: 4,
              boxShadow,
            }}
          >
            <Text body>Please tell us a little more about yourself</Text>
          </Box>
          <Box css={{ column: 1 }} />

          <Box
            css={{
              column: 4,
              boxShadow,
              opacity: 0.5,
            }}
          >
            <Text body>Please tell us a little more about yourself KO</Text>
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
                placeholder="Full Name"
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
                  placeholder="Phone Number"
                  type="tel"
                  required
                  disabled={sending}
                />
              </Box>
              <Box css={{ column: 5 }}>
                <Input
                  name="organisation"
                  placeholder="Organisation"
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
                placeholder="Email address"
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
                placeholder="What would you like to discuss with us?"
                required
                disabled={sending}
                options={[
                  { value: "0", label: "Arranging a meeting with an expert" },
                  {
                    value: "1",
                    label: "A bespoke asset portfolio health check",
                  },
                  { value: "2", label: "Customised asset management" },
                  { value: "3", label: "Tax, inheritance, gift advice" },
                  { value: "4", label: "Corporate consulting" },
                  { value: "5", label: "General queries/Other" },
                ]}
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
                placeholder="Your Message"
                disabled={sending}
                required
                textarea
              />
            </Box>

            <Box css={{ gap: 10 }}>
              <Box css={{ column: 1 }} />
              <Checkbox
                name="subscribe"
                label="Please check this box to be added to our mailing list"
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
                Submit
              </Button>
            </Box>
          </Box>
        ) : (
          <Box css={{ gap: 10 }}>
            <Box css={{ column: 1 }} />
            <Text>Email sent</Text>
          </Box>
        )}
      </Box>
    </Dialog>
  )
}

/*
Missing:

Add some labels to the settings,
add some of this to the translations.

Mobile layouts
*/
