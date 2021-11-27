/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ListItem, Avatar } from 'react-native-elements';

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

const Suggest = ({list}) => {

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {
            list.map((l, i) => (
                <ListItem containerStyle={styles.listItem} key={i} bottomDivider={false}>
                    <Avatar rounded source={{uri: l.avatar_url}} />
                    <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))
        }
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 10,
  },
  listItem: {
    borderRadius: 10,
  }
});

export default Suggest;
