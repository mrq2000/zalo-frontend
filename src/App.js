import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, Platform } from 'react-native';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import io from 'socket.io-client';
import useSocket from './stores/useSocket';

import AppNavigator from './AppNavigation';
import useStoreStatusStyle from './stores/useStoreStatusStyle';
import { getToken } from './helpers/storage';
import { API } from './env';

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
  const { setSocket } = useSocket();
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    if (userToken) {
      const socket = io(API, {
        auth: { token: userToken },
      });

      setSocket(socket);

      return () => {
        socket.disconnect();
        socket.off();
      };
    } else {
      (async () => {
        setUserToken(await getToken());
      })();
    }
  }, [userToken]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: STATUS_BAR_HEIGHT, ...viewStyle }}>
        <StatusBar translucent {...statusBarStyle} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <AppNavigator style={{ flex: 1 }} />
        </QueryClientProvider>
      </SafeAreaView>
    </View>
  );
};

export default App;
