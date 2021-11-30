import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const CONTACTLIST = [
  {
    title: 'A',
    data: [
      {
        name: 'Hoang Anh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
      {
        name: 'Viet Anh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
      {
        name: 'Minh Anh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
    ],
  },
  {
    title: 'B',
    data: [
      {
        name: 'Hoang Bnh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
      {
        name: 'Viet BAnh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
      {
        name: 'Minh bAnh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
    ],
  },
  {
    title: 'T',
    data: [
      {
        name: 'Hoang tAnh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
      {
        name: 'Viet TAnh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
      {
        name: 'Minh TAnh',
        avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
      },
    ],
  },
];

const ACTIVE = [
  {
    name: 'Hoang tAnh',
    avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
  },
  {
    name: 'Hoang tAnh',
    avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
  },
  {
    name: 'Hoang tAnh',
    avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
  },
];

function ContactList() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 70,
          alignContent: 'center',
          backgroundColor: '#ffff',
          flexDirection: 'row',
        }}
      >
        <Avatar
          rounded
          source={{ uri: 'https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png' }}
          containerStyle={{ marginLeft: 10, marginTop: 10 }}
        />
        <Text style={{ color: '#001a33', marginLeft: 20, position: 'absolute', top: 15, left: 40 }}>
          Lời mời kết bạn
        </Text>
      </View>

      <View
        style={{
          height: 70,
          alignContent: 'center',
          backgroundColor: '#ffff',
          flexDirection: 'row',
        }}
      >
        <Avatar
          rounded
          source={{ uri: 'https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png' }}
          containerStyle={{ marginLeft: 10, marginTop: 10 }}
        />
        <Text style={{ color: '#001a33', marginLeft: 20, position: 'absolute', top: 15, left: 40 }}>
          Bạn từ danh bạ máy
        </Text>
      </View>
      <View style={{ backgroundColor: '#e8ebef', height: 3 }}></View>
      <View style={{ backgroundColor: '#ffff', paddingBottom: 10, paddingTop: 10 }}>
        <Text>Bạn bè mới truy cập</Text>
      </View>
      <FlatList
        data={ACTIVE}
        keyExtractor={(item, index) => item + index}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              height: 80,
              alignContent: 'center',
              backgroundColor: '#ffff',
              flexDirection: 'row',
            }}
          >
            <Avatar rounded source={{ uri: item.avatar }} containerStyle={{ marginLeft: 10, marginTop: 10 }} />
            <View style={styles.circle}></View>
            <Text style={{ color: '#001a33', marginLeft: 20, position: 'absolute', top: 15, left: 40 }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 15, right: 30 }}>
              <Icon name="call-outline" type="ionicon" size={24} color="#666f76" />
              <Icon
                name="videocam-outline"
                type="ionicon"
                size={24}
                color="#666f76"
                containerStyle={{ marginLeft: 30 }}
              />
            </View>
          </View>
        )}
      />

      <View style={{ backgroundColor: '#e8ebef', height: 3 }}></View>

      <View style={{ backgroundColor: '#ffff', paddingBottom: 10, paddingTop: 10, flexDirection: 'row' }}>
        <Text>Tất cả danh bạ</Text>
        {/* <TouchableOpacity
         style={{backgroundColor: '#ffff', position:'absolute', right:30, top: 10}}
         onPress={this.onPress}
        >
         <Text style={{color:'#0091ff', textTransform: 'uppercase'}}> Cập nhật </Text>
        </TouchableOpacity> */}
      </View>

      <SectionList
        sections={CONTACTLIST}
        keyExtractor={(item, index) => item + index}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              height: 80,
              alignContent: 'center',
              backgroundColor: '#ffff',
              flexDirection: 'row',
            }}
          >
            <Avatar rounded source={{ uri: item.avatar }} containerStyle={{ marginLeft: 10, marginTop: 10 }} />
            <Text style={{ color: '#001a33', marginLeft: 20, position: 'absolute', top: 15, left: 40 }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 15, right: 30 }}>
              <Icon name="call-outline" type="ionicon" size={24} color="#666f76" />
              <Icon
                name="videocam-outline"
                type="ionicon"
                size={24}
                color="#666f76"
                containerStyle={{ marginLeft: 30 }}
              />
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              backgroundColor: '#ffff',
            }}
          >
            <Text style={{ color: '#666f76', marginLeft: 10 }}>{title}</Text>
          </View>
        )}
        renderSectionFooter={({ section: { title } }) => (
          <View style={{ backgroundColor: '#e8ebef', height: 3 }}></View>
        )}
      />
    </View>
  );
}

function OfficialAccount() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Official Account</Text>
    </View>
  );
}
function Groups() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Groups!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const Contact = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="auto" />
      <View style={styles.header}>
        <View>
          <Icon name="search-outline" type="ionicon" size={24} color="#fff" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={[styles.row, styles.alignItemsCenter]}>
            <TextInput
              style={styles.searchInput}
              placeholderTextColor="rgba(255,255,255,0.5)"
              placeholder="Tìm bạn bè, tin nhắn ..."
              onChangeText={(value) => setSearchQuery(value)}
            >
              {searchQuery}
            </TextInput>
          </View>
        </View>
        <View>
          <Icon name="person-add-outline" type="ionicon" size={24} color="#fff" />
        </View>
      </View>

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            swipeEnabled: false,
            // tabBarActiveTintColor: '#000000',
            tabBarIndicatorStyle: { backgroundColor: '#000000', left: 25, right: 20, width: 150 },
          }}
        >
          <Tab.Screen name="Danh bạ" component={ContactList} />
          <Tab.Screen name="Official Account" component={OfficialAccount} />
          <Tab.Screen name="Nhóm" component={Groups} />
        </Tab.Navigator>
      </NavigationContainer>
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
  flexSpace: {},
  header: {
    backgroundColor: '#0091ff',
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
    height: 70,
  },
  searchInput: {
    marginLeft: 10,
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#fff',
    borderBottomColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    width: '90%',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#15a85f',
    marginTop: 35,
  },
});

export default Contact;
