import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

const FRIENDREQUESTLIST = [
  {
    name: 'Hoang tAnh',
    avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
    msg: 'Chao cau',
  },
  {
    name: 'Hoang tAnh',
    avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
    msg: 'Cau khoe khong',
  },
  {
    name: 'Hoang tAnh',
    avatar: 'https://s120-ava-talk.zadn.vn/1/a/d/a/6/120/c935ca375b666bd5962085db45149680.jpg',
    msg: 'To yeu cau',
  },
];

const FriendRequests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="auto" />
      <View style={styles.header}>
        <View>
          <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#fff" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={[styles.row, styles.alignItemsCenter]}>
            <Text style={{ color: '#ffff', fontSize: 18 }}>Lời mời kết bạn</Text>
          </View>
        </View>
        <View style={{ position: 'absolute', right: 30 }}>
          <Icon name="settings-outline" type="ionicon" size={24} color="#fff" />
        </View>
      </View>

      <FlatList
        data={FRIENDREQUESTLIST}
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
            <Text style={{ color: '#666f76', marginLeft: 20, position: 'absolute', top: 30, left: 40, fontSize: 12 }}>
              Tu so dien thoai
            </Text>
            <TextInput
              editable={false}
              placeholder={item.msg}
              style={{
                color: '#666f76',
                marginLeft: 20,
                position: 'absolute',
                top: 50,
                left: 40,
                borderWidth: 1,
                height: 30,
                width: '80%',
                borderColor: '#666f76',
                paddingLeft: 10,
              }}
            />
            {/* <Text style={{
                borderWidth: 200,
                borderColor: "pink",
                color: '#666f76'
            }}>{item.msg}</Text> */}

            <View style={{ flexDirection: 'row', position: 'absolute', top: 15, right: 30 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0091ff',
                  marginRight: 30,
                  width: 80,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 50,
                  borderColor: '#0091ff',
                }}
                onPress={this.onPress}
              >
                <Text style={{ color: '#ffff', textTransform: 'uppercase', backgroundColor: '#0091ff' }}>Đồng ý</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#ffff' }} onPress={this.onPress}>
                <Text style={{ color: '#666f76', textTransform: 'uppercase' }}> X </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
});

export default FriendRequests;
