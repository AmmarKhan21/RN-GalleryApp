import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ListRenderItem,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors, Spacing, BorderRadius } from '../../../../theme';
import { moderateScale, getNumColumns } from '../../../../utils/responsive';
import { GalleryImage, AppStackParamList } from '../../../../types';
import useAppSelector from '../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import useGallery from '../../hooks/useGallery';
import { toggleLike } from '../../store/gallerySlice';
import { clearAuth } from '../../../auth/store/authSlice';

import AppText from '../../../../shared/components/AppText';
import AppImageCard from '../../components/AppImageCard';
import AppLoader from '../../../../shared/components/AppLoader';
import AppErrorView from '../../../../shared/components/AppErrorView';
import { GalleryIcon } from '../../../../shared/assets/icons';

type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'Gallery'>;

const NUM_COLUMNS = getNumColumns();
const CARD_SPACING = Spacing.sm;
const HORIZONTAL_PADDING = Spacing.base;
const SCREEN_WIDTH = Dimensions.get('window').width;

const GalleryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const likedImageIds = useAppSelector((s) => s.gallery.likedImageIds);

  const {
    images, isInitialLoading, isRefreshing,
    hasNextPage, error, handleRefresh, handleLoadMore,
  } = useGallery();

  const handleImagePress = useCallback(
    (imageId: string) => navigation.navigate('ImageDetail', { imageId }),
    [navigation],
  );

  const handleLike = useCallback(
    (imageId: string) => dispatch(toggleLike(imageId)),
    [dispatch],
  );

  const user = useAppSelector((s) => s.auth.user);

  const handleLogout = useCallback(() => dispatch(clearAuth()), [dispatch]);

  const renderItem: ListRenderItem<GalleryImage> = useCallback(
    ({ item, index }) => {
      const isLastInRow = (index + 1) % NUM_COLUMNS === 0;
      return (
        <View style={[styles.cardWrapper, !isLastInRow && { marginRight: CARD_SPACING }]}>
          <AppImageCard
            image={item}
            isLiked={likedImageIds.includes(item.id)}
            onPress={() => handleImagePress(item.id)}
            onLike={() => handleLike(item.id)}
          />
        </View>
      );
    },
    [likedImageIds, handleImagePress, handleLike],
  );

  const keyExtractor = useCallback((item: GalleryImage) => item.id, []);

  if (isInitialLoading) return <AppLoader message="Fetching gallery..." />;

  if (error && images.length === 0) {
    return (
      <AppErrorView
        message={`Could not load images.\n\nMake sure the local server is running:\n  cd server && yarn start`}
        onRetry={handleRefresh}
      />
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} translucent={false} />

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={NUM_COLUMNS > 1 ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary, Colors.accent]}
            progressBackgroundColor={Colors.surface}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View style={styles.headerTop}>
              <View style={styles.headerLeft}>
                <View style={styles.headerTitleRow}>
                  <GalleryIcon size={moderateScale(26)} color={Colors.primary} />
                  <AppText variant="display" style={styles.headerTitle}>Gallery</AppText>
                </View>
                {user && (
                  <AppText variant="caption" style={styles.headerSubtitle}>
                    Welcome back,{' '}
                    <AppText variant="caption" color={Colors.primary}>
                      {user.name.split(' ')[0]}
                    </AppText>
                  </AppText>
                )}
              </View>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <AppText variant="caption" color={Colors.textMuted}>Sign out</AppText>
              </TouchableOpacity>
            </View>
            <AppText variant="caption" style={styles.imageCount}>{images.length} stunning images</AppText>
          </View>
        }
        ListFooterComponent={
          hasNextPage ? (
            <View style={styles.loadMoreFooter}>
              <ActivityIndicator size="small" color={Colors.primary} />
              <AppText variant="caption" color={Colors.textMuted}>Loading more...</AppText>
            </View>
          ) : images.length > 0 ? (
            <View style={styles.endOfListFooter}>
              <View style={styles.endDivider} />
              <AppText variant="caption" color={Colors.textMuted}>All {images.length} images loaded</AppText>
              <View style={styles.endDivider} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          !isInitialLoading ? (
            <View style={styles.emptyContainer}>
              <GalleryIcon size={moderateScale(56)} color={Colors.textMuted} />
              <AppText variant="h3" align="center">No images yet</AppText>
              <AppText variant="bodySmall" align="center" color={Colors.textMuted}>Pull down to refresh</AppText>
            </View>
          ) : null
        }
        initialNumToRender={10}
        maxToRenderPerBatch={6}
        windowSize={10}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  listContent: { paddingHorizontal: HORIZONTAL_PADDING, paddingBottom: Spacing.xxxl },
  columnWrapper: { justifyContent: 'flex-start' },
  cardWrapper: { flex: 1, maxWidth: `${100 / NUM_COLUMNS}%` },
  listHeader: { paddingTop: moderateScale(20), paddingBottom: moderateScale(16), gap: Spacing.xs },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { gap: Spacing.xs },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  headerTitle: { color: Colors.textPrimary },
  headerSubtitle: { color: Colors.textSecondary },
  imageCount: { color: Colors.textMuted, marginTop: Spacing.xs },
  logoutButton: {
    paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md, borderWidth: 1,
    borderColor: Colors.surfaceBorder, backgroundColor: Colors.surfaceElevated,
  },
  loadMoreFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm },
  endOfListFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.xl, paddingHorizontal: HORIZONTAL_PADDING, gap: Spacing.sm },
  endDivider: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.textMuted, opacity: 0.4 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: Spacing.giant, gap: Spacing.md, width: SCREEN_WIDTH - HORIZONTAL_PADDING * 2 },
});

export default GalleryScreen;
