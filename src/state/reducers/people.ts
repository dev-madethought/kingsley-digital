import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { Person } from "@/types/sanity"

interface IState {
  person: Person | null
}

const initialState: IState = {
  person: null,
}

const slice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<Partial<Person>>) => {
      state.person = action.payload as Person
    },
  },
})

export const { setPerson } = slice.actions
export default slice.reducer
