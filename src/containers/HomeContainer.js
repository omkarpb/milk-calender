import React from 'react';
import { connect } from 'react-redux';
import { MONTHS } from '../constants';
import { fetchItems, fetchEntries, setMonthYear } from '../actions';
import HomeScreen from '../components/HomeScreen';

class HomeContainer extends React.Component {
  static navigationOptions = {
    title: 'Milk Calendar',
  };

  constructor(props) {
    super(props);

    this.setMonthYear = this.setMonthYear.bind(this);
    this.fetchEntries = this.fetchEntries.bind(this);

  }

  componentDidMount() {
    let currentDate = new Date();
    const month = MONTHS[currentDate.getMonth()];
    const year = currentDate.getFullYear().toString();

    this.props.setMonthYear(month, year);
    this.props.fetchEntries(MONTHS[currentDate.getMonth()], currentDate.getFullYear().toString());
    this.props.fetchItems();
  }

  setMonthYear(month, year) {
    this.props.setMonthYear(month, year);
  }

  fetchEntries(month, year) {
    this.props.fetchEntries(month, year);
  }

  render() {
    return (
      <HomeScreen
        month={this.props.month}
        year={this.props.year}
        items={this.props.items}
        setMonthYear={this.setMonthYear}
        fetchEntries={this.fetchEntries}
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
    setMonthYear: (month, year) => dispatch(setMonthYear(month, year)),
    fetchEntries: (month, year) => dispatch(fetchEntries(month, year)),
    fetchItems: () => dispatch(fetchItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
