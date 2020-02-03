import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CurrentMonthInput from './components/CurrentMonthInput';
import DaysList from './components/DaysList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Milk Calender',
  };

  constructor(props) {
    super(props);

    let currentDate = new Date();

    this.state = {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear()
    };

    this.setMonth = this.setMonth.bind(this);
    this.setYear = this.setYear.bind(this);
  }
  setMonth(month) {
    this.setState({month: month});
  }
  setYear(year) {
    this.setState({year: year});
  }
  render() {
    console.log('Month ', this.state.month, 'Year', this.state.year);
    return (
      <SafeAreaView style={styles.container}>
          <CurrentMonthInput selectedMonth={this.state.month} selectedYear={this.state.year} setSelectedMonth={this.setMonth} setSelectedYear={this.setYear} {...this.props} />
          <DaysList month={this.state.month} year={this.state.year} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  }
})