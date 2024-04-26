// import { NextApiRequest, NextApiResponse } from "next"
// import md5 from "md5"

// const MESSAGES = {
//   SUBSCRIBED: "You already subscribed",
//   PENDING: "Check your inbox",
//   ERROR: "Something went wrong",
//   SUCCESS: "Thanks for subscribing",
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { MAILCHIMP_LIST_ID, MAILCHIMP_API_KEY } = process.env
//   if (!MAILCHIMP_LIST_ID || !MAILCHIMP_API_KEY) {
//     return res.status(400).send("Missing API key")
//   }

//   const { email } = req.body

//   if (!email) {
//     return res.status(400).send("Email required")
//   }

//   const DATACENTER = MAILCHIMP_API_KEY.split("-")[1]

//   const normalisedEmail = email.toLowerCase()
//   const hash = md5(normalisedEmail)

//   // check if email is already subscribed
//   const verify = await fetch(
//     `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${hash}`,
//     {
//       headers: {
//         Authorization: `apikey ${MAILCHIMP_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       method: "GET",
//     }
//   ).then((r) => r.json())

//   if (verify.status === "subscribed") {
//     return res.status(200).send(MESSAGES.SUBSCRIBED)
//   }

//   if (verify.status === "pending") {
//     return res.status(200).send(MESSAGES.PENDING)
//   }

//   const data = {
//     email_address: normalisedEmail,
//     status: "pending",
//   }

//   const response = await fetch(
//     `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
//     {
//       body: JSON.stringify(data),
//       headers: {
//         Authorization: `apikey ${MAILCHIMP_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//     }
//   )

//   if (response.status >= 400) {
//     return res.status(400).send(MESSAGES.ERROR)
//   }

//   return res.status(200).send(MESSAGES.SUCCESS)
// }

import { NextApiRequest, NextApiResponse } from "next"
import md5 from "md5"

const MESSAGES = {
  SUBSCRIBED: "You already subscribed",
  PENDING: "Check your inbox",
  ERROR: "Something went wrong",
  SUCCESS: "Thanks for subscribing",
}

export const userExists = async (email: string) => {
  const { MAILCHIMP_LIST_ID, MAILCHIMP_API_KEY } = process.env
  if (!MAILCHIMP_LIST_ID || !MAILCHIMP_API_KEY) {
    throw new Error("Missing API key")
  }

  const DATACENTER = MAILCHIMP_API_KEY.split("-")[1]
  const normalisedEmail = email.toLowerCase()
  const hash = md5(normalisedEmail)

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

  return verify.status === "subscribed" || verify.status === "pending"
}

export const subscribeUser = async (email: string) => {
  const { MAILCHIMP_LIST_ID, MAILCHIMP_API_KEY } = process.env
  if (!MAILCHIMP_LIST_ID || !MAILCHIMP_API_KEY) {
    throw new Error("Missing API key")
  }

  const DATACENTER = MAILCHIMP_API_KEY.split("-")[1]
  const normalisedEmail = email.toLowerCase()

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
    throw new Error("Failed to subscribe")
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body

  if (!email) {
    return res.status(400).send("Email required")
  }

  try {
    const exists = await userExists(email)
    if (exists) {
      return res.status(200).send(MESSAGES.SUBSCRIBED)
    } else {
      await subscribeUser(email)
      return res.status(200).send(MESSAGES.SUCCESS)
    }
  } catch (error) {
    return res.status(400).send(MESSAGES.ERROR)
  }
}
