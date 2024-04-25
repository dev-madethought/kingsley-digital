/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Button } from "@/components/button"
import { Dialog } from "@/components/dialog"
import { useDebug } from "@/components/grid"
import { Input } from "@/components/input"
import { Select } from "@/components/select"
import { Text } from "@/components/text"
import { RootState } from "@/state/store"

type ModalContactsProps = {
  open?: boolean
  onOpenChange?: (value: boolean) => void
}

export const ModalContacts = ({ open, onOpenChange }: ModalContactsProps) => {
  const { boxShadow } = useDebug()
  const person = useSelector((state: RootState) => state.people.person)

  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) onOpenChange(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log("event", event, data.get("subject"))
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
              width: "100%",
              gap: 10,
              borderBottom: "1px solid $typography",
            }}
          >
            <Box css={{ column: 1 }} />
            <Input name="name" placeholder="Full Name" required />
          </Box>

          <Box
            css={{
              width: "100%",
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
              />
            </Box>
            <Box css={{ column: 5 }}>
              <Input name="organisation" placeholder="Organisation" />
            </Box>
          </Box>

          <Box
            css={{
              width: "100%",
              gap: 10,
              borderBottom: "1px solid $typography",
            }}
          >
            <Box css={{ column: 1 }} />
            <Input name="email" placeholder="Email address" required />
          </Box>

          <Box
            css={{
              width: "100%",
              gap: 10,
              borderBottom: "1px solid $typography",
            }}
          >
            <Box css={{ column: 1 }} />
            <Select
              name="subject"
              placeholder="What would you like to discuss with us?"
              required
              options={[
                { value: "0", label: "Arranging a meeting with an expert" },
                { value: "1", label: "A bespoke asset portfolio health check" },
                { value: "2", label: "Customised asset management" },
                { value: "3", label: "Tax, inheritance, gift advice" },
                { value: "4", label: "Corporate consulting" },
                { value: "5", label: "General queries/Other" },
              ]}
            />
          </Box>
          <Box
            css={{
              width: "100%",
              gap: 10,
              borderBottom: "1px solid $typography",
            }}
          >
            <Box css={{ column: 1 }} />

            <Input
              name="message"
              placeholder="Your Message"
              required
              textarea
            />
          </Box>

          <Box css={{ width: "100%", gap: 10 }}>
            <Box css={{ column: 1 }} />
            {/* TODO MISSING CHECKBOX COMPONENT */}
          </Box>

          <Box css={{ width: "100%", gap: 10 }}>
            <Box css={{ column: 1 }} />
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
