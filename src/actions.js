import { ACTIONS } from './constants';
import { getDayEntries, getItems, getItemsDetailsForDay, addOrReplaceItem, addDayEntry, addDataEntriesForWholeMonth, deleteItem, getMonthlyCost } from './storage';

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

export const setLoadingStatus = (loading) => {
  return {
    type: ACTIONS.SET_LOADING_STATUS,
    payload: loading
  }
}

export const addMonthlySum = (monthlySum) => {
  return {
    type: ACTIONS.SET_MONTHLY_SUM,
    payload: monthlySum
  }
}

// Thunks
export const fetchEntries = (month, year) => dispatch => {
  dispatch(setLoadingStatus(true));
  return getDayEntries(month, year)
  .then(res => {
    dispatch(addEntries(res));
    dispatch(setLoadingStatus(false));
  });
}


export const setMonthYear = (month, year) => dispatch => {
  dispatch(setLoadingStatus(true));
  dispatch(addMonthYear(month, year));
  dispatch(setMonthlySum(month, year))
  return getDayEntries(month, year)
  .then(res => {
    dispatch(addEntries(res));
    dispatch(setLoadingStatus(false));
  });
}

export const fetchItems = () => dispatch => {
  dispatch(setLoadingStatus(true));
  return getItems()
  .then(res => {
    dispatch(addItems(res));
    dispatch(setLoadingStatus(false));
  })
}


export const fetchCurrentItems = (day, month, year) => (dispatch) => {
  dispatch(setLoadingStatus(true));
  return getItemsDetailsForDay(day, month, year)
  .then(itemDetails => {
    dispatch(addCurrentItems(itemDetails));
    dispatch(setLoadingStatus(false));
  })
}

export const insertItemAndEntry = (itemName, unit, price, quantity, month, year, applyWholeMonthChecked, date) => dispatch => {
  dispatch(setLoadingStatus(true));
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
    dispatch(setLoadingStatus(false));
  });
}

export const removeItem = (day, month, year, itemId, deleteForWholeMonth) => dispatch => {
  dispatch(setLoadingStatus(true));
  return deleteItem(day, month, year, itemId, deleteForWholeMonth)
  .then(() => {
    dispatch(fetchEntries(month, year));
    dispatch(fetchCurrentItems(day, month, year));
    dispatch(setLoadingStatus(false));
  })
}

export const setMonthlySum = (month, year) => dispatch => {
  return getMonthlyCost(month, year)
  .then(res => {
    dispatch(addMonthlySum(res));
  })
}