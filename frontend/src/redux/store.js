import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './slides/productSlide';
import userReducer from './slides/userSlide';
import orderReducer from './slides/orderSlide';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'order'], // Chỉ lưu user và order (có thể thêm 'product' nếu cần)
  version: 1, // Phiên bản của cấu hình persist
  blacklist: ['producut', 'user'], // Không sử dụng blacklist trong trường hợp này
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Sửa lại từ persistReducer -> persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export let persistor = persistStore(store); // Xuất persistor để sử dụng với PersistGate