import { actions } from './constants';
import { getDayEntries } from './storage';


export const addItems = (month, year) => dispatch => {
  return getDayEntries(month, year)
  .then(res => {
    dispatch({type: actions.addItems, payload: res});
  });
}

export const addMonth = (month) => {
  return {
    type: actions.addMonth,
    payload: month
  }
}

export const addYear = (year) => {
  return {
    type: actions.addYear,
    payload: year
  }
}

