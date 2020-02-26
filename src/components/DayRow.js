import React from 'react'
import { View, Text, StyleSheet} from 'react-native';

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
        {(entries && entries.length > 0) && entries.map((dayItem, index) => {
          if (dayItem.day === day.toString()) {
            return dayItem.items.map(element => {
              const currentItem = items.find(value => value.itemId === element.itemId);
              if (currentItem) {
                return (<Text style={styles.oneItem} key={element.itemId}>{currentItem.itemName} {element.quantity} {currentItem.unit}</Text>)
              } else {
                return null;
              }
            });
          }
        })}
        {(!entries || entries.length === 0) &&
          <Text style={styles.oneItem}>No items added yet!</Text>
        }
      </View>
      <View style={styles.priceDetails}>
        <Text style={styles.priceValue}>{'\u20B9'}{totalCost}/-</Text>
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
  }
})