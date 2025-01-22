import { Box } from "../box"

import { Desktop } from "./desktop"
import { Mobile } from "./mobile"

export const Header = ({
  color = "$typography",
  background = false,
}: {
  color?: string
  background?: boolean
}) => (
  <>
    <Box mobile>
      <Mobile color={color} />
    </Box>

    <Box tablet>
      <Desktop color={color} background={background} />
    </Box>
  </>
)
