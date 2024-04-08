import type { NextApiRequest, NextApiResponse } from "next"

import { Node } from "@/types"

const nodes: Node[] = [
  {
    uid: 1,
    name: "Parent 1",
    nodes: [
      {
        uid: 2,
        name: "Child 1 of Parent 1",
      },
      {
        uid: 3,
        name: "Child 2 of Parent 1",
      },
    ],
  },
  {
    uid: 4,
    name: "Parent 2",
  },
  {
    uid: 5,
    name: "Parent 3",
    nodes: [
      {
        uid: 6,
        name: "Child 1 of Parent 3",
      },
      {
        uid: 7,
        name: "Child 2 of Parent 3",
      },
    ],
  },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Node[]>
) {
  res.status(200).json(nodes)
}
