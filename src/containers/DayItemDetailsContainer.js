import React from 'react';
import { View, Text, StyleSheet, Platform, DatePickerIOS, Picker, FlatList, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { STYLES } from '../constants';
import { Icon, Button } from 'react-native-elements';
import { getItems, getItemsDetailsForDay } from '../storage';
import DayItemDetailsScreen from '../components/DayItemDetailsScreen';
import { fetchCurrentItems, fetchItems } from '../actions';

class DayItemDetailsContainer extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('date')} ${navigation.getParam('month')}`
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      date: props.navigation.getParam('date'),
      month: props.navigation.getParam('month'),
      year: props.navigation.getParam('year'),
    }
  }
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchCurrentItems(this.state.date, this.state.month, this.state.year);
  }
  render() {
    const { date, month, year } = this.state;
    const { currentItems, items } = this.props;
    return (
      <View>
        <DayItemDetailsScreen 
          date={date}
          month={month}
          year={year}
          items={currentItems}
          handleAddItemFormClick={() => this.props.navigation.navigate('AddItemForm', {
            items: items,
            date: date,
            month: month,
            year: year
          })}
          goBack={() => this.props.navigation.goBack()}
        />
      </View>
    )

  }
}
const mapStateToProps = (state) => {
  return {
    currentItems: state.currentItems,
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentItems: (day, month, year) => dispatch(fetchCurrentItems(day, month, year)),
    fetchItems: () => dispatch(fetchItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayItemDetailsContainer);