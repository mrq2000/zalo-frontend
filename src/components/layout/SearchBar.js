import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const SearchBar = () => {
  const navigation = useNavigation();
  const [keyword, setKeyWord] = useState('');

  return (
    <View style={styles.header}>
      <View style={[styles.row, styles.alignItemsCenter]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ display: 'flex', flex: 1 }}>
          <TextInput
            style={styles.searchInput}
            placeholderTextColor="rgba(255,255,255,0.5)"
            placeholder="Tìm bạn bè, tin nhắn ..."
            onChangeText={(value) => setKeyWord(value)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search', { keyword });
          }}
        >
          <View style={[styles.row, styles.alignItemsCenter]}>
            <Icon style={{ marginRight: 10 }} name="search-outline" type="ionicon" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <View style={[styles.row, styles.alignItemsCenter]}>
            <Icon style={{ marginRight: 10 }} name="qr-code-outline" type="ionicon" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
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
  header: {
    backgroundColor: '#0068ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    marginHorizontal: 10,
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#fff',
    borderBottomColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
  },
});

export default SearchBar;
