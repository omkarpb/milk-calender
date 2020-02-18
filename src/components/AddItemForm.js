import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { STYLES } from '../constants';
import { Button } from 'react-native-elements'
import { addItem, getItems } from '../storage';
import PickerCustom from '../elements/PickerCustom';

export default class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      price: '',
      quantity: '',
      unit: '',
      dateRange: 'Apply only for this day'
    }
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  onChangeValue(key, text) {
    this.setState({ [key]: text });
  }
  render() {
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('item', text)}
          value={this.state.item}
          placeholder='Item name e.g. Milk'
          autoCapitalize='words'/>
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('price', text)}
          value={this.state.price.toString()}
          placeholder='Price per unit e.g. 45' />
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('quantity', text)}
          value={this.state.quantity.toString()}
          placeholder='Quantity'
        />
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('unit', text)}
          value={this.state.unit}
          placeholder='Unit e.g. Ltr'
        />
        <PickerCustom 
          value={this.state.dateRange}
          items={[
            {label:"Apply only for this day", value:"Apply only for this day"},
            {label:"Apply for whole month", value:"Apply for whole month"},
            {label:"Select range", value:"Select range"},
          ]}
        />
        <View style={styles.buttonRow}>
          <Button 
            title='Add'
            onPress={() => {
              addItem({ name: this.state.item.toLowerCase(), price: this.state.price, quantity: this.state.quantity, unit: this.state.unit})
              .then(() => {
                // this.props.navigation.navigate('Home');
                this.setState({ item: '', price: '', quantity: '', unit: '' })
                return getItems();
              }).then(items => {
                console.log('Items ', items);
              }).catch(err => {
                console.error(err);
            });
            }
          }
            color={STYLES.themeColor}
            buttonStyle={styles.button}
            icon={{name: 'save', type:'font-awesome', color: '#fff'}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
    width: 300
  },
  textControl: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },
  button: {
    padding: 10,
    backgroundColor: STYLES.themeColor,
    width: 100
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});

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