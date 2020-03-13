import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { STYLES, CURRENCY } from '../constants';
import { Icon, Button, CheckBox } from 'react-native-elements';
import DialogCustom from '../elements/DialogCustom';
import LoaderOverlay from '../elements/LoaderOverlay';

export default function DayItemDetailsScreen(props) {

  const { items, totalCost } = props;
  return (
    <View style={styles.main}>
      <ScrollView style={styles.mainContainer}>
        <View>
          {props.loading && <LoaderOverlay />}
          {(!props.loading && items.length === 0) &&
            <View style={styles.noItemsTextContainer}>
              <Text style={styles.textNote}>No Items added yet !</Text>
            </View>
          }

          {(!props.loading && items.length !== 0) && items.map((item, index) => (
            <View style={styles.item} key={index}>
              <View style={styles.itemRow}>
                <Text style={styles.textItemName}>{item.itemName}</Text>
                <Text style={styles.textTotalPrice}>{CURRENCY} {Number(item.price) * Number(item.quantity)} /- </Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.textStyle}>{item.quantity} {item.unit}</Text>
                <Text style={styles.textStyle}>{CURRENCY} {item.price} Per unit/-</Text>
              </View>
              <View style={styles.itemRow}>
                <Icon
                  raised
                  name='edit'
                  type='font-awesome'
                  color={STYLES.themeColor}
                  onPress={() => props.handleAddItemFormClick('edit', item)} />
                <Icon
                  raised
                  name='trash'
                  type='font-awesome'
                  color='#ffc0cb'
                  onPress={() => props.deleteDialogToggle(item)} />
              </View>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={styles.totalCost}>Total Expenses of the day:  {CURRENCY} {totalCost}/-</Text>
          </View>
          <View style={styles.buttonRow}>
            <Button
              title='Add Item'
              onPress={() => props.handleAddItemFormClick('add')}
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </View>
        <DialogCustom
          visible={props.deleteDialogVisible}
          onDismiss={props.deleteDialogToggle}
          onPressAction={props.deleteConfirmAction}
          actionStyle={props.deleteButtonStyle}
          actionText='Remove'
        >
          <Text>Are you sure?</Text>
          <CheckBox
            center
            title='Remove this from whole month'
            checked={props.deleteFromWholeMonthChecked}
            onPress={props.onPressDeleteFromWholeMonthChecked}
          />
        </DialogCustom>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    // flex: 1
  },
  mainContainer: {
    margin: 10,
    marginTop: 30,
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
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: 'gray',
    shadowOffset: { height: 5, width: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'white'
  },
  itemRow: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textItemName: {
    fontSize: 30
  },
  textTotalPrice: {
    fontSize: 30,
    color: STYLES.themeColor
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: STYLES.themeColor,
    margin: 10
  },
  buttonRow: {
    margin: 10
  },
  totalCost: {
    fontSize: 30,
    margin: 10
  },
  noItemsTextContainer: {
    alignItems: 'center',
    height: 200
  },
  textNote: {
    fontSize: 20,
  },
  footer: {
    bottom: 0
  }
});
