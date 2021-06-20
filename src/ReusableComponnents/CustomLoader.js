/**
 * @author Nikita Singh
 * @description Custom Loader
 * @flow
 */
import React from 'react';
import {StyleSheet, View, Dimensions, ActivityIndicator} from 'react-native';
import GlobalStyles from '../Utility/GlobalStyles';
const {width, height} = Dimensions.get('window');

const CustomLoader = () => (
  <View style={styles.loaderView}>
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={'large'} color={GlobalStyles.colorCodes.black} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  loaderView: {
    backgroundColor: GlobalStyles.colorCodes.clearBlack,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1000,
  },
  loaderContainer: {
    height: 100,
    width: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colorCodes.white,
    borderRadius: 14,
  },
});

export default CustomLoader;
