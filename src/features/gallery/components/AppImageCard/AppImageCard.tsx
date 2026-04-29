import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadow } from '../../../../theme';
import { moderateScale, getNumColumns } from '../../../../utils/responsive';
import { GalleryImage } from '../../../../types';
import AppText from '../../../../shared/components/AppText';
import AppHeartAnimation from '../../../../shared/components/AppHeartAnimation';
import AppImage from '../../../../shared/components/AppImage';
import { HeartFilledIcon, HeartOutlineIcon } from '../../../../shared/assets/icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUM_COLS = getNumColumns();
const CARD_MARGIN = Spacing.sm;
const CARD_WIDTH =
  (SCREEN_WIDTH - Spacing.base * 2 - CARD_MARGIN * (NUM_COLS - 1)) / NUM_COLS;

const GRADIENT_LAYERS = [
  { top: '33%', bg: 'rgba(0,0,0,0.08)' },
  { top: '43%', bg: 'rgba(0,0,0,0.12)' },
  { top: '51%', bg: 'rgba(0,0,0,0.15)' },
  { top: '58%', bg: 'rgba(0,0,0,0.18)' },
  { top: '65%', bg: 'rgba(0,0,0,0.20)' },
  { top: '72%', bg: 'rgba(0,0,0,0.22)' },
  { top: '79%', bg: 'rgba(0,0,0,0.22)' },
  { top: '87%', bg: 'rgba(0,0,0,0.22)' },
] as const;

interface AppImageCardProps {
  image: GalleryImage;
  isLiked: boolean;
  onPress: () => void;
  onLike: () => void;
}

const AppImageCard: React.FC<AppImageCardProps> = ({ image, isLiked, onPress, onLike }) => {
  const [heartAnimKey, setHeartAnimKey] = useState(0);

  const likeScale = useSharedValue(1);
  const likeAnimStyle = useAnimatedStyle(() => ({ transform: [{ scale: likeScale.value }] }));

  const handleLike = useCallback(() => {
    likeScale.value = withSequence(
      withSpring(1.4, { damping: 5, stiffness: 350 }),
      withSpring(1.0, { damping: 12 }),
    );
    if (!isLiked) setHeartAnimKey((k) => k + 1);
    onLike();
  }, [isLiked, onLike, likeScale]);

  const lastTapRef = useRef(0);
  const singleTapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (singleTapTimerRef.current) clearTimeout(singleTapTimerRef.current); };
  }, []);

  const handleCardPress = useCallback(() => {
    const now = Date.now();
    const THRESHOLD = 320;
    if (now - lastTapRef.current < THRESHOLD) {
      if (singleTapTimerRef.current) { clearTimeout(singleTapTimerRef.current); singleTapTimerRef.current = null; }
      handleLike();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
      singleTapTimerRef.current = setTimeout(() => { singleTapTimerRef.current = null; onPress(); }, THRESHOLD);
    }
  }, [handleLike, onPress]);

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.9}>
      <AppImage uri={image.thumbnailUrl} style={styles.image} resizeMode="cover" />

      <View style={styles.gradientContainer} pointerEvents="none">
        {GRADIENT_LAYERS.map((layer, i) => (
          <View key={i} style={[styles.gradientLayer, { top: layer.top, backgroundColor: layer.bg }]} />
        ))}
      </View>

      <View style={styles.heartContainer}>
        <AppHeartAnimation animationKey={heartAnimKey} size={72} />
      </View>

      <View style={styles.infoContainer}>
        <AppText variant="bodySmall" color={Colors.white} style={styles.title} numberOfLines={1}>
          {image.title}
        </AppText>
        <View style={styles.metaRow}>
          <AppText variant="caption" color="rgba(255,255,255,0.70)" style={styles.author} numberOfLines={1}>
            {image.author}
          </AppText>
          <TouchableOpacity onPress={handleLike} style={styles.likeButton} activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Animated.View style={likeAnimStyle}>
              {isLiked
                ? <HeartFilledIcon size={moderateScale(13)} color={Colors.likeActive} />
                : <HeartOutlineIcon size={moderateScale(13)} color="rgba(255,255,255,0.55)" />
              }
            </Animated.View>
            <AppText variant="caption" color={isLiked ? Colors.likeActive : 'rgba(255,255,255,0.55)'}>
              {image.likes + (isLiked ? 1 : 0)}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { width: CARD_WIDTH, borderRadius: BorderRadius.lg, backgroundColor: Colors.cardBackground, overflow: 'hidden', marginBottom: CARD_MARGIN, ...Shadow.md, borderWidth: 1, borderColor: Colors.cardBorder },
  image: { width: '100%', height: CARD_WIDTH * 1.15 },
  gradientContainer: { ...StyleSheet.absoluteFillObject, borderBottomLeftRadius: BorderRadius.lg, borderBottomRightRadius: BorderRadius.lg, overflow: 'hidden' },
  gradientLayer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  heartContainer: { pointerEvents: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 },
  infoContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: Spacing.sm, paddingTop: Spacing.sm, paddingBottom: Spacing.sm, gap: Spacing.xs, zIndex: 5, backgroundColor: 'rgba(0,0,0,0.28)', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(255,255,255,0.10)' },
  title: { fontWeight: '600', fontSize: moderateScale(12), color: Colors.white, textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  author: { flex: 1, marginRight: Spacing.xs },
  likeButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});

export default AppImageCard;
