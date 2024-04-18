export const getWidth = (total: number) => {
  if (typeof document === "undefined") return

  const main = document.querySelector("main")
  if (!main) {
    console.warn("no <main> element found")
    return 0
  } else {
    const styles = getComputedStyle(main)

    const span = styles.getPropertyValue("--span")
    const gutter = `calc($space$10 * (${total} - 1))`

    return `calc(${span} * ${total} + ${gutter})`
  }
}
