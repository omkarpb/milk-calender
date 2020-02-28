import { ACTIONS } from './constants';

export function reducer(
  state = {
    currentMonth: '',
    currentYear: '',
    entries: [],
    items: [],
    currentItems: [],
    loading: false
  },
  action
) {
  switch (action.type) {
    case ACTIONS.ADD_MONTH_YEAR:
      return Object.assign({}, state, { currentMonth: action.payload.month, currentYear: action.payload.year });
    case ACTIONS.ADD_ENTRIES:
      return Object.assign({}, state, { entries: action.payload });
    case ACTIONS.ADD_ITEMS:
      return Object.assign({}, state, { items: action.payload });
    case ACTIONS.ADD_CURRENT_ITEMS:
      return Object.assign({}, state, { currentItems: action.payload });
    case ACTIONS.SET_LOADING_STATUS:
      return Object.assign({}, state, { loading: action.payload });
    default:
      return state;
  }

}