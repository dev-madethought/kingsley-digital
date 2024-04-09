import type { NextApiRequest, NextApiResponse } from "next"

import { Korean } from "@/types"

const english = `english`
const korean = `korean`

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { language } = req.query

  if (language === Korean) {
    res.status(200).json({ text: korean })
  }

  res.status(200).json({ text: english })
}
