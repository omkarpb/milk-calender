import React from 'react';
import { connect } from 'react-redux';
import { actions, MONTHS } from '../constants';
import { addItems, addMonth, addYear } from '../actions';
import HomeScreen from '../components/HomeScreen';

class HomeContainer extends React.Component {
  static navigationOptions = {
    title: 'Milk Calendar',
  };

  constructor(props) {
    super(props);

    this.setMonth = this.setMonth.bind(this);
    this.setYear = this.setYear.bind(this);
    this.addItems = this.addItems.bind(this);

    // let currentDate = new Date();
    // props.addMonth(MONTHS[currentDate.getMonth()]);
    // props.addYear(currentDate.getFullYear().toString());
    // props.addItems(MONTHS[currentDate.getMonth()], currentDate.getFullYear().toString());
  }

  componentDidMount() {
    let currentDate = new Date();
    this.props.addMonth(MONTHS[currentDate.getMonth()]);
    this.props.addYear(currentDate.getFullYear().toString());
    this.props.addItems(MONTHS[currentDate.getMonth()], currentDate.getFullYear().toString());
  }

  setMonth(month) {
    this.props.addMonth(month);
  }

  setYear(year) {
    this.props.addYear(year);
  }

  addItems(month, year) {
    this.props.addItems(month, year);
  }

  render() {
    return (
      <HomeScreen
        month={this.props.month}
        year={this.props.year}
        items={this.props.items}
        setMonth={this.setMonth}
        setYear={this.setYear}
        addItems={this.addItems}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    month: state.currenMonth,
    year: state.currentYear,
    items: state.currentItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMonth: (month) => dispatch(addMonth(month)),
    addYear: (year) => dispatch(addYear(year)),
    addItems: (month, year) => dispatch(addItems(month, year)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
