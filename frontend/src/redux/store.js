import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'
import userReducer from './slides/userSlide'


export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'  // 🔥 bật Redux DevTools trong môi trường phát triển
})


