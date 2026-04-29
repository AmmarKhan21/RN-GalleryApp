import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { AppStackParamList } from '../types';
import GalleryScreen from '../features/gallery/screens/GalleryScreen';
import ImageDetailScreen from '../features/gallery/screens/ImageDetailScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.surface },
      headerTintColor: Colors.textPrimary,
      headerTitleStyle: { color: Colors.textPrimary, fontWeight: '600' },
      headerShadowVisible: false,
      contentStyle: { backgroundColor: Colors.background },
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen
      name="Gallery"
      component={GalleryScreen}
      options={{ title: 'Image Gallery', headerBackVisible: false }}
    />
    <Stack.Screen
      name="ImageDetail"
      component={ImageDetailScreen}
      options={{ headerShown: false, animation: 'fade_from_bottom' }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
