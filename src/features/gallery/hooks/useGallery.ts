import { useCallback, useRef } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_IMAGES } from '../graphql/queries';
import { ImagePage } from '../../../types';
import useAppDispatch from '../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../shared/hooks/useAppSelector';
import apolloClient from '../../../graphql/apolloClient';
import {
  setImages,
  appendImages,
  setCurrentPage,
  setHasNextPage,
  setLoadingState,
  setError,
} from '../store/gallerySlice';

const PAGE_SIZE = 10;

// Apollo is used as transport only (no-cache); Redux owns all gallery state
const useGallery = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((s) => s.gallery.images);
  const currentPage = useAppSelector((s) => s.gallery.currentPage);
  const hasNextPage = useAppSelector((s) => s.gallery.hasNextPage);
  const loadingState = useAppSelector((s) => s.gallery.loadingState);
  const reduxError = useAppSelector((s) => s.gallery.error);

  const isLoadingMoreRef = useRef(false);

  const { loading: initialLoading, networkStatus } = useQuery<{
    images: ImagePage;
  }>(GET_IMAGES, {
    variables: { page: 1, limit: PAGE_SIZE },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      dispatch(setImages(data.images.images));
      dispatch(setCurrentPage(data.images.page));
      dispatch(setHasNextPage(data.images.hasNextPage));
      dispatch(setLoadingState('succeeded'));
      dispatch(setError(null));
    },
    onError: (err) => {
      dispatch(setError(err.message));
      dispatch(setLoadingState('failed'));
    },
  });

  const isRefreshing = networkStatus === 4;
  const isInitialLoading =
    initialLoading && loadingState !== 'succeeded' && !isRefreshing;

  const handleRefresh = useCallback(async () => {
    dispatch(setLoadingState('loading'));
    try {
      const { data } = await apolloClient.query<{ images: ImagePage }>({
        query: GET_IMAGES,
        variables: { page: 1, limit: PAGE_SIZE },
        fetchPolicy: 'no-cache',
      });
      dispatch(setImages(data.images.images));
      dispatch(setCurrentPage(1));
      dispatch(setHasNextPage(data.images.hasNextPage));
      dispatch(setLoadingState('succeeded'));
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(setError(err?.message ?? 'Refresh failed'));
      dispatch(setLoadingState('failed'));
    }
  }, [dispatch]);

  const handleLoadMore = useCallback(async () => {
    if (!hasNextPage || isLoadingMoreRef.current) return;
    isLoadingMoreRef.current = true;
    try {
      const nextPage = currentPage + 1;
      const { data } = await apolloClient.query<{ images: ImagePage }>({
        query: GET_IMAGES,
        variables: { page: nextPage, limit: PAGE_SIZE },
        fetchPolicy: 'no-cache',
      });
      dispatch(appendImages(data.images.images));
      dispatch(setCurrentPage(nextPage));
      dispatch(setHasNextPage(data.images.hasNextPage));
    } catch {
      // silent — existing content remains intact
    } finally {
      isLoadingMoreRef.current = false;
    }
  }, [hasNextPage, currentPage, dispatch]);

  return {
    images,
    isInitialLoading,
    isRefreshing,
    isLoadingMore: isLoadingMoreRef.current,
    hasNextPage,
    loadingState,
    error: reduxError,
    handleRefresh,
    handleLoadMore,
  };
};

export default useGallery;
