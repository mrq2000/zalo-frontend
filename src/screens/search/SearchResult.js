/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ListItem, Avatar, Tab, TabView } from 'react-native-elements';

import { StyleSheet, View } from 'react-native';
import { DEFAULT_AVATAR } from '../../env';
import FriendStatusButton from '../../components/common/FriendStatusButton';

const SearchResult = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [list, setList] = useState([]);
  console.log(data);

  /**
   * 
   * Lấy dữ liệu từ Api
   */
  const search = () => {
    return [
      {
        name: 'Nhóm bạn bè hàng đầu thế giới',
        avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        subtitle: 'Zalo của Nhóm bạn bè hàng đầu'
      },
      {
        name: 'Nhóm nhà quản trị tương lai',
        subtitle: 'Zalo của Nhóm nhà quản trị tương lai'
      },
      {
        name: 'Nhóm rạp xiếc',
        avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        subtitle: 'Zalo của Nhóm rạp xiếc'
      },
      {
        name: 'Nhóm Hiếu và những người bạn',
        avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        subtitle: 'Zalo của Nhóm Hiếu và những người bạn'
      },
      {
        name: 'Nhóm Quốc leader và những người bạn',
        avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        subtitle: 'Zalo của Nhóm Quốc leader và những người bạn'
      },
      // more items
    ];
  }

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
                  <Avatar rounded source={{ uri: user.avatar_url || DEFAULT_AVATAR }} />
                  <ListItem.Content style={{ display: 'flex', flex: 1 }}>
                    <ListItem.Title>{user.full_name}</ListItem.Title>
                    <ListItem.Subtitle>{user.phonenumber}</ListItem.Subtitle>
                  </ListItem.Content>
                  
                  <View>
                    <FriendStatusButton meRecive={user.meReceiveRequest} meSend={user.meSendRequest} />
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
                    <ListItem.Title>{user.full_name}</ListItem.Title>
                    <ListItem.Subtitle>{user.subtitle}</ListItem.Subtitle>
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
