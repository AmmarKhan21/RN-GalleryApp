import { configureStore } from '@reduxjs/toolkit';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../features/auth/store/authSlice';
import galleryReducer from '../features/gallery/store/gallerySlice';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const galleryPersistConfig = {
  key: 'gallery',
  storage: AsyncStorage,
  whitelist: ['likedImageIds'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedGalleryReducer = persistReducer(galleryPersistConfig, galleryReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    gallery: persistedGalleryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
