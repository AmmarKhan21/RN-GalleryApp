import React from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client/react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store, persistor } from './src/app/store';
import apolloClient from './src/graphql/apolloClient';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/theme';

const PersistLoader: React.FC = () => (
  <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={<PersistLoader />} persistor={persistor}>
      <ApolloProvider client={apolloClient}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" backgroundColor={Colors.background} translucent={false} />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);

export default App;
