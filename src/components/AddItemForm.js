import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Button, CheckBox } from 'react-native-elements'
import { addOrReplaceItem, addDayEntry } from '../storage';
import { STYLES } from '../constants';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default class AddItemForm extends React.Component {
  static navigationOptions = {
    title: 'Add Item',
  };
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      price: '',
      quantity: '',
      unit: '',
      dateRange: 'Apply only for this day',
      items: props.navigation.getParam('items'),
      date: props.navigation.getParam('date'),
      month: props.navigation.getParam('month'),
      year: props.navigation.getParam('year'),
      itemNames: [],
      itemNameDialogVisible: false,
      applyItemChecked: false, // Apply for whole month
      selectedItemId: ''
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onItemNameSelect = this.onItemNameSelect.bind(this);
    this.onDialogDismiss = this.onDialogDismiss.bind(this);
    this.saveItem = this.saveItem.bind(this);
  }
  onChangeValue(key, text) {
    this.setState({ [key]: text });
  }
  componentDidMount() {
    const items = this.state.items;
    let itemNames = items && items.length > 0 && items.map(item => {
      return {
        id: item.itemId,
        name: item.itemName
      }
    });
    if(!itemNames) {
      itemNames = [];
    }
    this.setState({itemNames})
  }
  onItemNameSelect(item) {
    if(item.id === 1) {
      this.setState({itemNameDialogVisible: true, })
    } else {
      this.setState({selectedItemId: item.id, itemName: item.name})
    }
  }
  onDialogDismiss() {
    this.setState({itemNameDialogVisible: false})
  }
  async saveItem() {
    const newItemId = await addOrReplaceItem({
      itemName: this.state.itemName,
      unit: this.state.unit,
      price: this.state.price,
    });
    await addDayEntry(this.state.date, this.state.month, this.state.year, newItemId, this.state.quantity);
    this.setState({
      itemName: '',
      price: '',
      quantity: '',
      unit: ''
    })
  }
  render() {
    return (
      <View style={styles.formContainer}>
        <Text>Name</Text>
        <SearchableDropdown 
          items={this.state.itemNames}
          onItemSelect={this.onItemNameSelect}
          itemStyle={styles.dropdownItem}
          itemsContainerStyle={{ maxHeight: 140 }}
          resetValue={false}
          onTextChange={(text) => this.onChangeValue('itemName', text)}
          textInputProps={
            {
              placeholder: 'Item name eg. Milk',
              underlineColorAndroid: "transparent",
              style: styles.textControl,
              value:this.state.itemName
            }
          }
          listProps={
            {
              nestedScrollEnabled: true,
            }
          }/>
        <Text>Price</Text>
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('price', text)}
          value={this.state.price.toString()}
          placeholder='Price per unit e.g. 45' />
        <Text>Quantity</Text>
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('quantity', text)}
          value={this.state.quantity.toString()}
          placeholder='Quantity'
        />
        <Text>Unit</Text>
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('unit', text)}
          value={this.state.unit}
          placeholder='Unit e.g. Ltr'
        />
        <CheckBox
          center
          title='Apply this for whole month'
          checked={this.state.applyItemChecked}
          onPress={() => this.setState({applyItemChecked: !this.state.applyItemChecked})}
        />
        <View style={styles.buttonRow}>
          <Button
            title='Save'
            buttonStyle={styles.button}
            icon={{name: 'save', type:'font-awesome', color: '#fff'}}
            onPress={this.saveItem} />
          <Button 
            title='Cancel'
            onPress={() => this.props.navigation.goBack()}
            buttonStyle={styles.button} />
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
  },
  dropdownItem: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
  }
});
