# Milk Calendar
React Native app for Android and iOS

This app let you add your daily expenses on recurring items on easy UI. You can add as many items as you can and see monthly expenses on each of the item.

## Sample Data

```
const data = {
    items: [{
        itemId: "0001",
        itemName: "Milk",
        unit: "litre",
        price: "50"
    }, {
        itemId: "0002",
        item: "Eggs",
        unit: "number",
        price: "8"
    }],
    entries: [{
        month: "Feb",
        year: "2020",
        days: [{
            day: "1",
            items: [{
                itemId: "0001",
                quantity: "1",
            },{
                itemId: "0002",
                quantity: "15",
            }]
        }, {
            day: "2",
            items: [{
                itemId: "0001",
                quantity: "2",
            },{
                itemId: "0002",
                quantity: "10",
            }]
        }]
    }, {
        month: "Mar",
        year: "2020",
        days: [{
            day: "1",
            items: [{
                itemId: "0001",
                quantity: "1.5",
            },{
                itemId: "0002",
                quantity: "2",
            }]
        }, {
            day: "2",
            items: [{
                itemId: "0001",
                quantity: "2.5",
            },{
                itemId: "0002",
                quantity: "4",
            }]
        }]
    }]
}
```