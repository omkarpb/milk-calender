import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { MONTHS, STYLES, DAYS, CURRENCY } from '../constants';
import moment from 'moment';
import { connect } from 'react-redux';
import DayRow from '../components/DayRow';
import { getMonthlyCost } from '../storage';
import { setMonthlySum } from '../actions';

class DaysList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      daysList: [],
      totalCost: 0
    }
    this.setVisible = this.setVisible.bind(this);
  }

  setVisible(date, month) {
    this.props.navigation.navigate('DayItemDetails', {
      date,
      month,
      year: this.props.year
    });
  }

  render() {
    let { month, year } = this.props;
    let days = new Date(year, MONTHS.indexOf(month) + 1, 0).getDate();

    let daysList = [];
    for (let i = 0; i < days; i++) {
      daysList.push({ date: i + 1, month })
    }
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('MonthBill', {monthlySums: this.props.monthlySums, month, year })}>
          <View style={styles.monthlyBillBanner}>
            <Text style={styles.monthlyBillText}>This month's bill:  {CURRENCY}{this.props.monthlySums.totalCost}/-</Text>
          </View>
        </TouchableHighlight>
        <FlatList
          data={daysList}
          keyExtractor={(item) => item.date.toString()}
          renderItem={({ item }) => {
            const day = DAYS[moment(`${item.date} ${item.month} ${this.props.year}`, 'D MMM YYYY').day()]
            const isWeekend = day === 'Sun' || day === 'Sat';
            const fontColor = isWeekend ? '#ffc0cb' : STYLES.themeColor;
            const isToday = moment().date() === item.date && moment().month() === MONTHS.indexOf(item.month) && moment().year() === Number(this.props.year);
            return (
              <>
                <TouchableHighlight onPress={() => this.setVisible(item.date, item.month)}>
                  <View style={{...styles.itemContainer, backgroundColor: isToday ? '#ccc' : 'white' }}>
                    <View style={styles.dayDetails}>
                      <Text style={{ ...styles.upperRow, color: fontColor }}>{item.date} {item.month}</Text>
                      <Text style={{ ...styles.lowerRow, color: fontColor }}>{day}</Text>
                    </View>
                    <DayRow
                      entries={this.props.entries}
                      day={item.date}
                      items={this.props.items}
                    />
                  </View>
                </TouchableHighlight>
              </>
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 80,
    marginBottom: 200
  },
  itemContainer: {
    borderRadius: 3,
    padding: 10,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: 'gray',
    shadowOffset: { height: 5, width: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  itemText: {
  },
  dayDetails: {
    flex: 1,
    backgroundColor: STYLES.backgroundDark,
    padding: 5,
    borderRadius: 3,
    justifyContent: 'space-evenly'
  },

  upperRow: {
    fontSize: 15,
    color: 'white',
  },
  lowerRow: {
    fontSize: 12,
    color: STYLES.themeColor,
  },
  monthlyBillBanner: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderBottomColor: STYLES.themeColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: STYLES.themeColor,
    shadowColor: 'gray',
    shadowOffset: { height: 5, width: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  monthlyBillText: {
    fontSize: 30,
    color: '#fff'
  }
});

const mapStateToProps = (state) => {
  return {
    month: state.currentMonth,
    year: state.currentYear,
    entries: state.entries,
    items: state.items,
    monthlySums: state.monthlySums
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setMonthlySum: (month, year) => dispatch(setMonthlySum(month, year))
//   }
// }

export default connect(mapStateToProps)(DaysList);