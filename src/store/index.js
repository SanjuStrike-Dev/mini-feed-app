import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import postsSlice from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['posts/createPost'],
        ignoredPaths: ['posts.posts'],
      },
    }),
});

export default store;
