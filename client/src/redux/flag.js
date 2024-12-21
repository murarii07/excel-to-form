import { createSlice } from '@reduxjs/toolkit'

export const isLogin = createSlice({
  name: 'isLogin',
  initialState: {
    value: false
  },
  reducers: {
    changeIsLoginValue: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {  changeIsLoginValue } = isLogin.actions

export default isLogin.reducer