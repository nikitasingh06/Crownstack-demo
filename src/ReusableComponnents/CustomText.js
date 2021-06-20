/**
 * Custom Text Wrapper
 * @author Nikita Singh
 * @description Custom Text Wrapper of the Application;
 * @flow
 */

import React from 'react';
import {Text} from 'react-native';

const CustomText = props => (
  <Text {...props} style={props.style}>
    {props.children}
  </Text>
);

export default CustomText;
