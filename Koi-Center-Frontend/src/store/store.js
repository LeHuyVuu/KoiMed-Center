import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // Sử dụng sessionStorage
import userReducer from './userSlice';
import bookingReducer from './bookingSlice';
import { combineReducers } from 'redux';

// Combine tất cả các reducer lại
const rootReducer = combineReducers({
  user: userReducer,
  booking: bookingReducer,
});

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage: sessionStorage, // Sử dụng sessionStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Kết hợp persist với rootReducer

const store = configureStore({
  reducer: persistedReducer, // Sử dụng persistedReducer đã kết hợp
});

export const persistor = persistStore(store); // Khởi tạo persistor

export default store;
