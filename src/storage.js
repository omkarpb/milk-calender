import { save, fetch } from './utilities';
import uuid from 'uuid/v4';
import { MONTHS } from './constants';


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
    const index = entries.findIndex((value) => value.month.toLowerCase() === month.toLowerCase() && value.year === year.toString());
    
    if (index === -1) {
      entries.push({
        month,
        year: year.toString(),
        days: []
      });
    }
  } else {
    entries = [{ month, year: year.toString(), days: [] }];
  }
  console.log('saving entries in addMonthYearData', JSON.stringify(entries));
  await save('entries', entries);
}

export async function getDayEntries(month, year) {
  try {
    const data = await fetch('entries');
    if (data !== null) {
      const entries = JSON.parse(data);
      const monthData = entries.filter((value) => {
        return value.year === year.toString() && value.month === month;
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
  await addMonthYearData(month, year);
  const entries = JSON.parse(await fetch('entries'));
  entries.map(entry => {
    if (entry.month === month && entry.year === year.toString()) {
      const ind = entry.days.findIndex(element => element.day === day.toString());
      if (ind === -1) {
        entry.days.push({
          day: day.toString(),
          items: [{
            itemId,
            quantity
          }]
        });
      } else {
        const itemIndex = entry.days[ind].items.findIndex(item => item.itemId === itemId);
        if (itemIndex === -1) {
          entry.days[ind].items.push({ itemId, quantity });
        } else {
          entry.days[ind].items[itemIndex].quantity = quantity;
        }
      }
    }
    return entry;
  });
  console.log('Saving entries', JSON.stringify(entries));
  await save('entries', entries);
}

export async function addDataEntriesForWholeMonth(month, year, itemId, quantity) {
  const monthlyDayEntries = await getDayEntries(month, year);
  let days = new Date(year, MONTHS.indexOf(month) + 1, 0).getDate();

  for (let i = 1; i <= days; i++) {
    let ind = monthlyDayEntries.findIndex(element => {
      if (element) {
        return element.day === i.toString();
      }
      return false;
    });
    if (ind > -1) {
      const itemIndex = monthlyDayEntries[ind].items.findIndex(item => item.itemId === itemId);
      if (itemIndex === -1) {
        monthlyDayEntries[ind].items.push({ itemId, quantity });
      } else {
        monthlyDayEntries[ind].items[itemIndex].quantity = quantity;
      }
    } else {
      monthlyDayEntries.push({ day: i.toString(), items: [{ itemId, quantity }] })
    }
  }

  const data = await fetch('entries');
  const entries = JSON.parse(data);
  const index = entries.findIndex(value => value.month === month && value.year === year.toString());

  entries[index].days = monthlyDayEntries;
  console.log('Saving entries for whole month', JSON.stringify(entries));

  await save('entries', entries);

}

