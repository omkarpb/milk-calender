import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { MONTHS, STYLES, DAYS } from '../constants';
import moment from 'moment';
import { connect } from 'react-redux';

class DaysList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      daysList: [],
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
    let days = new Date(year, MONTHS.indexOf(month), 0).getDate();

    let daysList = [];
    for (let i = 0; i < days; i++) {
      daysList.push({ date: i + 1, month })
    }
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={daysList}
          renderItem={({ item }) => {
            const day = DAYS[moment(`${item.date} ${item.month} ${this.props.year}`, 'D MMM YYYY').day()]
            // const day = DAYS[new Date(`${item.date} ${item.month} ${year}`)];
            const isWeekend = day === 'Sun' || day === 'Sat';
            const fontColor = isWeekend ? '#ffc0cb' : STYLES.themeColor;

            return (
              <>
                <TouchableHighlight onPress={() => this.setVisible(item.date, item.month)}>
                  <View style={styles.itemContainer}>
                    <View style={styles.dayDetails}>
                      <Text style={{ ...styles.upperRow, color: fontColor }}>{item.date} {item.month}</Text>
                      <Text style={{ ...styles.lowerRow, color: fontColor }}>{day}</Text>
                    </View>
                    <View style={styles.itemDetails}>
                      {(this.props.items && this.props.items.length > 0) && this.props.items.map((item, index) => {
                        return (
                          <Text style={styles.oneItem} key={index}>{item.itemId} {item.quantity}</Text>
                        )
                      })}
                      {(!this.props.items || this.props.items.length === 0) && 
                      <Text style={styles.oneItem}>No items added yet!</Text>}
                    </View>
                    <View style={styles.priceDetails}>
                      <Text style={styles.priceValue}>{'\u20B9'}{50}/-</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </>
            )
          }}
          keyExtractor={(item) => item.date.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 80,
    marginBottom: 50
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: STYLES.themeColor,
    padding: 10,
    flexDirection: 'row',
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
  itemDetails: {
    flex: 4,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between'
  },
  upperRow: {
    fontSize: 15,
    color: 'white',
  },
  lowerRow: {
    fontSize: 12,
    color: STYLES.themeColor,
  },
  oneItem: {
    width: 100,
    margin: 10
  },
  priceDetails: {
    justifyContent: 'center'
  },
  priceValue: {
    fontSize: 25
  }
});

const mapStateToProps = (state) => {
  return {
    month: state.currentMonth,
    year: state.currentYear,
    items: state.currentItems
  }
  
}

export default connect(mapStateToProps)(DaysList);