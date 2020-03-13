import React from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, UIManager, Animated, Keyboard } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { insertItemAndEntry } from '../actions';
import { addOrReplaceItem, addDayEntry, getItem, addDataEntriesForWholeMonth } from '../storage';
import { STYLES, UNITS } from '../constants';
import SearchableDropdown from 'react-native-searchable-dropdown';
const { State: TextInputState } = TextInput;

class AddItemForm extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('action') === 'edit' ? 'Edit Item' : 'Add Item',
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      price: '',
      quantity: '',
      unit: '',
      itemId: '',
      items: props.navigation.getParam('items'),
      date: props.navigation.getParam('date'),
      month: props.navigation.getParam('month'),
      year: props.navigation.getParam('year'),
      itemNames: [],
      itemNameDialogVisible: false,
      applyWholeMonthChecked: false, // Apply for whole month
      selectedItemId: '',
      item: props.navigation.getParam('item'),
      unitsList: [],
      validity: {
        itemNameError: false,
        priceError: false,
        quantitu: false
      },
      shift: new Animated.Value(0),
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.onSelectItemName = this.onSelectItemName.bind(this);
  }

  onChangeValue(key, text, validityProp) {
    this.setState({ [key]: text });
    if(validityProp !== undefined) {
      this.setState({
        validity: {
          [validityProp]: text.trim().length === 0
        }
      })
    }
  }

  componentDidMount() {
    const items = this.state.items;
    let itemNames = items && items.length > 0 && items.map(item => {
      return {
        id: item.itemId,
        name: item.itemName
      }
    });
    if (!itemNames) {
      itemNames = [];
    }

    const unitsList = UNITS.map((unit, index) => {
      return {
        id: index,
        name: unit
      }
    })

    this.setState({ itemNames, unitsList });
    if (this.state.item) {
      const { itemName, price, unit, quantity, itemId } = this.state.item;
      this.setState({
        itemName,
        price,
        unit,
        quantity,
        itemId
      })
    }

    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);

  }

  async saveItem() {
    const { itemName, unit, price, quantity, month, year, applyWholeMonthChecked, date, itemId } = this.state;
    this.setState({
      validity: {
        itemNameError: itemName.trim() === "",
        priceError: price.trim() === "",
        quantityError: quantity.trim() === ""
      }
    });

    let unitDefault = unit.trim() === "" ? 'unit' : unit;

    if (itemName.trim() !== "" && price.trim() !== "" && quantity.trim() !== "") {
      this.props.insertItemAndEntry(itemName, unitDefault, price, quantity, month, year, applyWholeMonthChecked, date, itemId);

      this.setState({
        itemName: '',
        price: '',
        quantity: '',
        unit: ''
      });

      this.props.navigation.goBack();
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
  async onSelectItemName(item) {
    const itemDetails = await getItem(item.id);
    if (itemDetails) {
      this.setState({
        itemName: itemDetails.itemName,
        price: itemDetails.price,
        unit: itemDetails.unit,
        itemId: itemDetails.itemId
      });
    }
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }

  render() {
    const { shift } = this.state;

    return (
      <Animated.View style={[styles.formContainer, { transform: [{translateY: shift}] }]}>
        <Text>Name</Text>
        <SearchableDropdown
          items={this.state.itemNames}
          itemStyle={styles.dropdownItem}
          itemsContainerStyle={{ maxHeight: 140 }}
          resetValue={false}
          onTextChange={(text) => this.onChangeValue('itemName', text, 'itemNameError')}
          onItemSelect={(item) => this.onSelectItemName(item)}
          textInputProps={
            {
              placeholder: 'Item name eg. Milk',
              underlineColorAndroid: "transparent",
              style: styles.textControl,
              value: this.state.itemName,
              maxLength: 20,
              autoCapitalize: 'words'
            }
          }
          listProps={
            {
              nestedScrollEnabled: true,
            }
          } />
        {!!this.state.validity.itemNameError && <Text style={styles.errorText}>Please enter item name</Text>}
        <Text>Price</Text>
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('price', text, 'priceError')}
          value={this.state.price.toString()}
          placeholder='Price per unit e.g. 45'
          keyboardType='numeric' />
        {!!this.state.validity.priceError && <Text style={styles.errorText}>Please enter price</Text>}

        <Text>Quantity</Text>
        <TextInput
          style={styles.textControl}
          onChangeText={text => this.onChangeValue('quantity', text, 'quantityError')}
          value={this.state.quantity.toString()}
          placeholder='Quantity'
          keyboardType='numeric'
        />
        {!!this.state.validity.quantityError && <Text style={styles.errorText}>Please enter quantity</Text>}

        <Text>Unit</Text>
        <SearchableDropdown
          items={this.state.unitsList}
          itemStyle={styles.dropdownItem}
          itemsContainerStyle={{ maxHeight: 140 }}
          resetValue={false}
          onTextChange={(text) => this.onChangeValue('unit', text)}
          onItemSelect={(item) => this.onChangeValue('unit', item.name)}
          textInputProps={
            {
              placeholder: 'Unit',
              underlineColorAndroid: "transparent",
              style: styles.textControl,
              value: this.state.unit
            }
          }
          listProps={
            {
              nestedScrollEnabled: true,
            }
          } />
        <CheckBox
          center
          title='Apply this for whole month'
          checked={this.state.applyWholeMonthChecked}
          onPress={() => this.setState({ applyWholeMonthChecked: !this.state.applyWholeMonthChecked })}
        />
        <View style={styles.buttonRow}>
          <Button
            title='Save'
            buttonStyle={styles.button}
            icon={{ name: 'save', type: 'font-awesome', color: '#fff' }}
            onPress={this.saveItem} />
          <Button
            title='Cancel'
            onPress={() => this.props.navigation.goBack()}
            buttonStyle={styles.button} />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 50,
  },
  textControl: {
    height: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    // padding: 10
  },
  button: {
    padding: 10,
    backgroundColor: STYLES.themeColor,
    width: 100
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10
  },
  dropdownItem: {
    padding: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    backgroundColor: '#eee',
    margin: 5,
    borderRadius: 3
  },
  errorText: {
    color: 'orange'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    insertItemAndEntry: (itemName, unit, price, quantity, month, year, applyWholeMonthChecked, date, itemId) => dispatch(insertItemAndEntry(itemName, unit, price, quantity, month, year, applyWholeMonthChecked, date, itemId))
  }
}
export default connect(null, mapDispatchToProps)(AddItemForm);
