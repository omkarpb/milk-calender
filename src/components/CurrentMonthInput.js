import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { MONTHS, STYLES } from '../constants';
import { Icon, Overlay } from 'react-native-elements'
import CurrentMonthInputModal from './CurrentMonthInputModal';

export default function CurrentMonthInput(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const isIOS = Platform.OS === 'ios';

  function setVisible() {
    setModalVisible(!modalVisible);
  }
  function selectNextMonth() {
    const nextMonth = props.selectedMonth === 12 ? 1 : props.selectedMonth + 1;
    props.setSelectedMonth(nextMonth)
    const nextYear = props.selectedMonth === 12 ? props.selectedYear + 1 : props.selectedYear;
    props.setSelectedYear(nextYear);
  }
  function selectPreviousMonth() {
    const prevMonth = props.selectedMonth === 1 ? 12 : props.selectedMonth - 1;
    props.setSelectedMonth(prevMonth)
    const prevYear = props.selectedMonth === 1 ? props.selectedYear - 1 : props.selectedYear;
    props.setSelectedYear(prevYear);
  }
  return (
    <View style={styles.monthInputContainer}>
      <View style={styles.iconContainerLeft}>
        <Icon
          name="chevron-circle-left"
          type="font-awesome"
          color={STYLES.themeColor}
          iconStyle={styles.icon}
          containerStyle={styles.iconContainer}
          onPress={selectPreviousMonth}
        />
      </View>
      <TouchableHighlight onPress={setVisible} style={styles.touchableArea}>
        <Text style={styles.monthInputText}>{MONTHS[props.selectedMonth - 1]} {props.selectedYear}</Text>
      </TouchableHighlight>
      <View style={styles.iconContainerRight}>
        <Icon
          name="chevron-circle-right"
          type="font-awesome"
          color={STYLES.themeColor}
          iconStyle={styles.icon}
          containerStyle={styles.iconContainer}
          onPress={selectNextMonth}
        />
      </View>
      <Overlay
        isVisible={modalVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        width="auto"
        height={isIOS ? 'auto' : 300}
        onBackdropPress={() => setVisible()}
      >
        <CurrentMonthInputModal
          selectedMonth={props.selectedMonth}
          selectedYear={props.selectedYear}
          setSelectedMonth={props.setSelectedMonth}
          setSelectedYear={props.setSelectedYear}
          setVisible={setVisible}
        />
      </Overlay>
    </View>
  )
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
