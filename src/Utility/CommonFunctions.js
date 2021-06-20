/**
 * Common Functions Utility
 * @author Nikita Singh
 * @flow
 */

import {Alert} from 'react-native';

export function customAlert(message = 'Demo App', callback = () => {}) {
  setTimeout(() => {
    Alert.alert('Demo App', message, [{text: 'OK', onPress: callback}], {
      cancelable: false,
    });
  }, 0);
}

export function renderIf(condition, content) {
  if (condition) {
    return content;
  }
  return null;
}

