import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postsService } from '../../services/postsService';

// Async thunks
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await postsService.getUserPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { posts } = getState();
      return !posts.isLoading;
    },
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ description, image }, { rejectWithValue }) => {
    try {
      const response = await postsService.createPost(description, image);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  isCreating: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        if (state.posts.length === 0) {
          state.isLoading = true;
        } else {
          state.isRefreshing = true;
        }
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isCreating = false;
        state.posts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
