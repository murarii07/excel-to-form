import { createSlice } from '@reduxjs/toolkit'

export const Field = createSlice({
  name: 'Field',
  initialState: {
    value: []
  },
  reducers: {
    changeFieldValue: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeFieldValue } = Field.actions

export default Field.reducer