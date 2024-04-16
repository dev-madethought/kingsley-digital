import { useDispatch, useSelector } from "react-redux"

import { setModal } from "@/state/reducers/modals"
import { RootState } from "@/state/store"

import { ModalBio } from "./modal-bio"

const modals = [{ key: "bio", Component: ModalBio }]

const ModalManager = () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modals.modal)

  const handleDialog = (type: string) => {
    dispatch(setModal({ type }))
  }

  return (
    <>
      {modals.map((m) => {
        if (modal.type === "none") {
          return null
        }

        return (
          <m.Component
            key={m.key}
            open={modal.type === m.key}
            onOpenChange={(value: boolean) =>
              handleDialog(value ? m.key : "none")
            }
            {...modal}
          />
        )
      })}
    </>
  )
}

export default ModalManager
