import React from 'react';
import { View, Text, StyleSheet, Platform, DatePickerIOS, Picker, FlatList, SafeAreaView, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { STYLES, MONTHS } from '../constants';
import { Icon, Button } from 'react-native-elements';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from 'moment';
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
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
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

  componentDidUpdate(prevProp, prevState) {
    if (prevState.date !== this.state.date) {
      this.props.fetchItems();
      this.props.fetchCurrentItems(this.state.date, this.state.month, this.state.year);
    }
  }
  calculateTotalCost(items) {
    return items.reduce((acc, curr) => {
      return acc + Number(curr.price) * Number(curr.quantity);
    }, 0)
  }
  onSwipeLeft(gestureState) {
    //next
    console.log('Swiped left')
    const nextDay = moment(this.state.date + '-' + this.state.month + '-' + this.state.year , 'DD-MMM-YYYY').add(1, 'd');
    this.setState({
      date: nextDay.date().toString(),
      month: MONTHS[nextDay.month()],
      year: nextDay.year().toString()
    });
  }
 
  onSwipeRight(gestureState) {
    //previous
    console.log('Swiped right')
    const prevDay = moment(this.state.date + '-' + this.state.month + '-' + this.state.year , 'DD-MMM-YYYY').subtract(1, 'd');
    this.setState({
      date: prevDay.date().toString(),
      month: MONTHS[prevDay.month()],
      year: prevDay.year().toString()
    });

  }
  render() {
    const { date, month, year } = this.state;
    const { currentItems, items } = this.props;

    console.log('date, month, year', date, month, year)
    const cost = this.calculateTotalCost(currentItems);

    return (
      <View>
        <GestureRecognizer
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          }}
        >
        <DayItemDetailsScreen 
          items={currentItems}
          handleAddItemFormClick={(action, item) => this.props.navigation.navigate('AddItemForm', {
            items, date, month, year, item, action
          })}
          goBack={() => this.props.navigation.goBack()}
          deleteDialogVisible={this.state.deleteDialogVisible}
          deleteDialogToggle={this.deleteDialogToggle}
          deleteConfirmAction={this.deleteConfirmAction}
          deleteFromWholeMonthChecked={this.state.deleteFromWholeMonthChecked}
          onPressDeleteFromWholeMonthChecked={this.onPressDeleteFromWholeMonthChecked}
          totalCost={cost}
          loading={this.props.loading}
        />
        </GestureRecognizer>
      </View>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    currentItems: state.currentItems,
    items: state.items,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentItems: (day, month, year) => dispatch(fetchCurrentItems(day, month, year)),
    fetchItems: () => dispatch(fetchItems()),
    removeItem: (day, month, year, itemId, deleteForWholeMonth) => dispatch(removeItem(day, month, year, itemId, deleteForWholeMonth)) ,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayItemDetailsContainer);