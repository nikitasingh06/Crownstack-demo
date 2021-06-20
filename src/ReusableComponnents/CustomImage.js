/**
 * Custom Image Component
 * @author Nikita Singh
 * @description Custom Image Component of the Application
 * @flow
 */

import React from 'react';
import {Image} from 'react-native';

const CustomImage = props => (
  <Image resizeMode={'contain'} style={props.style} {...props}>
    {props.children}
  </Image>
);

export default CustomImage;
