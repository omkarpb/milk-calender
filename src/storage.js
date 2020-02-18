import { save, fetch } from './utilities';

export function addItem(newItem) {
  return fetch('items')
    .then((items) => {
      console.log('addItem', items);
      if (items !== null) {
        items = JSON.parse(items);
        const index = items.findIndex(item => item.name === newItem.name);
        if (index > -1) {
          items[index] = newItem;
        } else {
          items.push(newItem);
        }
      } else {
        items = [{ ...newItem }];
      }
      return save('items', items);
    }).catch(err => {
      console.error(err);
    });
}

export function getItems() {
  return fetch('items')
  .then((items) => {
    items = JSON.parse(items);
    return items;
  })
  .catch(err => {
    console.error(err);
  })
}