import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getInitialData } from "@/state/reducers/global"
import { RootState } from "@/state/store"

import { Main, useDebug } from "../grid"
import { Header } from "../header"
import ModalManager from "../modal-manager"

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
      <Header />
      {children}
      <ModalManager />
    </Main>
  )
}
