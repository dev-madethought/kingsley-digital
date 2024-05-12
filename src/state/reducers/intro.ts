import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { STEPS } from "@/types/intro"

interface IState {
  step: number
  firstTime: boolean
}

const initialState: IState = {
  step: STEPS.DONE, //  STEPS.LOADING,
  firstTime: false, //  true,
}

const slice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    },
    setFirstTime(state, action: PayloadAction<boolean>) {
      state.firstTime = action.payload
    },
  },
})

export const { setStep, setFirstTime } = slice.actions
export default slice.reducer
