import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface IModal {
  type: string
  data?: any
}

interface IState {
  modal: IModal
}

const initialState: IState = {
  modal: { type: "none" },
}

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<IModal>) => {
      state.modal = action.payload
    },
  },
})

export const { setModal } = slice.actions
export default slice.reducer
