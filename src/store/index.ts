// store/index.ts */
import { configureStore } from '@reduxjs/toolkit';
import voletReducer from './voletSlice';
import cartReducer from './cartSlice'; 

const store = configureStore({
  reducer: {
    volet: voletReducer,
    cart: cartReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
