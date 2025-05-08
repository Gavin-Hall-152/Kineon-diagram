/**
 * Utility for conditionally joining CSS class names together
 * This is a wrapper around the tailwind-merge and clsx libraries to provide a 
 * convenient way to conditionally apply class names while preventing conflicts.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single string and resolves Tailwind CSS conflicts
 * @param {ClassValue[]} inputs - CSS class values to be combined
 * @returns {string} Merged and de-conflicted class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}