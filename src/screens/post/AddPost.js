import { useNavigation } from '@react-navigation/core';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useMutation, useQueryClient } from 'react-query';
import PrivateRoute from '../../components/layout/PrivateScreen';
import ImageGridLayout from '../../components/post/ImageGridLayout';
import useMe from '../../data/useMe';

import { api } from '../../helpers/api';

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
  const [files, setFiles] = useState(null);
  const [isDisabledBtnPost, setDisableBtnPost] = useState(true);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const openImagePickerAsync = () => {
    navigation.navigate('ImageBrowser', { handleCallback: (photos) => setFiles(photos) });
  };

  const { data: me } = useMe();

  useEffect(() => {
    const canPost = () => {
      if (postContent != null && postContent.trim() != '') {
        return false;
      } else {
        return true;
      }
    };
    setDisableBtnPost(canPost());
  }, [postContent]);

  const { mutate: addPost, isLoading } = useMutation(
    async (formData) => {
      const res = await api.post('/posts', formData);
      return res.data;
    },
    {
      onSuccess: (data) => {
        if (queryClient.getQueryData('posts')) {
          queryClient.setQueriesData('posts', (oldData) => {
            return {
              ...oldData,
              pages: [
                [
                  {
                    ...data.data,
                    author: {
                      id: me.me,
                      full_name: me.full_name,
                      avatar_url: me.avatar_url,
                    },
                    created_at: dayjs(),
                  },
                ],
                ...oldData.pages,
              ],
            };
          });
        }
        navigation.navigate('Home');
      },
      onError: (error) => {
        Alert.alert('Đăng bài thất bại', 'Vui lòng thử lại sau!');
      },
    },
  );

  const handleAddPost = () => {
    const formData = new FormData();

    if (files) {
      files.map((file) => {
        formData.append('image', {
          name: file.name,
          type: file.type,
          uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
        });
      });
    }

    formData.append('described', postContent);
    addPost(formData);
  };

  return (
    <PrivateRoute>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <View>
            <Icon
              name="md-arrow-back-outline"
              type="ionicon"
              size={24}
              color="#555"
              onPress={() => navigation.goBack()}
            />
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
            <TouchableOpacity disabled={isLoading || isDisabledBtnPost} onPress={handleAddPost}>
              <Text style={[styles.btnPostText, { opacity: isLoading || isDisabledBtnPost ? 0.2 : 1 }]}>Đăng</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <ScrollView contentContainerStyle={{}}>
            <View style={{ paddingTop: 10 }}>
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

          <View style={{ padding: 10 }}>{files && <ImageGridLayout data={files.map((file) => file.uri)} />}</View>

          <View style={styles.footer}>
            <View style={styles.btnMedia}>
              <Icon name="image-outline" type="ionicon" size={28} color="#555" onPress={openImagePickerAsync} />
            </View>
            <View style={styles.btnMedia}>
              <Icon name="videocam-outline" type="ionicon" size={30} color="#555" onPress={showAlertBeforeBack} />
            </View>
            <View style={styles.btnMedia}>
              <Icon name="link" type="feather" size={22} color="#555" onPress={showAlertBeforeBack} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </PrivateRoute>
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
