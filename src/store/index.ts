import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import voletReducer from './voletSlice';
import cartReducer from './cartSlice';

// Combine your reducers
const rootReducer = combineReducers({
  volet: voletReducer,
  cart: cartReducer,
});

// Create a persist configuration
const persistConfig = {
  key: 'root',   // Key for the persisted data in localStorage
  storage,       // Use localStorage to store the persisted data
  // You can add the whitelist or blacklist options here if needed:
  // whitelist: ['volet', 'cart'],  // Only persist specific reducers
  // blacklist: ['someReducer'],    // Do not persist specific reducers
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializability check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // If there are specific state paths with non-serializable values, ignore them:
        // ignoredPaths: ['some.nested.path'],
      },
    }),
});

// Create the persistor for the store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
