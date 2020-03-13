import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import {connect} from 'react-redux';
import { MONTHS, STYLES, actions } from '../constants';
import { Icon, Overlay } from 'react-native-elements'
import CurrentMonthInputModal from '../components/CurrentMonthInputModal';
import { setLoadingStatus } from '../actions';
import LoaderOverlay from '../elements/LoaderOverlay';

export default class CurrentMonthInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
    this.setVisible = this.setVisible.bind(this);
  }

  setVisible() {
    this.setState((state) => {
      return {
        modalVisible: !state.modalVisible
      }
    });
  }

  render() {
    const isIOS = Platform.OS === 'ios';

    // if (this.props.loading) {
    //   console.log('Inside loading');
    //   return (
    //     <LoaderOverlay />
    //   )
    // } 
    return (
      <View style={styles.monthInputContainer}>
        <View style={styles.iconContainerLeft}>
          <Icon
            name="chevron-circle-left"
            type="font-awesome"
            color={STYLES.themeColor}
            iconStyle={styles.icon}
            containerStyle={styles.iconContainer}
            onPress={this.props.selectPreviousMonth}
          />
        </View>
        <TouchableHighlight onPress={this.setVisible} style={styles.touchableArea}>
          <View>
            {this.props.loading && <LoaderOverlay /> }
            {!this.props.loading && <Text style={styles.monthInputText}>{this.props.month} {this.props.year}</Text>}
          </View>
        </TouchableHighlight>
        <View style={styles.iconContainerRight}>
          <Icon
            name="chevron-circle-right"
            type="font-awesome"
            color={STYLES.themeColor}
            iconStyle={styles.icon}
            containerStyle={styles.iconContainer}
            onPress={this.props.selectNextMonth}
          />
        </View>
        <Overlay
          isVisible={this.state.modalVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          width="auto"
          height={isIOS ? 'auto' : 300}
          onBackdropPress={() => this.setVisible()}
        >
          <CurrentMonthInputModal
            month={this.props.month}
            year={this.props.year}
            handleSelect={this.props.handleMonthYearSelect}
            setVisible={this.setVisible}
          />
        </Overlay>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  monthInputContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  touchableArea: {
    height: 50,
    backgroundColor: STYLES.backgroundDark,
    flex: 1,
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOffset: { height: 5, width: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  monthInputText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: STYLES.themeColor
  },
  iconContainer: {
    height: 40,
    padding: 7,
    margin: 10
  },
});
