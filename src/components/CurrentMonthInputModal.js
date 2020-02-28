import React, { useState } from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet, Picker, Button, Dimensions, Platform } from 'react-native';
import { MONTHS, STYLES } from '../constants';
import { getYearsList } from '../utilities';

export default function CurrentMonthInputModal(props) {
  const [month, setMonth] = useState(props.month);
  const [year, setYear] = useState(props.year);
  
  return (
    <View style={styles.modal}>
      <View style={styles.monthInput}>
        <Picker
          selectedValue={month}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setMonth(itemValue);
          }}>
          {MONTHS.map((element, index) => <Picker.Item label={element} value={MONTHS[index]} key={index} />)}
        </Picker>
        <Picker
          selectedValue={year}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setYear(itemValue);
          }}>
          {getYearsList().map((element, index) => <Picker.Item label={element.toString()} value={element.toString()} key={index} />)}
        </Picker>
      </View>
      <View style={styles.controls}>
        <Button
          title='Select'
          onPress={() => {
            props.handleSelect(month, year);
            props.setVisible(!props.visible);
          }}
          color={STYLES.themeColor} />
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
