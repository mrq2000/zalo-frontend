import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';

const ImageBrowserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const getHeaderLoader = () => <ActivityIndicator size="small" color={'#0580FF'} />;
  const handleCallback = route.params?.handleCallback;

  const processImageAsync = async (uri) => {
    const file = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 1000 } }], {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
    });
    return file;
  };

  const imagesCallback = (callback) => {
    navigation.setOptions({
      headerRight: getHeaderLoader,
    });

    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: 'image/jpg',
          });
        }
        handleCallback(cPhotos);
        navigation.goBack();
      })
      .catch((e) => console.log(e));
  };

  const renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity title={'Done'} onPress={onSubmit}>
        <Text onPress={onSubmit}>Done</Text>
      </TouchableOpacity>
    );
  };

  const updateHandler = (count, onSubmit) => {
    navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => renderDoneButton(count, onSubmit),
    });
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = <Text style={styles.emptyStay}>Empty</Text>;

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: 'relative',
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF',
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff',
  },
});

export default ImageBrowserScreen;
