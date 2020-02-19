import { AsyncStorage } from 'react-native';

export function getYearsList() {

  let years = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  for (let i = 0; i < 50; i++) {
    let item = year - 24 + i;
    years.push(item);
  }
  return years;
}

export const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error(e);
  }
};

export const fetch = async key => {
  try {
    return AsyncStorage.getItem(key);
  } catch (e) {
    throw new Error(e);
  }
};
