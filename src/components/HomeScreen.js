import React from 'react';
import { SafeAreaView } from 'react-native';
import CurrentMonthInput from '../containers/CurrentMonthInput';
import DaysList from '../containers/DaysList';
import { MONTHS } from '../constants';

export default function HomeScreen(props) {
  return (
    <SafeAreaView>
      <CurrentMonthInput {...props} />
      <DaysList {...props} />
    </SafeAreaView>
  );
}
