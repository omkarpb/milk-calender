import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';

export default function PickerCustom(props) {
  return (
    <RNPickerSelect
      placeholder={{}}
      value={props.value}
      onValueChange={(itemValue, itemIndex) =>
        setDateRange(itemValue)
      }
      items={props.items}
      useNativeAndroidPickerStyle={false}
      style={pickerSelectStyles}
    />
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 3,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
