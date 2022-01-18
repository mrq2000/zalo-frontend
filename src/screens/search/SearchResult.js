/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ListItem, Avatar, Tab, TabView } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { DEFAULT_AVATAR } from '../../env';
import FriendStatusButton from '../../components/common/FriendStatusButton';

const SearchResult = ({ data }) => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Tab value={index} onChange={setIndex} indicatorStyle={styles.tabTitle}>
        <Tab.Item
          title="Tài Khoản"
          containerStyle={[styles.tabContainer, index == 0 ? styles.activeTab : {}, {}]}
          titleStyle={[styles.tabTitle, index == 0 ? styles.activeTabTitle : styles.notActiveTabTitle, {}]}
        />
        <Tab.Item
          title="Tin nhắn"
          containerStyle={[styles.tabContainer, index == 1 ? styles.activeTab : {}, { flexGrow: 0, flexBasis: 100, height: 50, }]}
          titleStyle={[styles.tabTitle, index == 1 ? styles.activeTabTitle : styles.notActiveTabTitle]}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} style={{ paddingBottom: 5 }} >
        <TabView.Item style={styles.tabItemContainer}>
          <View>
            {
              data.map((user) => (
                <ListItem containerStyle={styles.listItem} key={user.id} bottomDivider={false}>
                  <TouchableOpacity onPress={() => navigation.navigate('UserAccount', { userId: user.id })}>
                    <Avatar rounded source={{ uri: user.avatar_url || DEFAULT_AVATAR }} />
                  </TouchableOpacity>
                  <ListItem.Content style={{ display: 'flex', flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserAccount', { userId: user.id })}>
                      <ListItem.Title style={{ fontWeight: 'bold' }}>{user.full_name}</ListItem.Title>
                    </TouchableOpacity>
                    <ListItem.Subtitle style={{ color: '#626262' }}>{user.phonenumber}</ListItem.Subtitle>
                  </ListItem.Content>

                  <View>
                    <FriendStatusButton friendId={user.id} meSend={user.meReceiveRequest} meRecive={user.meSendRequest} />
                  </View>
                </ListItem>
              ))
            }
          </View>
        </TabView.Item>
        <TabView.Item style={styles.tabItemContainer}>
          <View>
            {
              data.map((user) => (
                <ListItem containerStyle={styles.listItem} key={user.id} bottomDivider={false}>
                  <Avatar rounded source={{ uri: user.avatar_url || DEFAULT_AVATAR }} />
                  <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold' }}>{user.full_name}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: '#626262' }}>{user.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            }
          </View>
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
  },
  listItem: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  tabTitle: {
    color: '#000',
    fontSize: 10,
    backgroundColor: '#fff'
  },
  tabContainer: {
    backgroundColor: '#fff',
  },
  notActiveTabTitle: {
    color: '#bbb'
  },
  tabItemContainer: {
    width: '100%',
  }
});

export default SearchResult;
