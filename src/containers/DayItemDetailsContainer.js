import React from 'react';
import { View, Text, StyleSheet, Platform, DatePickerIOS, Picker, FlatList, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { STYLES } from '../constants';
import { Icon, Button } from 'react-native-elements';
import { getItems, getItemsDetailsForDay } from '../storage';
import DayItemDetailsScreen from '../components/DayItemDetailsScreen';
import { fetchCurrentItems, fetchItems, removeItem } from '../actions';

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
      deleteDialogVisible: false,
      deleteFromWholeMonthChecked: false,
      deleteItem: {}
    }
    this.deleteDialogToggle = this.deleteDialogToggle.bind(this);
    this.deleteConfirmAction = this.deleteConfirmAction.bind(this);
    this.onPressDeleteFromWholeMonthChecked = this.onPressDeleteFromWholeMonthChecked.bind(this);
  }

  deleteDialogToggle(item) {
    if (item) {
      this.setState({ deleteItem: item });
    }
    this.setState(state => {
      return {
        deleteDialogVisible: !state.deleteDialogVisible
      }
    })
  }

  deleteConfirmAction() {
    this.props.removeItem(this.state.date, this.state.month, this.state.year, this.state.deleteItem.itemId, this.state.deleteFromWholeMonthChecked);
    this.setState(state => {
      return {
        deleteDialogVisible: !state.deleteDialogVisible
      }
    })
  }

  onPressDeleteFromWholeMonthChecked() {
    this.setState(state => {
      return {
        deleteFromWholeMonthChecked: !state.deleteFromWholeMonthChecked
      }
    })
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
          items={currentItems}
          handleAddItemFormClick={(item) => this.props.navigation.navigate('AddItemForm', {
            items, date, month, year, item
          })}
          goBack={() => this.props.navigation.goBack()}
          deleteDialogVisible={this.state.deleteDialogVisible}
          deleteDialogToggle={this.deleteDialogToggle}
          deleteConfirmAction={this.deleteConfirmAction}
          deleteFromWholeMonthChecked={this.state.deleteFromWholeMonthChecked}
          onPressDeleteFromWholeMonthChecked={this.onPressDeleteFromWholeMonthChecked}
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
    fetchItems: () => dispatch(fetchItems()),
    removeItem: (day, month, year, itemId, deleteForWholeMonth) => dispatch(removeItem(day, month, year, itemId, deleteForWholeMonth)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayItemDetailsContainer);