import { ACTIONS } from './constants';
import { getDayEntries, getItems, getItemsDetailsForDay, addOrReplaceItem, addDayEntry, addDataEntriesForWholeMonth } from './storage';

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

export const addCurrentItems = (items) => {
  return {
    type: ACTIONS.ADD_CURRENT_ITEMS,
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


export const fetchCurrentItems = (day, month, year) => (dispatch) => {
  return getItemsDetailsForDay(day, month, year)
  .then(itemDetails => {
    dispatch(addCurrentItems(itemDetails));
  })
}

export const insertItemAndEntry = (itemName, unit, price, quantity, month, year, applyWholeMonthChecked, date) => dispatch => {
  return addOrReplaceItem({itemName, unit, price})
  .then(itemId => {
    dispatch(fetchItems());
    if (applyWholeMonthChecked) {
      return addDataEntriesForWholeMonth(month, year, itemId, quantity);
    } else {
      return addDayEntry(date, month, year, itemId, quantity);
    }
  })
  .then(() => {
    dispatch(fetchEntries(month, year));
    dispatch(fetchCurrentItems(date, month, year));
  });
}