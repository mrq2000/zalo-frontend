import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PrivateRoute from '../../components/layout/PrivateScreen';
import MessageItem from '../../components/message/MessageItem';
import useMessageList from '../../data/useMessageList';
import SearchBar from '../../components/layout/SearchBar';

const Message = () => {
  const { data, isLoading } = useMessageList();

  const renderMsgItem = ({ item }) => <MessageItem data={item} />;

  const renderFindMoreFriendWrapper = () => (
    <View style={styles.findMoreFriendWrapper}>
      <Text style={styles.txtFMF}>Dễ dàng tìm kiếm và trò chuyện với bạn bè</Text>
      <Button type="solid" titleStyle={styles.btnFMFTitle} buttonStyle={styles.btnFMF} title="Tìm thêm bạn" />
    </View>
  );

  return (
    <PrivateRoute>
      <SearchBar />

      <SafeAreaView style={styles.msgWrapper}>
        {isLoading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} />}
        <FlatList data={data} renderItem={renderMsgItem} keyExtractor={(item) => item.firendId} />
        {renderFindMoreFriendWrapper()}
      </SafeAreaView>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  msgWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexSpace: {
    flex: 1,
  },
  findMoreFriendWrapper: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  // FMF: Find more friend
  txtFMF: {
    color: '#888',
  },
  btnFMF: {
    marginTop: 10,
    backgroundColor: '#0086fe',
    color: '#f00',
    borderRadius: 100,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  btnFMFTitle: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#fff',
  },
});

export default Message;
