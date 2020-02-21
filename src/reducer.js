import { actions } from './constants';

export function reducer(
  state = {
    currentMonth: '',
    currentYear: '',
    currentItems: []
  },
  action
) {
  switch (action.type) {
    case actions.addMonth:
      return Object.assign({}, state, { currentMonth: action.payload });
    case actions.addYear:
      return Object.assign({}, state, { currentYear: action.payload });
    case actions.addItems:
      return Object.assign({}, state, { currentItems: action.payload });
    default:
      return state
  }

}