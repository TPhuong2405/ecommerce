import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'
import userReducer from './slides/userSlide'
import orderReducer from './slides/orderSlide'


export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer
  },
  devTools: process.env.NODE_ENV !== 'production'  // 🔥 bật Redux DevTools trong môi trường phát triển
})


