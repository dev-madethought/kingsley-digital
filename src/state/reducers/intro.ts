import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface IState {
  step: number
}

const initialState: IState = {
  step: 0,
}

const slice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    },
  },
})

export const { setStep } = slice.actions
export default slice.reducer
