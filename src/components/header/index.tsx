import { Box } from "../box"

import { Desktop } from "./desktop"
import { Mobile } from "./mobile"

export const Header = ({ color = "$typography" }: { color?: string }) => (
  <>
    <Box mobile>
      <Mobile color={color} />
    </Box>

    <Box tablet>
      <Desktop color={color} />
    </Box>
  </>
)
