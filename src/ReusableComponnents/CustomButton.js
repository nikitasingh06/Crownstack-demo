/**
 * Custom Buttons Wrapper
 * @author Nikita Singh
 * @description Custom Buttons Wrapper over Touchable Opacity;
 * @flow
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';

const CustomButton = props => (
  <TouchableOpacity accessible activeOpacity={0.8} {...props}>
    {props.children}
  </TouchableOpacity>
);

export default CustomButton;
