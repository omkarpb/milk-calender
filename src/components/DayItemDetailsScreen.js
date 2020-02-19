import React from 'react';
import { View, Text, StyleSheet, Platform, DatePickerIOS, Picker, FlatList, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import { STYLES } from '../constants';
import { Icon, Button } from 'react-native-elements';
import { getItems } from '../storage';

export default class DayItemDetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('date')} ${navigation.getParam('month')}`
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      month: '',
      items: []
    }
  }

  async componentDidMount() {
    this.setState({
      date: this.props.navigation.getParam('date'),
      month: this.props.navigation.getParam('month'),
      year: this.props.navigation.getParam('year')
    });
    let items = await getItems();
    if (items === null) {
      items = []
    }
    this.setState({
      items
    })
  }


  render() {
    const { date, month, year, items = [] } = this.state;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.itemList}>
          {(items.length === 0) && <Text>Loading...</Text>}
          {(items.length !== 0) && items.map((item, index) => (
            <View style={styles.item} key={index}>
              <Text style={styles.textStyle}>{item.itemName}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setQuantity(Number(text))}
                value={item.quantity}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={text => setQuantity(Number(text))}
                value={item.price}
              />
              <Text style={styles.textStyle}>{item.unit}</Text>
              <Icon
                raised
                name='save'
                type='font-awesome'
                color='#00f'
                onPress={() => console.log('hello')} />
              <Icon
                raised
                name='trash'
                type='font-awesome'
                color='#f00'
                onPress={() => console.log('hello')} />
            </View>
          ))}
        </View>
        <View>
          <Button
            title='Add Item'
            icon={<Icon name="plus" type="font-awesome" />}
            iconRight={true}
            onPress={() => this.props.navigation.navigate('AddItemForm', {
              items,
              date,
              month,
              year
            })}
          />
          <Button title='Save'></Button>
          <Button title='Cancel' onPress={() => this.props.navigation.goBack()}></Button>
        </View>
      </View>
    )
  }
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
