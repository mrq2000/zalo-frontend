import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import NotificationItem from '../../components/notification/NotificationItem';
import activities from './fake-activities';

const Notification = () => {
  const renderNotificationItem = ({ item }) => {
    return <NotificationItem data={item} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <LinearGradient colors={['#257afe', '#109afb', '#01b8f9']} start={[0, 1]} end={[1, 0]} style={styles.header}>
        <View style={styles.btnBack}>
          <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#fff" />
        </View>
        <View style={styles.InfoWrapper}>
          <Text style={styles.Info}>Thông báo</Text>
        </View>
        <View style={styles.flexSpace} />
        <View style={styles.btnOption}>
          <Icon name="settings-outline" type="ionicon" size={24} color="#fff" />
        </View>
      </LinearGradient>

      <View>
        <FlatList
          data={activities}
          renderItem={renderNotificationItem}
          ListFooterComponent={() => <View style={{ paddingBottom: 20 }}></View>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: 6,
  },
  InfoWrapper: {
    paddingHorizontal: 15,
  },
  Info: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  flexSpace: {
    flex: 1,
  },
});

export default Notification;
