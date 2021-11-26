/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { Tab, TabView } from 'react-native-elements';

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

const SearchResult = ({ searchQuery }) => {

    const [index, setIndex] = useState(0);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(search(searchQuery))
    }, [searchQuery]);

    /**
     * 
     * Lấy dữ liệu từ Api
     */
    const search = (searchQuery) => {
        return [
            {
                name: 'Nhóm bạn bè hàng đầu thế giới',
                avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                subtitle: 'Zalo của Nhóm bạn bè hàng đầu'
            },
            {
                name: 'Nhóm nhà quản trị tương lai',
                avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                subtitle: 'Zalo của Nhóm nhà quản trị tương lai'
            },
            {
                name: 'Nhóm rạp xiếc',
                avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                subtitle: 'Zalo của Nhóm rạp xiếc'
            },
            {
                name: 'Nhóm Hiếu và những người bạn',
                avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                subtitle: 'Zalo của Nhóm Hiếu và những người bạn'
            },
            {
                name: 'Nhóm Quốc leader và những người bạn',
                avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                subtitle: 'Zalo của Nhóm Quốc leader và những người bạn'
            },
            // more items
        ];
    }

    return (
        <View style={styles.container}>
            <Tab value={index} onChange={setIndex} indicatorStyle={styles.tabTitle}>
                <Tab.Item
                    title="Tất cả"
                    containerStyle={[styles.tabContainer, index == 0 ? styles.activeTab : {}, { flexGrow: 0, flexBasis: 100, height: 50, }]}
                    titleStyle={[styles.tabTitle, index == 0 ? styles.activeTabTitle : styles.notActiveTabTitle, {}]}
                />
                <Tab.Item
                    title="Official Account"
                    containerStyle={[styles.tabContainer, index == 1 ? styles.activeTab : {}, {}]}
                    titleStyle={[styles.tabTitle, index == 1 ? styles.activeTabTitle : styles.notActiveTabTitle, {}]}
                />
                <Tab.Item
                    title="Tin nhắn"
                    containerStyle={[styles.tabContainer, index == 2 ? styles.activeTab : {}, { flexGrow: 0, flexBasis: 100, height: 50, }]}
                    titleStyle={[styles.tabTitle, index == 2 ? styles.activeTabTitle : styles.notActiveTabTitle]}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} >
                <TabView.Item style={{ height: 500, width: '100%' }}>
                    <View>
                        {
                            list.map((l, i) => (
                                <ListItem containerStyle={styles.listItem} key={i} bottomDivider={false}>
                                    <Avatar rounded source={{ uri: l.avatar_url }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{l.name}</ListItem.Title>
                                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>
                </TabView.Item>
                <TabView.Item style={{ height: 500, width: '100%' }}>
                    <View>
                        {
                            list.map((l, i) => (
                                <ListItem containerStyle={styles.listItem} key={i} bottomDivider={false}>
                                    <Avatar rounded source={{ uri: l.avatar_url }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{l.name}</ListItem.Title>
                                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>
                </TabView.Item>
                <TabView.Item style={{ height: 500, width: '100%' }}>
                    <View>
                        {
                            list.map((l, i) => (
                                <ListItem containerStyle={styles.listItem} key={i} bottomDivider={false}>
                                    <Avatar rounded source={{ uri: l.avatar_url }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{l.name}</ListItem.Title>
                                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>
                </TabView.Item>
            </TabView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    listItem: {
        borderRadius: 10,
    },
    tabTitle: {
        color: '#000',
        fontSize: 10,
        backgroundColor: '#fff'
    },
    tabContainer: {
        backgroundColor: '#fff'
    },
    activeTab: {
    },
    activeTabTitle: {
    },
    notActiveTabTitle: {
        color: '#bbb'
    }
});

export default SearchResult;
