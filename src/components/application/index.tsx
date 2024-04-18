import { ReactNode, useEffect } from "react"
// import { Roboto } from "next/font/google"
import { useDispatch, useSelector } from "react-redux"

import { getInitialData } from "@/state/reducers/global"
import { RootState } from "@/state/store"

import { Main, useDebug } from "../grid"
import ModalManager from "../modal-manager"

// const inter = Roboto({
//   weight: ["400", "700"],
//   display: "swap",
//   subsets: ["latin"],
// })
// className={inter.className}

export function Application({ children }: { children?: ReactNode }) {
  const dispatch = useDispatch()
  const ready = useSelector((state: RootState) => state.global.ready)
  const { debug } = useDebug()

  useEffect(() => {
    if (!ready) {
      dispatch(getInitialData())
    }
  }, [dispatch, ready])

  return (
    <Main debug={debug}>
      {children}
      <ModalManager />
    </Main>
  )
}
