/**
 * SongDetailView Component
 * @author Nikita Singh
 * @description Song Details
 * @flow
 */
import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import GlobalStyles from '../Utility/GlobalStyles';
import {renderIf} from '../Utility/CommonFunctions';

const SongDetailView = props => (
  <Modal animationType="fade" transparent={true} visible={props.showModal}>
    <TouchableWithoutFeedback onPress={() => props.closeModal()}>
      <View style={styles.modalContainer}>
        <View style={styles.detailContainer}>
          {renderIf(
            props.songDetails?.artworkUrl100,
            <CustomImage
              resizeMode={'contain'}
              style={styles.musicIcon}
              source={{uri: props.songDetails?.artworkUrl100}}
            />,
          )}
          <CustomText style={styles.title}>
            {props.songDetails?.artistName}
          </CustomText>
          <CustomText style={styles.title}>
            {props.songDetails?.primaryGenreName}
          </CustomText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colorCodes.clearBlack,
  },
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colorCodes.white,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.6,
    padding: 20,
  },
  musicIcon: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 5,
    borderColor: GlobalStyles.colorCodes.lightGrey,
    borderWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SongDetailView;
