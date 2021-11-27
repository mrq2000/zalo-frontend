import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

/**
 * Lấy ra tỉ lệ ảnh
 * @param {String} imgUri uri của ảnh
 * @returns tỉ lệ chiều rộng / chiều cao
 */
const getRatio = (imgUri) => {
  try {
    Image.getSize(imgUri, (width, height) => {
      return width / height;
    });
  } catch {}
  return 1.5;
};
const ImageGridLayout = ({ data }) => {
  if (!data || data.length == 0) {
    return null;
  }

  const renderOneImage = () => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.col}>
          <Image source={{ uri: data[0] }} style={styles.imgStyle} resizeMode="cover" />
        </View>
      </View>
    );
  };

  const renderTwoImage = () => {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.col, styles.marginRight5]}>
          <Image source={{ uri: data[0] }} style={styles.imgStyle} resizeMode="cover" />
        </View>
        <View style={styles.col}>
          <Image source={{ uri: data[1] }} style={styles.imgStyle} resizeMode="cover" />
        </View>
      </View>
    );
  };

  const renderThreeImage = () => {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.col, styles.marginRight5]}>
          <Image source={{ uri: data[0] }} style={styles.imgStyle} resizeMode="cover" />
        </View>
        <View style={styles.col}>
          <View style={[styles.row, styles.marginBottom5]}>
            <Image source={{ uri: data[1] }} style={styles.imgStyle} resizeMode="cover" />
          </View>
          <View style={styles.row}>
            <Image source={{ uri: data[2] }} style={styles.imgStyle} resizeMode="cover" />
          </View>
        </View>
      </View>
    );
  };

  const renderFourImage = () => {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.col, styles.marginRight5]}>
          <Image source={{ uri: data[0] }} style={styles.imgStyle} resizeMode="cover" />
        </View>
        <View style={styles.col}>
          <View style={[styles.row, styles.marginBottom5]}>
            <Image source={{ uri: data[1] }} style={styles.imgStyle} resizeMode="cover" />
          </View>
          <View style={[styles.row, styles.marginBottom5]}>
            <Image source={{ uri: data[2] }} style={styles.imgStyle} resizeMode="cover" />
          </View>
          <View style={styles.row}>
            <Image source={{ uri: data[3] }} style={styles.imgStyle} resizeMode="cover" />
          </View>
        </View>
      </View>
    );
  };

  switch (data.length) {
    case 1:
      return renderOneImage();
    case 2:
      return renderTwoImage();
    case 3:
      return renderThreeImage();
    case 4:
      return renderFourImage();
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    maxHeight: 400,
  },
  col: {
    flex: 1,
  },
  row: {
    flex: 1,
  },
  marginRight5: {
    marginRight: 5,
  },
  marginBottom5: {
    marginBottom: 5,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
  },
});

export default ImageGridLayout;
