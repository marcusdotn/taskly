
/**
 * Compare two dates with day precision
 * @param dateA Date A
 * @param dateB Date B
 * @returns Whether or not the dates are equal
 */
export function isEqualDateDay(dateA?: Date | null, dateB?: Date | null): boolean {
    return dateA?.getFullYear() === dateB?.getFullYear() &&
    dateA?.getMonth() === dateB?.getMonth() &&
    dateA?.getDate() === dateB?.getDate()
}


/**
 * Helper function to get tomorrow's date object
 * @returns Tomorrow's date object
 */
export function tomorrrowDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return date;
}