import React, { useState, useEffect } from 'react';
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
import { Icon } from 'react-native-elements';

const showAlertBeforeBack = () =>
  Alert.alert(
    null,
    'Nội dung chưa được lưu. Bạn có chắc muốn hủy?',
    [
      {
        text: 'Không',
        onPress: () => {},
      },
      {
        text: 'Có',
        onPress: () => {},
      },
    ],
    {
      cancelable: true,
    },
  );

const AddPost = () => {
  const [postContent, setPostContent] = useState('');
  const [isDisabledBtnPost, setDisableBtnPost] = useState(true);

  // kiểm tra nội dung post để disable nút Đăng
  useEffect(() => {
    const canPost = () => {
      // postContent trống
      if (postContent != null && postContent.trim() != '') {
        return false;
      } else {
        return true;
      }
    };
    setDisableBtnPost(canPost);
  }, [postContent]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.header}>
        <View>
          <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#555" onPress={showAlertBeforeBack} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={[styles.row, styles.alignItemsCenter]}>
            <Icon name="people" type="ionicon" size={20} color="#555" />
            <Text style={{ fontWeight: '700', fontSize: 12 }}>Tất cả bạn bè</Text>
          </View>
          <Text style={{ fontSize: 12 }}>Xem bởi bạn bè trên BK-Zalo</Text>
        </View>
        <View style={styles.flexSpace} />
        <View>
          <TouchableHighlight onPress={() => {}} disabled={isDisabledBtnPost}>
            <Text style={[styles.btnPostText, { opacity: isDisabledBtnPost ? 0.2 : 1 }]}>Đăng</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{}}>
          <View>
            <TextInput
              multiline={true}
              style={styles.textInput}
              placeholder="Bạn đang nghĩ gì?"
              onChangeText={(value) => setPostContent(value)}
            >
              {postContent}
            </TextInput>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.btnMedia}>
            <Icon name="image-outline" type="ionicon" size={28} color="#555" onPress={showAlertBeforeBack} />
          </View>
          <View style={styles.btnMedia}>
            <Icon name="videocam-outline" type="ionicon" size={30} color="#555" onPress={showAlertBeforeBack} />
          </View>
          <View style={styles.btnMedia}>
            <Icon name="link" type="feather" size={22} color="#555" onPress={showAlertBeforeBack} />
          </View>
        </View>
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
  flexSpace: {
    flex: 1,
  },
  header: {
    backgroundColor: '#e5e5e5',
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
  body: {
    flex: 10,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlignVertical: 'top',
    fontSize: 18,
  },
  footer: {
    borderTopColor: '#d9d9d9',
    borderTopWidth: 1,
    backgroundColor: '#f5f5f5',
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnPostText: {
    color: '#0086fe',
    width: 'auto',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  btnMedia: {
    marginLeft: 20,
  },
});

export default AddPost;
