import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { STEPS } from "@/types/intro"

/*
README:
This reducer handles the state that manages the intro animation. The intro requires orchestration between different
component, so having a central place to manage its different steps is important.

export const STEPS = {
  LOADING: 0,
  SPLIT: 1,
  UNMASK: 2,
  DONE: 3,
}

STEPS.LOADING
The page is loading the data. it should show the logo. There is a background covering the whole screen.

STEPS.SPLIT
The logo splits from the center to the sides. The background should cover the component that just render.

STEPS.UNMASK
The logo animates to the header position. The background on the Loading component should be removed, and the mask
should be applied to all the components rendered. Once the mask animation is complete we move to STEPS.DONE

STEPS.DONE
The animation is complete, hide the <LoadingAnimation /> and only render the children on the <AnimateRectMask /> component
*/
interface IState {
  step: number
  firstTime: boolean
}

const initialState: IState = {
  step: STEPS.LOADING,
  firstTime: true,
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
