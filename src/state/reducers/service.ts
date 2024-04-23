import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { Service } from "@/types/sanity"

interface IState {
  service: Service | null
}

const initialState: IState = {
  service: null,
}

const slice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<Partial<Service>>) => {
      state.service = action.payload as Service
    },
  },
})

export const { setService } = slice.actions
export default slice.reducer
