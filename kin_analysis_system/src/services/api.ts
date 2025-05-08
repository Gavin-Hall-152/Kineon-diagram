/**
 * API Service module
 * Provides functions for making API requests to the backend.
 */

import { ApiResponse, PaginationParams } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Make a fetch request to the API with proper error handling
 * @param {string} endpoint - API endpoint to call
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<ApiResponse<T>>} Response data
 * @template T - Type of data expected in the response
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred',
        data: null as unknown as T,
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    return {
      success: false,
      message: errorMessage,
      data: null as unknown as T,
    };
  }
}

/**
 * API service object with methods for different HTTP verbs
 */
const api = {
  /**
   * Perform a GET request
   * @param {string} endpoint - API endpoint
   * @param {Record<string, string>} [params] - Query parameters
   * @returns {Promise<ApiResponse<T>>} Response data
   * @template T - Type of data expected in the response
   */
  get: async <T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    return fetchApi<T>(`${endpoint}${queryString}`, { method: 'GET' });
  },

  /**
   * Perform a POST request
   * @param {string} endpoint - API endpoint
   * @param {any} data - Request payload
   * @returns {Promise<ApiResponse<T>>} Response data
   * @template T - Type of data expected in the response
   */
  post: async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
    return fetchApi<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Perform a PUT request
   * @param {string} endpoint - API endpoint
   * @param {any} data - Request payload
   * @returns {Promise<ApiResponse<T>>} Response data
   * @template T - Type of data expected in the response
   */
  put: async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
    return fetchApi<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Perform a DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<ApiResponse<T>>} Response data
   * @template T - Type of data expected in the response
   */
  delete: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return fetchApi<T>(endpoint, { method: 'DELETE' });
  },

  /**
   * Get data with pagination
   * @param {string} endpoint - API endpoint
   * @param {PaginationParams} pagination - Pagination parameters
   * @param {Record<string, string>} [filters] - Additional filters
   * @returns {Promise<ApiResponse<T>>} Response data
   * @template T - Type of data expected in the response
   */
  getPaginated: async <T>(
    endpoint: string,
    pagination: PaginationParams,
    filters?: Record<string, string>
  ): Promise<ApiResponse<T>> => {
    const params = {
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
      ...filters,
    };
    return api.get<T>(endpoint, params);
  },
};

export default api;