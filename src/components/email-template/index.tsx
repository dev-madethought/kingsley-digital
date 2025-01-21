import * as React from "react"

import { EmailProps } from "@/types/email"

export const EmailTemplate = ({
  name,
  phone,
  email,
  subject,
  message,
  organisation,
  contactPhone,
  contactEmail,
}: EmailProps) => {
  const contactMethods = [contactEmail && "Email", contactPhone && "Phone"]
    .filter(Boolean)
    .join(", ")

  return (
    <div>
      <p>
        <strong>Name:</strong> {name}
      </p>
      {organisation && (
        <p>
          <strong>Organisation:</strong> {organisation}
        </p>
      )}
      <p>
        <strong>Phone Number:</strong> {phone}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <br />
      <br />
      <p>
        <strong>Subject:</strong> {subject}
      </p>
      <p>
        <strong>Message:</strong> {message}
      </p>
      <br />
      <p>
        <strong>Contact via: </strong>
        {contactMethods}
      </p>
    </div>
  )
}
