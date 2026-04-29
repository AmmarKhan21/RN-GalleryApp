import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { useQuery } from '@apollo/client/react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors, Spacing, BorderRadius } from '../../../../theme';
import { moderateScale, hp } from '../../../../utils/responsive';
import { GET_IMAGE } from '../../graphql/queries';
import { GalleryImage, AppStackParamList } from '../../../../types';
import useAppSelector from '../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import { toggleLike } from '../../store/gallerySlice';
import { ArrowLeftIcon, HeartFilledIcon, HeartOutlineIcon } from '../../../../shared/assets/icons';

import AppText from '../../../../shared/components/AppText';
import AppLoader from '../../../../shared/components/AppLoader';
import AppErrorView from '../../../../shared/components/AppErrorView';
import AppCard from '../../../../shared/components/AppCard';
import AppHeartAnimation from '../../../../shared/components/AppHeartAnimation';
import AppImage from '../../../../shared/components/AppImage';

type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'ImageDetail'>;
type RoutePropType = RouteProp<AppStackParamList, 'ImageDetail'>;

const IMAGE_HEIGHT = hp(45);

const HERO_GRADIENT_LAYERS = [
  { top: '62%', bg: 'rgba(0,0,0,0.06)' },
  { top: '70%', bg: 'rgba(0,0,0,0.10)' },
  { top: '77%', bg: 'rgba(0,0,0,0.14)' },
  { top: '83%', bg: 'rgba(0,0,0,0.18)' },
  { top: '88%', bg: 'rgba(0,0,0,0.20)' },
  { top: '93%', bg: 'rgba(0,0,0,0.20)' },
] as const;

const ImageDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RoutePropType>();
  const dispatch = useAppDispatch();
  const likedImageIds = useAppSelector((s) => s.gallery.likedImageIds);
  const isLiked = likedImageIds.includes(params.imageId);

  const [heartAnimKey, setHeartAnimKey] = useState(0);

  const imageScale = useSharedValue(0.72);
  const contentTranslateY = useSharedValue(40);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    imageScale.value = withSpring(1, { damping: 18, stiffness: 140, overshootClamping: false });
    contentTranslateY.value = withDelay(150, withSpring(0, { damping: 20, stiffness: 180 }));
    contentOpacity.value = withDelay(150, withTiming(1, { duration: 350 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageAnimStyle = useAnimatedStyle(() => ({ transform: [{ scale: imageScale.value }] }));
  const contentAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
    opacity: contentOpacity.value,
  }));

  const likeButtonScale = useSharedValue(1);
  const likeButtonStyle = useAnimatedStyle(() => ({ transform: [{ scale: likeButtonScale.value }] }));

  const triggerLikeBounce = useCallback(() => {
    likeButtonScale.value = withSequence(
      withTiming(1.38, { duration: 110 }),
      withSpring(1.0, { damping: 18, stiffness: 260 }),
    );
  }, [likeButtonScale]);

  const handleLike = useCallback(() => {
    triggerLikeBounce();
    if (!isLiked) setHeartAnimKey((k) => k + 1);
    dispatch(toggleLike(params.imageId));
  }, [isLiked, dispatch, params.imageId, triggerLikeBounce]);

  const lastImageTapRef = useRef(0);
  const handleImageTap = useCallback(() => {
    const now = Date.now();
    if (now - lastImageTapRef.current < 320) {
      lastImageTapRef.current = 0;
      triggerLikeBounce();
      if (!isLiked) setHeartAnimKey((k) => k + 1);
      dispatch(toggleLike(params.imageId));
    } else {
      lastImageTapRef.current = now;
    }
  }, [isLiked, dispatch, params.imageId, triggerLikeBounce]);

  const { data, loading, error, refetch } = useQuery<{ image: GalleryImage }>(
    GET_IMAGE,
    { variables: { id: params.imageId } },
  );

  if (loading) return <AppLoader message="Loading image..." />;
  if (error || !data?.image) {
    return <AppErrorView message="Could not load image details." onRetry={() => refetch()} />;
  }

  const image = data.image;
  const totalLikes = image.likes + (isLiked ? 1 : 0);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} translucent />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}
        activeOpacity={0.8} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeftIcon size={moderateScale(20)} color={Colors.white} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} bounces contentContainerStyle={styles.scrollContent}>
        <Pressable style={styles.imageWrapper} onPress={handleImageTap}>
          <Animated.View style={[styles.imageContainer, imageAnimStyle]}>
            <AppImage uri={image.imageUrl} style={styles.image} resizeMode="cover" />
          </Animated.View>

          <View style={styles.heroGradientContainer} pointerEvents="none">
            {HERO_GRADIENT_LAYERS.map((layer, i) => (
              <View key={i} style={[styles.heroGradientLayer, { top: layer.top, backgroundColor: layer.bg }]} />
            ))}
          </View>

          <View style={styles.imageLikeBadge}>
            <HeartFilledIcon size={moderateScale(12)} color={Colors.likeActive} />
            <AppText variant="caption" color={Colors.white}>{totalLikes.toLocaleString()}</AppText>
          </View>

          <View style={styles.heartBurstContainer}>
            <AppHeartAnimation animationKey={heartAnimKey} size={96} />
          </View>
        </Pressable>

        <Animated.View style={[styles.content, contentAnimStyle]}>
          <View style={styles.titleRow}>
            <AppText variant="h2" style={styles.title} numberOfLines={3}>{image.title}</AppText>
            <TouchableOpacity onPress={handleLike}
              style={[styles.likeBtn, isLiked && styles.likeBtnActive]} activeOpacity={0.9}>
              <Animated.View style={likeButtonStyle}>
                {isLiked
                  ? <HeartFilledIcon size={moderateScale(19)} color={Colors.likeActive} />
                  : <HeartOutlineIcon size={moderateScale(19)} color={Colors.textSecondary} />
                }
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <AppText variant="h3" color={Colors.white} style={styles.avatarInitial}>
                {image.author.charAt(0).toUpperCase()}
              </AppText>
            </View>
            <View style={styles.authorInfo}>
              <AppText variant="caption" color={Colors.textMuted}>Photographer</AppText>
              <AppText variant="body" color={Colors.primary} style={styles.authorName}>{image.author}</AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <AppText variant="h2" color={Colors.primary}>{totalLikes.toLocaleString()}</AppText>
              <AppText variant="caption">Total Likes</AppText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statLikedRow}>
                <AppText variant="h3" color={isLiked ? Colors.accent : Colors.textMuted}>
                  {isLiked ? 'Liked' : 'Not Liked'}
                </AppText>
                {isLiked && <HeartFilledIcon size={moderateScale(16)} color={Colors.likeActive} />}
              </View>
              <AppText variant="caption">Your Status</AppText>
            </View>
          </View>

          <AppCard style={styles.descriptionCard}>
            <AppText variant="label" color={Colors.primary} style={styles.sectionLabel}>Description</AppText>
            <AppText variant="body" color={Colors.textSecondary} style={styles.description}>
              {image.description}
            </AppText>
          </AppCard>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  backButton: {
    position: 'absolute', top: moderateScale(52), left: Spacing.base, zIndex: 20,
    width: moderateScale(40), height: moderateScale(40), borderRadius: BorderRadius.round,
    backgroundColor: Colors.overlayDark, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  scrollContent: { paddingBottom: Spacing.xxxl },
  imageWrapper: { height: IMAGE_HEIGHT, backgroundColor: Colors.surface, overflow: 'hidden' },
  imageContainer: { ...StyleSheet.absoluteFillObject },
  image: { width: '100%', height: '100%' },
  heroGradientContainer: { ...StyleSheet.absoluteFillObject },
  heroGradientLayer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  imageLikeBadge: {
    position: 'absolute', bottom: Spacing.base, right: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round, borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.18)', zIndex: 5,
  },
  heartBurstContainer: { pointerEvents: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 },
  content: { padding: Spacing.base, gap: Spacing.base },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: Spacing.md },
  title: { flex: 1, lineHeight: moderateScale(28) * 1.2 },
  likeBtn: {
    width: moderateScale(42), height: moderateScale(42), borderRadius: BorderRadius.round,
    backgroundColor: Colors.surfaceElevated, borderWidth: 1.5, borderColor: Colors.surfaceBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  likeBtnActive: { borderColor: Colors.likeActive, backgroundColor: `${Colors.likeActive}18` },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  authorAvatar: {
    width: moderateScale(44), height: moderateScale(44), borderRadius: BorderRadius.round,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  authorInfo: { flex: 1 },
  avatarInitial: { fontWeight: '700' },
  authorName: { fontWeight: '600' },
  statsRow: { flexDirection: 'row', backgroundColor: Colors.surfaceElevated, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.surfaceBorder, overflow: 'hidden' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: Spacing.base, gap: Spacing.xs },
  statLikedRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statDivider: { width: 1, backgroundColor: Colors.surfaceBorder, marginVertical: Spacing.base },
  descriptionCard: { gap: Spacing.sm },
  sectionLabel: { marginBottom: Spacing.xs },
  description: { lineHeight: moderateScale(14) * 1.75 },
});

export default ImageDetailScreen;
