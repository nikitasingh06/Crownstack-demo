/**
 * App Component
 * @author Nikita Singh
 * @description Displays list of songs
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  FlatList,
  View,
  Linking,
} from 'react-native';
import ApiUrls from './src/Utility/ApiUrls';
import {callRemoteMethod} from './src/Utility/WebserviceHandler';
import GlobalStyles from './src/Utility/GlobalStyles';
import CustomLoader from './src/ReusableComponnents/CustomLoader';
import CustomButton from './src/ReusableComponnents/CustomButton';
import CustomText from './src/ReusableComponnents/CustomText';
import CustomImage from './src/ReusableComponnents/CustomImage';
import ImagePath from './src/Utility/ImagePath';
import {renderIf} from './src/Utility/CommonFunctions';
import {STRINGS} from './src/Utility/Constants';
import SongDetailView from './src/ReusableComponnents/SongDetailView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songsList: [],
      isLoading: false,
      isRefreshing: false,
      showDetailModal: false,
      songDetails: {},
    };
  }

  componentDidMount = () => {
    this.fetchApiData();
  };

  fetchApiData = async () => {
    this.setState({isLoading: true});
    let response = await callRemoteMethod(ApiUrls.songsList, 'GET');
    this.setState({
      songsList: response?.results || [],
      isLoading: false,
      isRefreshing: false,
    });
  };

  playSong = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        {renderIf(
          !this.state.isLoading,
          <CustomText style={styles.noDataMessage}>
            {STRINGS.NO_DATA}
          </CustomText>,
        )}
      </View>
    );
  };

  showDetails = item => {
    this.setState(() => ({showDetailModal: true, songDetails: item}));
  };

  renderListItem = ({item}) => {
    return (
      <CustomButton
        style={styles.listItem}
        onPress={() => this.showDetails(item)}>
        <View style={styles.musicIconContainer}>
          {renderIf(
            item.artworkUrl60,
            <>
              <CustomImage
                resizeMode={'contain'}
                style={styles.musicIcon}
                source={{uri: item.artworkUrl100}}
                onLoad={this.onImageLoaded}
              />
            </>,
          )}
        </View>
        <View style={styles.infoContainer}>
          <CustomText style={styles.title}>
            {item.trackName ? item.trackName : STRINGS.NO_TRACK_NAME}
          </CustomText>
          <CustomText style={styles.subtitle}>{item.artistName}</CustomText>
        </View>
        {renderIf(
          item.previewUrl,
          <CustomButton
            style={styles.playbuttonContainer}
            onPress={() => {
              this.playSong(item.previewUrl);
            }}>
            <CustomText style={styles.playButton}>{STRINGS.PLAY}</CustomText>
          </CustomButton>,
        )}
        <View style={styles.rightContainer}>
          <CustomImage
            resizeMode={'contain'}
            style={styles.arrowIcon}
            source={ImagePath.RIGHT_ARROW}
          />
        </View>
      </CustomButton>
    );
  };

  renderList = () => {
    const {songsList} = this.state;
    return (
      <FlatList
        data={songsList}
        extraData={songsList}
        showsVerticalScrollIndicator={false}
        renderItem={this.renderListItem}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={this.renderNoData}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => this.fetchApiData()}
          />
        }
      />
    );
  };

  closeModal = () => {
    this.setState({showDetailModal: false});
  };

  render() {
    const {showDetailModal, songDetails, isLoading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {this.renderList()}
        {renderIf(
          showDetailModal && songDetails,
          <SongDetailView
            showModal={showDetailModal}
            songDetails={songDetails}
            closeModal={this.closeModal}
          />,
        )}
        {renderIf(isLoading, <CustomLoader />)}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  listItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colorCodes.lightGrey,
  },
  musicIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  musicIcon: {
    height: 60,
    width: 60,
    borderRadius: 5,
    backgroundColor: GlobalStyles.colorCodes.clearBlack,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  infoContainer: {
    flex: 1,
  },
  playbuttonContainer: {
    backgroundColor: GlobalStyles.colorCodes.lightGrey,
    padding: 5,
    marginHorizontal: 5,
  },
  playButton: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  rightContainer: {
    justifyContent: 'center',
  },
  arrowIcon: {
    height: 14,
    width: 14,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  noDataMessage: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
