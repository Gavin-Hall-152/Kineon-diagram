/**
 * Helper utility functions for the KIN Analysis System
 * This file contains reusable utility functions used throughout the application.
 */

/**
 * Format a date to a human-readable string
 * @param {Date} date - The date to format
 * @param {Intl.DateTimeFormatOptions} options - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(
  date: Date, 
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
): string {
  return new Date(date).toLocaleDateString(undefined, options);
}

/**
 * Truncate a string to a maximum length and add ellipsis if needed
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated string
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Delay execution for a specified number of milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random ID with a specified length
 * @param {number} length - Length of the ID to generate
 * @returns {string} Random ID
 */
export function generateId(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Group an array of objects by a specified key
 * @param {Array<T>} array - Array to group
 * @param {(item: T) => K} keyGetter - Function that returns the grouping key for an item
 * @returns {Map<K, Array<T>>} Map of grouped items
 * @template T, K
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[], 
  keyGetter: (item: T) => K
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  
  array.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  
  return map;
}