/**
 * Base type definitions for the KIN Analysis System
 * This file serves as a central location for common type definitions used throughout the application.
 */

/**
 * User type definition
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} [role] - User's role in the system (optional)
 * @property {Date} createdAt - When the user was created
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user' | 'analyst';
  createdAt: Date;
}

/**
 * API Response wrapper type
 * @typedef {Object} ApiResponse
 * @property {T} data - The response data
 * @property {boolean} success - Whether the API request was successful
 * @property {string} [message] - Optional message, especially useful for errors
 * @template T - The type of data returned by the API
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Pagination parameters for API requests
 * @typedef {Object} PaginationParams
 * @property {number} page - Current page number (1-indexed)
 * @property {number} limit - Number of items per page
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response from the API
 * @typedef {Object} PaginatedResponse
 * @property {T[]} items - Array of items for the current page
 * @property {number} totalItems - Total number of items across all pages
 * @property {number} currentPage - Current page number
 * @property {number} totalPages - Total number of pages
 * @property {boolean} hasNextPage - Whether there is a next page
 * @property {boolean} hasPrevPage - Whether there is a previous page
 * @template T - The type of items being paginated
 */
export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}