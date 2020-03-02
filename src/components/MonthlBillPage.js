import React from 'react';
import { View, Text, StyleSheet, Platform, DatePickerIOS, Picker, FlatList, SafeAreaView, TouchableHighlight, TextInput, ScrollView } from 'react-native';
import { STYLES, CURRENCY } from '../constants';
import { Icon, Button, CheckBox } from 'react-native-elements';

export default class MonthBillPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('month')} ${navigation.getParam('year')} Bill`
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      monthlySums: props.navigation.getParam('monthlySums')
    }
  }

  render() {
    const { monthlySums } = this.state;
    return (
      <View>
        {(monthlySums.itemsCost && monthlySums.itemsCost.length > 0) && monthlySums.itemsCost.map((itemDetails) => {

          if (itemDetails.itemQuantity > 0) {
            return (
              <View style={styles.item} key={itemDetails.itemId}>
                <View style={styles.itemRow}>
                  <Text style={styles.textItemName}>{itemDetails.itemName}</Text>
                  <Text style={styles.textTotalPrice}>{CURRENCY} {itemDetails.itemCost} /- </Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.textStyle}>{itemDetails.itemQuantity} {itemDetails.unit}</Text>
                  <Text style={styles.textStyle}>{CURRENCY} {itemDetails.price} /- Per unit</Text>
                </View>
              </View>
            )
          }
        })}
        <View style={styles.totalCostContainer}>
          <Text style={styles.totalCost}>Total {CURRENCY} {monthlySums.totalCost} /-</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: STYLES.themeColor,
    padding: 10,

  },
  itemRow: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textItemName: {
    fontSize: 25
  },
  textTotalPrice: {
    fontSize: 25,
    color: STYLES.themeColor
  },
  textStyle: {
    fontSize: 20,
  },
  totalCost: {
    fontSize: 30,
    margin: 10
  },
  totalCostContainer: {
    alignItems: 'center'
  }
})