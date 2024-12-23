import * as React from "react"

import { EmailProps } from "@/types/email"

export const EmailTemplate = ({
  name,
  phone,
  email,
  subject,
  message,
  organisation,
  preferredContactMethod,
}: EmailProps) => (
  <div>
    <p>
      <strong>From:</strong>
    </p>
    <p>Name: {name}</p>
    {organisation && <p>Organisation: {organisation}</p>}
    <p>Phone Number: {phone}</p>
    <p>Email: {email}</p>
    <p>Preferred Contact Method: {preferredContactMethod}</p>
    <br />
    <p>
      <strong>{subject}</strong>
    </p>
    <p>{message}</p>
  </div>
)
