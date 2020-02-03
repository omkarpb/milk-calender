import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { MONTHS, STYLES } from '../constants';
import { Icon } from 'react-native-elements'
import CurrentMonthInputModal from './CurrentMonthInputModal';

export default function CurrentMonthInput(props) {
  const [modalVisible, setModalVisible] = useState(false)
  function setVisible() {
    setModalVisible(!modalVisible);
  }
  return (
    <View style={styles.monthInputContainer}>
      <TouchableHighlight onPress={setVisible} style={styles.touchableArea}>
        <Text style={styles.monthInputText}>{MONTHS[props.selectedMonth - 1]} {props.selectedYear}</Text>
      </TouchableHighlight>
      <View style={styles.iconContainer}>
        <Icon
          name="plus"
          type="font-awesome"
          color={STYLES.themeColor}
          iconStyle={styles.icon}
          containerStyle={styles.iconContainer}
        />
      </View>
      <CurrentMonthInputModal
        visible={modalVisible}
        selectedMonth={props.selectedMonth}
        selectedYear={props.selectedYear}
        setSelectedMonth={props.setSelectedMonth}
        setSelectedYear={props.setSelectedYear}
        setVisible={setVisible}
      />
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
    backgroundColor: '#333',
    flex: 1,
    marginLeft: 10,
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
    padding:7,
  },
});