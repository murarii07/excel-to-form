import { configureStore } from '@reduxjs/toolkit'
import freduce from './formElement'
import  logreducer  from './flag';
export const store = configureStore({
  reducer: {
    Field:freduce,
    isLogin:logreducer
  }
})
export default store;