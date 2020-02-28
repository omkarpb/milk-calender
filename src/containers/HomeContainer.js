import React from 'react';
import { connect } from 'react-redux';
import { MONTHS } from '../constants';
import { fetchItems, fetchEntries, setMonthYear, setLoadingStatus } from '../actions';
import HomeScreen from '../components/HomeScreen';

class HomeContainer extends React.Component {
  static navigationOptions = {
    title: 'Milk Calendar',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
    this.fetchEntries = this.fetchEntries.bind(this);
    this.selectNextMonth = this.selectNextMonth.bind(this);
    this.selectPreviousMonth = this.selectPreviousMonth.bind(this);
    this.handleMonthYearSelect = this.handleMonthYearSelect.bind(this);

  }

  componentDidMount() {
    let currentDate = new Date();
    const month = MONTHS[currentDate.getMonth()];
    const year = currentDate.getFullYear().toString();

    this.props.setMonthYear(month, year);
    this.props.fetchEntries(MONTHS[currentDate.getMonth()], currentDate.getFullYear().toString());
    this.props.fetchItems();
  }

  fetchEntries(month, year) {
    this.props.fetchEntries(month, year);
  }
  
  selectNextMonth() {

    const monthNum = MONTHS.indexOf(this.props.month) + 1;
    const yearNum = Number(this.props.year);
    
    const nextMonth = monthNum === 12 ? 1 : monthNum + 1;
    const nextYear = monthNum === 12 ? yearNum + 1 : yearNum;

    this.props.setMonthYear(MONTHS[nextMonth - 1], nextYear.toString());

  }

  selectPreviousMonth() {

    const monthNum = MONTHS.indexOf(this.props.month) + 1;
    const yearNum = Number(this.props.year);

    const prevMonth = monthNum === 1 ? 12 : monthNum - 1;    
    const prevYear = monthNum === 1 ? yearNum - 1 : yearNum;
    
    this.props.setMonthYear(MONTHS[prevMonth - 1], prevYear.toString());
  }

  handleMonthYearSelect(month, year) {
    this.props.setMonthYear(month, year);
  }

  render() {
    return (
      <HomeScreen
        month={this.props.month}
        year={this.props.year}
        items={this.props.items}
        setMonthYear={this.setMonthYear}
        fetchEntries={this.fetchEntries}
        selectNextMonth={this.selectNextMonth}
        selectPreviousMonth={this.selectPreviousMonth}
        handleMonthYearSelect={this.handleMonthYearSelect}
        loading={this.props.loading}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    month: state.currentMonth,
    year: state.currentYear,
    items: state.currentItems,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMonthYear: (month, year) => dispatch(setMonthYear(month, year)),
    fetchEntries: (month, year) => dispatch(fetchEntries(month, year)),
    fetchItems: () => dispatch(fetchItems()),
    setLoadingStatus: (loading) => dispatch(setLoadingStatus(loading))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
