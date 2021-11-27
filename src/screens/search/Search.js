/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Tab, TabView } from 'react-native-elements';

import Suggest from './Suggest'
import SearchResult from './SearchResult';



import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert,
  TouchableHighlight,
  Text,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon } from 'react-native-elements';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [suggestTeams, setSuggestTeams] = useState([]);
  const [officialAccounts, setOfficialAccounts] = useState([]);

  useEffect(() => {
    setSuggestTeams(getTeamSuggest());
    setOfficialAccounts(getOfficialAccounts());
  }, []);

  const getOfficialAccounts = () => {
    return [
      {
        name: 'Thông tin chính phủ',
        avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        subtitle: 'Zalo của tổng thông tin chính phủ'
      },
      {
        name: 'Kết quả xổ số',
        avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        subtitle: 'Zalo của kết quả xổ số'
      },
      // more items
    ]
  }

  const getTeamSuggest = () => {
    return [
      {
        name: 'Nhóm bạn bè hàng đầu thế giới',
        avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        subtitle: 'Zalo của Nhóm bạn bè hàng đầu'
      },
      {
        name: 'Nhóm nhà quản trị tương lai',
        avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
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
    ]
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.header}>
        <View>
          <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#fff" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={[styles.row, styles.alignItemsCenter]}>
            <TextInput
              style={styles.searchInput}
              placeholderTextColor="rgba(255,255,255,0.5)"
              placeholder="Tìm bạn bè, tin nhắn ..."
              value={searchQuery}
              onChangeText={(value) => setSearchQuery(value)}
            />
          </View>
        </View>
        <View>
          <TouchableHighlight onPress={() => { }}>
            <Text style={[styles.btnQr]}>QR</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.body}>
        {
          searchQuery ? (
            <View style={{ flex: 1 }}>
              <SearchResult searchQuery={searchQuery} />
            </View>
          ) : (
            <View>

              <Tab value={index} onChange={setIndex} indicatorStyle={styles.tabTitle}>
                <Tab.Item
                  title="Gợi ý Official Account"
                  containerStyle={[styles.tabContainer, index == 0 ? styles.activeTab : {}]}
                  titleStyle={[styles.tabTitle, index == 0 ? styles.activeTabTitle : styles.notActiveTabTitle]}
                />
                <Tab.Item
                  title="Nhóm trò chuyện"
                  containerStyle={[styles.tabContainer, index == 1 ? styles.activeTab : {}]}
                  titleStyle={[styles.tabTitle, index == 1 ? styles.activeTabTitle : styles.notActiveTabTitle]}
                />
              </Tab>

              <TabView value={index} onChange={setIndex} >
                <TabView.Item style={{ height: 500, width: '100%' }}>
                  <Suggest list={officialAccounts} />
                </TabView.Item>
                <TabView.Item style={{ height: 500, width: '100%' }}>
                  <Suggest list={suggestTeams} />
                </TabView.Item>
              </TabView>

            </View>
          )
        }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  flexSpace: {
  },
  header: {
    backgroundColor: '#0068ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    marginLeft: 10,
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#fff',
    borderBottomColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    width: '85%'
  },
  body: {
    flex: 10,
  },
  textInput: {
    paddingVertical: 20,
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#fff',
  },
  footer: {
    borderTopColor: '#d9d9d9',
    borderTopWidth: 1,
    backgroundColor: '#f5f5f5',
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnQr: {
    color: '#fff',
    width: 'auto',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  btnMedia: {
    marginLeft: 20,
  },
  tabTitle: {
    color: '#000',
    fontSize: 10,
    backgroundColor: '#fff'
  },
  tabContainer: {
    backgroundColor: '#fff'
  },
  activeTab: {
  },
  activeTabTitle: {
  },
  notActiveTabTitle: {
    color: '#bbb'
  }
});

export default Search;
