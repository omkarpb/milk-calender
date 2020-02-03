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