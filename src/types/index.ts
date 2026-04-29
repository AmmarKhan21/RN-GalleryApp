export interface GalleryImage {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  likes: number;
}

export interface ImagePage {
  images: GalleryImage[];
  totalCount: number;
  hasNextPage: boolean;
  page: number;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisteredUser {
  name: string;
  email: string;
  phone: string;
}

export type AuthStackParamList = {
  Register: undefined;
};

export type AppStackParamList = {
  Gallery: undefined;
  ImageDetail: { imageId: string };
};

/** @deprecated Use AuthStackParamList or AppStackParamList directly. */
export type RootStackParamList = AuthStackParamList & AppStackParamList;

export interface GalleryState {
  images: GalleryImage[];
  likedImageIds: string[];
  currentPage: number;
  hasNextPage: boolean;
  loadingState: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface AuthState {
  user: RegisteredUser | null;
  isRegistered: boolean;
}

export type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type AppTextVariant =
  | 'hero'
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';
