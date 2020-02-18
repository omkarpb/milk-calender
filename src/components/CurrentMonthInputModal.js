import React, { useState } from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet, Picker, Button, Dimensions, Platform } from 'react-native';
import { MONTHS, STYLES } from '../constants';
import { getYearsList } from '../utilities';

export default function CurrentMonthInputModal(props) {
  return (
    
      <View style={styles.modal}>
        <View style={styles.monthInput}>
          <Picker
            selectedValue={props.selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              props.setSelectedMonth(itemValue);
            }}>
            {MONTHS.map((month, index) => <Picker.Item label={month} value={index + 1} key={index} />)}
          </Picker>
          <Picker
            selectedValue={props.selectedYear}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              props.setSelectedYear(itemValue);
            }}>
            {getYearsList().map((year, index) => <Picker.Item label={year.toString()} value={year} key={index} />)}
          </Picker>
        </View>
        <View style={styles.controls}>
          <Button title='Select' onPress={() => props.setVisible(!props.visible)} color={STYLES.themeColor} />
          <Button title='Cancel' onPress={() => props.setVisible(!props.visible)} color={STYLES.themeColor} />
        </View>
      </View>
  )
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  modal: {
    // justifyContent: 'center',
  },
  monthInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: isIOS ? 'center' : 'flex-end',
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  picker: {
    height: 100,
    width: 150,
    margin: 10
  }
});
