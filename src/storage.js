import { save, fetch } from './utilities';
import uuid from 'uuid/v4';

export async function addOrReplaceItem(newItem) {
  try {
    const data = await fetch('items');
    let items = [];
    let id = uuid();
    if (data !== null) {
      items = JSON.parse(data);
      const index = items.findIndex(item => item.itemName.toLowerCase() === newItem.itemName.toLowerCase());
      if (index > -1) {
        items[index] = Object.assign(items[index], newItem);
        id = items[index].itemId;
      } else {
        items.push({ ...newItem, itemId: id });
      }
    } else {
      items = [{ ...newItem, itemId: id }];
    }
    console.log('Adding item', JSON.stringify(items));
    await save('items', items);
    return id;
  } catch (error) {
    console.error(error);
  }
}

export async function getItems() {
  try {
    const data = await fetch('items');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

export async function getItem(itemId) {
  const data = await fetch('items');
  const items = JSON.parse(data);
  const item = items.find(item => item.itemId === itemId);
  return item;
}

async function addMonthYearData(month, year) {
  const data = await fetch('entries');
  let entries = [];
  if (data !== null) {
    entries = JSON.parse(data);
    const index = entries.findIndex((value) => value.month.toLowerCase() === month.toLowerCase() && value.year === year);
    if (index === -1) {
      entries.push({
        month,
        year,
        days: []
      });
    }
  } else {
    entries = [{ month, year, days: [] }];
  }
  await save('entries', entries);
}

export async function getDayEntries(month, year) {
  try {
    const data = await fetch('entries');
    if (data !== null) {
      const entries = JSON.parse(data);
      const monthData = entries.filter((value) => {
        return value.year === year && value.month === month;
      });
      // Create data for that month and year
      if (monthData.length === 0) {
        await addMonthYearData(month, year);
        return [];
      }
      return monthData[0].days;
    } else {
      // Create data for that month and year
      await addMonthYearData(month, year);
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addDayEntry(day, month, year, itemId, quantity) {
  const monthlyDayEntries = await getDayEntries(month, year);
  const dayEntries = monthlyDayEntries.filter((value) => value.day === day);
  const data = await fetch('entries');
  const entries = JSON.parse(data);
  const index = entries.findIndex(value => value.month === month && value.year === year);
  if (dayEntries.length === 0) {
    // Add entry to that month and year
    entries[index] = Object.assign(entries[index], { 
      days: [{
        day,
        items: [{
          itemId,
          quantity 
        }]
      }]
    });
  } else {
    const items = dayEntries[0].items.filter(value => value.itemId === itemId);
    if (items.length === 0) {
      // No item entry for that day
      // Add {itemId, quantity} in items
      entries[index].days.map(element => {
        if (element.day === day) {
          if(element.items.length > 0) {
            element.items.push({ itemId, quantity });
          } else {
            element.items = [{ itemId, quantity }]
          }
        }
        return element;
      });
    } else {
      // Change in quantity for that day for that item
      entries[index].days.map(element => {
        element.items.map(item => {
          if (item.itemId === itemId) {
            item.quantity = quantity;
          }
          return item;
        });
        return element;
      });
    }
  }
  console.log('Saving entries', JSON.stringify(entries));
  await save('entries', entries);
}