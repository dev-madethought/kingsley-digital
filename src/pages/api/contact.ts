import { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"

import { EmailTemplate } from "@/components/email-template"

import { subscribeUser, userExists } from "./subscribe"

const resend = new Resend(process.env.RESEND_API_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      name,
      phone,
      organisation,
      email,
      subject,
      message,
      subscribe,
      contactPhone,
      contactEmail,
    } = req.body
    const recipient = process.env.RESEND_EMAIL_RECIPIENT

    if (!name || !phone || !email || !subject || !message || !recipient) {
      return res.status(400).json({ message: "Bad request" })
    }

    try {
      if (subscribe) {
        const exists = await userExists(email)
        if (exists) {
          // already exists, bypass
        } else {
          await subscribeUser(email)
        }
      }
    } catch (error) {
      console.log("failed to subscribe", error)
    }

    // TODO: change this email to the client's email
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
        contactPhone,
        contactEmail,
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
