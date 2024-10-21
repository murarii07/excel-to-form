import { configureStore } from '@reduxjs/toolkit'
import freduce from './formElement'
export const store = configureStore({
  reducer: {
    Field:freduce
  }
})
export default store;