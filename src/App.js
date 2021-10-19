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
    <View>
      <View style={{ height: STATUS_BAR_HEIGHT, ...viewStyle }}>
        <StatusBar translucent {...statusBarStyle} />
      </View>

      <SafeAreaView>
        <QueryClientProvider client={queryClient}>
          <View style={{ minHeight: '100%' }}>
            <Navigator />
          </View>
        </QueryClientProvider>
      </SafeAreaView>
    </View>
  );
};

export default App;
