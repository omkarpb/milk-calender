import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { MONTHS, STYLES, DAYS } from '../constants';
import moment from 'moment';

export default function DaysList(props) {
  let { month, year } = props;
  let days = new Date(year, month, 0).getDate();

  let daysList = [];
  for (let i = 0; i < days; i++) {
    daysList.push({ date: i + 1, month: MONTHS[month - 1] })
  }

  function setVisible(date, month) {
    props.navigation.navigate('DayItemDetails', {
      date,
      month,
      year
    });
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={daysList}
        renderItem={({ item }) => {
          const day = DAYS[moment(`${item.date} ${item.month} ${year}`, 'D MMM YYYY').day()]
          // const day = DAYS[new Date(`${item.date} ${item.month} ${year}`)];
          const isWeekend = day === 'Sun' || day === 'Sat';
          const fontColor = isWeekend ? '#ffc0cb' : STYLES.themeColor;

          return (
            <>
              <TouchableHighlight onPress={() => setVisible(item.date, item.month)}>
                <View style={styles.itemContainer}>
                  <View style={styles.dayDetails}>
                    <Text style={{ ...styles.upperRow, color: fontColor }}>{item.date} {item.month}</Text>
                    <Text style={{ ...styles.lowerRow, color: fontColor }}>{day}</Text>
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.oneItem}>Milk 1 ltr</Text>
                    <Text style={styles.oneItem}> Eggs 5 num.</Text>
                  </View>
                  <View style={styles.priceDetails}>
                    <Text style={styles.priceValue}>{'\u20B9'}{50}/-</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </>
          )
        }}
        keyExtractor={(item) => item.date.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 80,
    marginBottom: 50
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: STYLES.themeColor,
    padding: 10,
    flexDirection: 'row',
  },
  itemText: {
  },
  dayDetails: {
    flex: 1,
    backgroundColor: STYLES.backgroundDark,
    padding: 5,
    borderRadius: 3,
    justifyContent: 'space-evenly'
  },
  itemDetails: {
    flex: 4,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between'
  },
  upperRow: {
    fontSize: 15,
    color: 'white',
  },
  lowerRow: {
    fontSize: 12,
    color: STYLES.themeColor,
  },
  oneItem: {
    width: 100,
    margin: 10
  },
  priceDetails: {
    justifyContent: 'center'
  },
  priceValue: {
    fontSize: 25
  }
});
