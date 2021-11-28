/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Input, Tab, TabView } from 'react-native-elements';

import {
    StyleSheet,
    View,
    Image,
    TextInput,
    ScrollView,
    Alert,
    TouchableHighlight,
    Text,
    StatusBar,
    KeyboardAvoidingView,
    ImageBackground,
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

const AccountSetting = (props) => {

  const [gender, setGender] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.cover}>
              <View style={styles.avatarContainer}>
                <Avatar
                    rounded
                    size={100}
                    containerStyle={styles.avatar}
                    source={require('../../assets/anh1.jpg')}
                />
              </View>
              <View style={styles.info}>
                <Input containerStyle={{ marginHorizontal: 12 , marginTop: 5 }} placeholder='Họ và tên' />
                <View style={{flexDirection: 'row', marginVertical: 0, marginTop: -30, justifyContent: 'space-between'}}>
                  <CheckBox 
                    title="Nam" 
                    checkedIcon='check-circle'
                    uncheckedIcon='circle-o'
                    containerStyle={styles.check}
                    checked={gender==0}
                    onPress={() => setGender(0)}
                  />
                  <CheckBox 
                    title="Nữ" 
                    checkedIcon='check-circle'
                    uncheckedIcon='circle-o'
                    containerStyle={styles.check}
                    checked={gender==1}
                    onPress={() => setGender(1)}
                  />
                </View>
                <Input containerStyle={{ marginHorizontal: 12, marginTop: -15 }} placeholder='15/8/2000' />
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.row}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Tạo username'
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                <Button 
                    title='Cập nhật'
                    buttonStyle={styles.button}
                    onPress={() => props.navigation.navigate('Account')}
                />
              </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    cover: {
        height: 150,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    avatarContainer: {
      backgroundColor: '#fff',
      height: 150,
    },
    avatar: {
        marginTop: 15,
        marginLeft: 15,
    },
    info: {
      flex: 3,
    },
    check: {
      borderWidth: 0,
      backgroundColor: '#fff',
      flex: 1,
    },
    body: {
      marginTop: 10,
      flex: 1,
      backgroundColor: '#fff'
    },
    form: {
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
    },
    label: {
        color: '#666',
        flex: 1,
        textAlignVertical: 'center',
        padding: 5,
        fontWeight: '700',
        fontSize: 16,
    },
    input: {
        flex: 3,
        height: 40,
        fontWeight: '600',
        fontSize: 16,
    },
    inputWrapper: {
        flex: 3,
    },
    button: {
        borderRadius: 25,
        paddingHorizontal: 25,
        paddingVertical: 10,
    }

});

export default AccountSetting;
