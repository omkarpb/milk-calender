import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import {connect} from 'react-redux';
import { MONTHS, STYLES, actions } from '../constants';
import { Icon, Overlay } from 'react-native-elements'
import CurrentMonthInputModal from '../components/CurrentMonthInputModal';
import { addMonth, addYear } from '../actions';

class CurrentMonthInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
    this.setVisible = this.setVisible.bind(this);
    this.selectNextMonth = this.selectNextMonth.bind(this);
    this.selectPreviousMonth = this.selectPreviousMonth.bind(this);
  }

  setVisible() {
    this.setState((state) => {
      return {
        modalVisible: !state.modalVisible
      }
    });
  }
  selectNextMonth() {
    const monthNum = MONTHS.indexOf(this.props.month) + 1;
    const yearNum = Number(this.props.year);
    
    const nextMonth = monthNum === 12 ? 1 : monthNum + 1;
    this.props.addMonth(MONTHS[nextMonth - 1]);
    
    const nextYear = monthNum === 12 ? yearNum + 1 : yearNum;
    this.props.addYear(nextYear.toString());
  }
  selectPreviousMonth() {
    const monthNum = MONTHS.indexOf(this.props.month) + 1;
    const yearNum = Number(this.props.year);

    const prevMonth = monthNum === 1 ? 12 : monthNum - 1;
    this.props.addMonth(MONTHS[prevMonth - 1]);
    
    const prevYear = monthNum === 1 ? yearNum - 1 : yearNum;
    this.props.addYear(prevYear.toString());
  }

  render() {
    const isIOS = Platform.OS === 'ios';

    return (
      <View style={styles.monthInputContainer}>
        <View style={styles.iconContainerLeft}>
          <Icon
            name="chevron-circle-left"
            type="font-awesome"
            color={STYLES.themeColor}
            iconStyle={styles.icon}
            containerStyle={styles.iconContainer}
            onPress={this.selectPreviousMonth}
          />
        </View>
        <TouchableHighlight onPress={this.setVisible} style={styles.touchableArea}>
          <Text style={styles.monthInputText}>{this.props.month} {this.props.year}</Text>
        </TouchableHighlight>
        <View style={styles.iconContainerRight}>
          <Icon
            name="chevron-circle-right"
            type="font-awesome"
            color={STYLES.themeColor}
            iconStyle={styles.icon}
            containerStyle={styles.iconContainer}
            onPress={this.selectNextMonth}
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
            setMonth={this.props.addMonth}
            setYear={this.props.addYear}
            setVisible={this.setVisible}
          />
        </Overlay>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    month: state.currentMonth,
    year: state.currentYear,
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
    borderRadius: 3

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


const mapDispatchToProps = dispatch => {
  return {
    addMonth: (month) => dispatch(addMonth(month)),
    addYear: (year) => dispatch(addYear(year)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentMonthInput);

