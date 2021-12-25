import React from 'react';
import { StyleSheet, View, TextInput, TouchableHighlight, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const SearchBar = () => {
  return (
    <View style={styles.header}>
      <View style={[styles.row, styles.alignItemsCenter]}>
        <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#fff" />
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="rgba(255,255,255,0.5)"
          placeholder="Tìm bạn bè, tin nhắn ..."
          onChangeText={(value) => setSearchQuery(value)}
        />
      </View>

      <TouchableHighlight onPress={() => {}}>
        <View style={[styles.row, styles.alignItemsCenter]}>
          <Icon style={{ marginRight: 10 }} name="qr-code-outline" type="ionicon" size={24} color="#fff" />
        </View>
      </TouchableHighlight>
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
    marginLeft: 10,
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#fff',
    borderBottomColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    width: '85%'
  },
  btnQr: {
    color: '#fff',
    width: 'auto',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

export default SearchBar;
