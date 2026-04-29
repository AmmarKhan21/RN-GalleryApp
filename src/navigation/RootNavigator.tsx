import React from 'react';
import useAppSelector from '../shared/hooks/useAppSelector';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

// PersistGate rehydrates the store before this mounts, so isRegistered is always correct
const RootNavigator: React.FC = () => {
  const isRegistered = useAppSelector((s) => s.auth.isRegistered);
  return isRegistered ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
