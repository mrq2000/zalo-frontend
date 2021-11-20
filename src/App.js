import React from 'react';
import { SafeAreaView, StatusBar, View, Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navigator from './AppNavigation';
import useStoreStatusStyle from './stores/useStoreStatusStyle';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const viewStyle = useStoreStatusStyle((state) => state.viewStyle);
  const statusBarStyle = useStoreStatusStyle((state) => state.statusBarStyle);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: STATUS_BAR_HEIGHT, ...viewStyle }}>
        <StatusBar translucent {...statusBarStyle} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Navigator style={{ flex: 1 }} />
        </QueryClientProvider>
      </SafeAreaView>
    </View>
  );
};

export default App;
