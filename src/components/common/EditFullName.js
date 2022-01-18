import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../helpers/api';

const EditFullName = ({ dafaultFullName, setIsEditName }) => {
  const [name, setName] = useState(dafaultFullName);
  const queryClient = useQueryClient();

  const { mutate: handleChangeFullName, isLoading } = useMutation(
    async () => {
      const res = await api.post('/me/update-fullname', {
        fullName: name,
      });

      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('posts');
        queryClient.setQueryData('me', (oldData) => {
          return {
            ...oldData,
            full_name: name,
          };
        });

        setIsEditName(false);
      },
      onError: () => {
        Alert.alert('Có lỗi xảy ra vui lòng thử lại sau');
      },
    },
  );

  return (
    <>
      <TextInput
        style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginRight: 5 }}
        placeholder="Tên của bạn"
        blurOnSubmit={true}
        maxLength={1000}
        value={name}
        onChangeText={(text) => setName(text)}
        autoFocus
      />

      <Icon
        name="checkmark-circle-outline"
        type="ionicon"
        size={30}
        color="#1C86EE"
        disabled={isLoading}
        onPress={() => handleChangeFullName()}
      />
      <Icon name="close-circle-outline" type="ionicon" size={30} color="red" onPress={() => setIsEditName(false)} />
    </>
  );
};

export default EditFullName;
