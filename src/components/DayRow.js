import React from 'react'
import { View, Text, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import {CURRENCY, STYLES} from '../constants';

export default function DayRow(props) {
  const {entries, day, items} = props;

  let totalCost = 0;

  const entry = entries.find(entry => entry.day === day.toString());

  if (entry) {
    totalCost = entry.items.reduce((acc, value) => {
      const item = items.find(item => item.itemId === value.itemId);
      if (item) {
        return acc + (Number(item.price) * Number(value.quantity));
      }
      return acc;
    }, 0);
  }
  return (
    <>
      <View style={styles.itemDetails}>
        {(!!entry && entry.items.length > 0) && entry.items.map(element => {
            const currentItem = items.find(value => value.itemId === element.itemId) || {};
            return (
              <Chip style={styles.chipStyle} key={element.itemId}>
                {currentItem.itemName} <Text style={styles.chipQuantity}>{element.quantity}</Text> {currentItem.unit}
              </Chip>
            )
          })
        }
        {(!entry || (!!entry && entry.items.length === 0)) && <Text style={styles.oneItem}>No items added!</Text>}
      </View>
      <View style={styles.priceDetails}>
        <Text style={styles.priceValue}>{CURRENCY}{totalCost}/-</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  itemDetails: {
    flex: 4,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between'
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
  },
  chipStyle: {
    margin: 5
  },
  wholeRow: {
    // marginBottom: 10
  },
  chipQuantity: {
    fontWeight: 'bold'
  }
})