/**
 * Formatdate to yyyy-mm-dd hh:mm:ss
 * @param date 
 * @returns 
*/
export function formatDate(date: Date): string {

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invalid Date object');
    }

    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * convert yyyy-mm-dd to mmmm dd format
 * @param dateStr should be in yyyy-mm-dd format
 * @returns mmmm dd
*/
export function formatDateToMonthDay(dateStr: string): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Check if the input is a valid string
    if (typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      throw new Error('Invalid date string. Please provide a date string in the format "yyyy-mm-dd".');
    }
  
    const [year, month, day] = dateStr.split('-').map(Number);
  
    // Check if the provided date components are valid
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      throw new Error('Invalid date components. Please provide a valid date string in the format "yyyy-mm-dd".');
    }
  
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error('Invalid month or day value. Please provide a valid date string in the format "yyyy-mm-dd".');
    }
  
    // Get the month name and day
    const monthName = months[month - 1];
    const formattedDate = `${monthName} ${day}`;
  
    return formattedDate;
  }