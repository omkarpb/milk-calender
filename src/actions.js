import { ACTIONS } from './constants';
import { getDayEntries, getItems } from './storage';

// Action creators
export const addEntries = (entries) => {
  return {
    type: ACTIONS.ADD_ENTRIES,
    payload: entries
  }
}

export const addMonthYear = (month, year) => {
  return {
    type: ACTIONS.ADD_MONTH_YEAR,
    payload: { month, year }
  }
}

export const addItems = (items) => {
  return {
    type: ACTIONS.ADD_ITEMS,
    payload: items
  }
}

// Thunks
export const fetchEntries = (month, year) => dispatch => {
  return getDayEntries(month, year)
  .then(res => {
    dispatch(addEntries(res));
  });
}


export const setMonthYear = (month, year) => dispatch => {
  dispatch(addMonthYear(month, year));
  return getDayEntries(month, year)
  .then(res => {
    dispatch(addEntries(res));
  });
}

export const fetchItems = () => dispatch => {
  return getItems()
  .then(res => {
    dispatch(addItems(res));
  })
}
