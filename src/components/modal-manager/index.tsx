import { useDispatch, useSelector } from "react-redux"

import { setModal } from "@/state/reducers/modals"
import { RootState } from "@/state/store"

import { ModalContacts } from "./modal-contacts"
import { ModalMenu } from "./modal-menu"
import { ModalPerson } from "./modal-person"
import { ModalService } from "./modal-service"

const modals = [
  { key: "person", Component: ModalPerson },
  { key: "service", Component: ModalService },
  { key: "contacts", Component: ModalContacts },
  { key: "menu", Component: ModalMenu },
]

const ModalManager = () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modals.modal)

  const handleDialog = (type: string) => {
    dispatch(setModal({ type }))
  }

  return (
    <>
      {modals.map((m) => {
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
