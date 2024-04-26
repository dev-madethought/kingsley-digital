import { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"

import { EmailTemplate } from "@/components/email-template"

import { subscribeUser, userExists } from "./subscribe"

const resend = new Resend(process.env.RESEND_API_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, phone, email, subject, message, organisation, subscribe } =
      req.body
    const recipient = process.env.RESEND_EMAIL_RECIPIENT

    if (!name || !phone || !email || !subject || !message || !recipient) {
      return res.status(400).json({ message: "Bad request" })
    }

    if (subscribe) {
      const exists = await userExists(email)
      if (exists) {
      } else {
        await subscribeUser(email)
      }
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipient,
      subject: subject,
      react: EmailTemplate({
        name,
        phone,
        email,
        subject,
        message,
        organisation,
      }),
    })

    if (error) {
      return res.status(400).json({ error })
    }

    return res.status(200).json(data)
  }

  res.status(400).json({ message: "Bad request" })
}

export default handler
