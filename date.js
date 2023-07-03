const createdAtDate = new Date('1969-12-31T23:59:59.999+00:00');
const last7DaysDate = new Date(createdAtDate);
last7DaysDate.setDate(last7DaysDate.getDate() - 7);
console.log(last7DaysDate.toISOString());
