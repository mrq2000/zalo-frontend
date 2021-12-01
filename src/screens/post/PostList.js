import React from 'react';
import { useQuery } from 'react-query';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';

import { api } from '../../helpers/api';

const PostList = () => {
  const { data } = useQuery(['posts'], () => {
    api.get('/posts', {
      params: {
        count: 12,
      },
    });
  });

  return (
    <FlatList
      data={[{ title: 'Title Text', key: 'item1' }]}
      renderItem={({ item, index, separators }) => (
        <TouchableHighlight
          key={item.key}
          onPress={() => this._onPress(item)}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
        >
          <View style={{ backgroundColor: 'white' }}>
            <Text>{item.title}</Text>
          </View>
        </TouchableHighlight>
      )}
    />
  );
};

export default PostList;
