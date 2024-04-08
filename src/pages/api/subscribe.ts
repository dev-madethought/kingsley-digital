import { NextRequest, NextResponse } from "next/server"
import md5 from "md5"

// README: https://mailchimp.com/developer/guides/manage-subscribers-with-the-mailchimp-api/

const MESSAGES = {
  SUBSCRIBED: "You already subscribed",
  PENDING: "Check your inbox",
  ERROR: "Something went wrong",
  SUCCESS: "Thanks for subscribing",
}
export async function POST(request: NextRequest) {
  const { MAILCHIMP_LIST_ID, MAILCHIMP_API_KEY } = process.env
  if (!MAILCHIMP_LIST_ID || !MAILCHIMP_API_KEY) {
    return new NextResponse("Missing API key", { status: 400 })
  }

  const { email } = await request.json()

  if (!email) {
    return new NextResponse("Email required", { status: 400 })
  }

  const DATACENTER = MAILCHIMP_API_KEY.split("-")[1]

  const normalisedEmail = email.toLowerCase()
  const hash = md5(normalisedEmail)

  // check if email is already subscribed
  const verify = await fetch(
    `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${hash}`,
    {
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  ).then((r) => r.json())

  if (verify.status === "subscribed") {
    return new NextResponse(MESSAGES.SUBSCRIBED, { status: 200 })
  }

  if (verify.status === "pending") {
    return new NextResponse(MESSAGES.PENDING, { status: 200 })
  }

  const data = {
    email_address: normalisedEmail,
    status: "pending",
  }

  const response = await fetch(
    `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
    {
      body: JSON.stringify(data),
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  )

  if (response.status >= 400) {
    return new NextResponse(MESSAGES.ERROR, { status: 400 })
  }

  return new NextResponse(MESSAGES.SUCCESS, { status: 200 })
}
