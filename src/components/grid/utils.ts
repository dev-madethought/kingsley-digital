import { GRID, MEDIA } from "@/styles/stitches"

export const getBreakpoint = () => {
  if (window.innerWidth < MEDIA.tablet) {
    return GRID.mobile
  } else if (
    window.innerWidth > MEDIA.tablet &&
    window.innerWidth < MEDIA.desktop
  ) {
    return GRID.tablet
  } else {
    return GRID.desktop
  }
}

export const getSlice = () => {
  const breakpoint = getBreakpoint()
}

export const getWidth = (total: number) => {
  const breakpoint = getBreakpoint()

  // Calculate the width of the container
  const width = window.innerWidth - breakpoint.padding * 2

  // Calculate the total size of slices (gaps between items)
  const slices = (breakpoint.columns - 1) * breakpoint.gap

  // Calculate the available width for grid items
  const available = width - slices

  // Calculate the width of each grid item
  const itemWidth = available / breakpoint.columns

  // Calculate the total width of grid items between start and end spans
  const totalItemWidth = total * itemWidth

  // Calculate the total width of slices (gaps) between start and end spans
  const totalSliceWidth = (total - 1) * breakpoint.gap

  // Calculate the final width of the container
  const containerWidth = totalItemWidth + totalSliceWidth

  return Math.round(containerWidth)
}
