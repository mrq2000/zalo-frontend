/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Tab, TabView } from 'react-native-elements';

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
import { Icon } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Input } from 'react-native-elements/dist/input/Input';
import { Button } from 'react-native-elements';

const Account = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.cover}>
                <ImageBackground
                    style={styles.coverImage}
                    source={require('../../assets/2-Mat-Than.jpg')}
                />
                <Avatar
                    rounded
                    size={75}
                    containerStyle={styles.avatar}
                    source={require('../../assets/anh1.jpg')}
                />
            </View>
            <View style={styles.body}>
                <View style={styles.form}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Tên Zalo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Họ và tên'
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Tạo tên tài khoản'
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Giới tính</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nam'
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ngày sinh</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='01/01/2021'
                        />
                    </View>
                    <View style={[styles.row, { borderBottomWidth: 0 }]}>
                        <Text style={[styles.label, { textAlignVertical: 'top' }]}>Điện thoại</Text>
                        <View style={[styles.inputWrapper]}>
                            <View style={{ height: 30, }}>
                                <TextInput
                                    style={[styles.input]}
                                    placeholder='+123456789'
                                />
                            </View>
                            <Text style={{ color: '#999', height: 60, }}>
                                Số điện thoại của bạn chỉ hiển thị với bạn bè có lưu số điện thoại của bạn
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                    <Button 
                        title='Đổi thông tin'
                        buttonStyle={styles.button}
                        onPress={() => props.navigation.navigate('AccountSetting')}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cover: {
        height: 150,
    },
    coverImage: {
        height: 150,
    },
    avatar: {
        marginTop: -85,
        marginLeft: 15,
    },
    body: {
        flex: 1,
        backgroundColor: '#bbb'
    },
    form: {
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
    },
    label: {
        color: '#666',
        flex: 1,
        textAlignVertical: 'center',
        padding: 5,
    },
    input: {
        flex: 3,
        height: 40,
        fontWeight: '600'
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

export default Account;
