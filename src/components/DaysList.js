import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, DatePickerIOS, Picker, FlatList, SafeAreaView } from 'react-native';
import { MONTHS, STYLES } from '../constants';

export default function DaysList(props) {
  let { month, year } = props;
  let days = new Date(year, month, 0).getDate();

  let daysList = [];
  for (let i = 0; i < days; i++) {
    daysList.push({ date: i + 1, month: MONTHS[month - 1] })
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={daysList}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.date} {item.month}</Text>
            </View>
          )
        }}
        keyExtractor={(item) => item.date.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80
  },
  item: {
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: STYLES.themeColor,
    padding: 10
  },
  itemText: {
  }
});
