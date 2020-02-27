import React from 'react';
import { View, Text, StyleSheet, Platform, DatePickerIOS, Picker, FlatList, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import { STYLES } from '../constants';
import { Icon, Button } from 'react-native-elements';
import { getItems } from '../storage';

export default function DayItemDetailsScreen(props) {

  const { date, month, year, items = [] } = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.itemList}>
        {(items.length === 0) && <Text>Loading...</Text>}
        {(items.length !== 0) && items.map((item, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.textStyle}>{item.itemName}</Text>
            <Text style={styles.textStyle}>{item.price}</Text>
            <Text style={styles.textStyle}>{item.quantity}</Text>
            <Text style={styles.textStyle}>{item.unit}</Text>
            <Icon
              raised
              name='edit'
              type='font-awesome'
              color={STYLES.themeColor}
              onPress={() => props.handleAddItemFormClick(item)} />
            <Icon
              raised
              name='trash'
              type='font-awesome'
              color='#ffc0cb'
              onPress={() => console.log('hello')} />
          </View>
        ))}
      </View>
      <View>
        <Button
          title='Add Item'
          icon={<Icon name="plus" type="font-awesome" />}
          iconRight={true}
          onPress={() => props.handleAddItemFormClick()}
        />
        <Button title='Save'></Button>
        <Button title='Cancel' onPress={props.goBack}></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    marginTop: 30
  },
  headerContainer: {},
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: STYLES.themeColor
  },
  textInput: {
    fontSize: 20,
    borderColor: 'gray',
    borderBottomWidth: 1
  },
  textStyle: {
    fontSize: 20,
  },
  dateRangePicker: {
    width: 200,
    height: 50,
    fontSize: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});
