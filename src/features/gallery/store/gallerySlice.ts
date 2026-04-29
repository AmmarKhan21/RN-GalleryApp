import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GalleryImage, GalleryState } from '../../../types';

const initialState: GalleryState = {
  images: [],
  likedImageIds: [],
  currentPage: 1,
  hasNextPage: true,
  loadingState: 'idle',
  error: null,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setImages(state, action: PayloadAction<GalleryImage[]>) {
      state.images = action.payload;
    },
    appendImages(state, action: PayloadAction<GalleryImage[]>) {
      state.images.push(...action.payload);
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setHasNextPage(state, action: PayloadAction<boolean>) {
      state.hasNextPage = action.payload;
    },
    toggleLike(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.likedImageIds.indexOf(id);
      if (index === -1) {
        state.likedImageIds.push(id);
      } else {
        state.likedImageIds.splice(index, 1);
      }
    },
    setLoadingState(state, action: PayloadAction<GalleryState['loadingState']>) {
      state.loadingState = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setImages,
  appendImages,
  setCurrentPage,
  setHasNextPage,
  toggleLike,
  setLoadingState,
  setError,
} = gallerySlice.actions;

export default gallerySlice.reducer;
