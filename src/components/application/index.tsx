import { ReactNode, useEffect } from "react"
import { Roboto } from "next/font/google"
import { useDispatch, useSelector } from "react-redux"

import { getInitialData } from "@/state/reducers/global"
import { RootState } from "@/state/store"

const inter = Roboto({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
})

export function Application({ children }: { children?: ReactNode }) {
  const dispatch = useDispatch()
  const ready = useSelector((state: RootState) => state.global.ready)

  useEffect(() => {
    if (!ready) {
      dispatch(getInitialData())
    }
  }, [dispatch, ready])

  return <main className={inter.className}>{children}</main>
}
