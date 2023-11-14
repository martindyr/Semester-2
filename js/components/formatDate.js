export function formatDate(date) {
const originalDate = new Date(date);
const formatedDate = new Intl.DateTimeFormat('en-GB').format(originalDate);
return formatedDate
}