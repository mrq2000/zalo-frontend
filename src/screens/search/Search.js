/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { useRoute } from '@react-navigation/core';

import SearchResult from './SearchResult';
import SearchBar from '../../components/layout/SearchBar';
import useSearch from '../../data/useSearch';

const Search = () => {
  const route = useRoute();
  const { data, isLoading } = useSearch(route.params?.keyword || '');

  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.body}>
        <View style={{ flex: 1 }}>
          {isLoading ? <ActivityIndicator size="small" style={{ marginTop: 20 }} /> : <SearchResult data={data} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 10,
  },
});

export default Search;
