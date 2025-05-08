/**
 * Custom hook for making API requests
 * Provides a standardized way to handle API requests with loading, error, and data states.
 */

import { useState, useCallback } from 'react';
import { ApiResponse } from '@/types';

/**
 * API request options
 * @typedef {Object} ApiOptions
 * @property {RequestInit} [fetchOptions] - Standard fetch options
 * @property {boolean} [suppressErrors] - Whether to suppress error notifications
 */
interface ApiOptions {
  fetchOptions?: RequestInit;
  suppressErrors?: boolean;
}

/**
 * API request state
 * @typedef {Object} ApiState
 * @property {boolean} isLoading - Whether a request is in progress
 * @property {boolean} isError - Whether the request resulted in an error
 * @property {string} [error] - Error message if there is one
 * @template T - Type of the successful data response
 * @property {T|null} data - Response data if successful
 */
interface ApiState<T> {
  isLoading: boolean;
  isError: boolean;
  error?: string;
  data: T | null;
}

/**
 * Custom hook for making API requests with standardized error handling
 * @param {string} initialUrl - The initial URL to use for the request
 * @param {ApiOptions} [initialOptions] - Optional configuration for the request
 * @returns {Object} API state and request functions
 * @template T - Type of the data to be returned from the API
 */
export function useApi<T>(initialUrl?: string, initialOptions?: ApiOptions) {
  const [state, setState] = useState<ApiState<T>>({
    isLoading: false,
    isError: false,
    data: null,
  });

  /**
   * Execute an API request
   * @param {string} url - The URL to request
   * @param {ApiOptions} [options] - Optional configuration for the request
   * @returns {Promise<ApiResponse<T>>} API response
   */
  const request = useCallback(
    async (url: string = initialUrl || '', options: ApiOptions = {}): Promise<ApiResponse<T>> => {
      // Merge options with defaults
      const fetchOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
        ...initialOptions?.fetchOptions,
        ...options.fetchOptions,
      };

      setState(prev => ({ ...prev, isLoading: true, isError: false }));

      try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'An error occurred');
        }

        setState({
          isLoading: false,
          isError: false,
          data: data.data || data,
        });

        return data as ApiResponse<T>;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        
        setState({
          isLoading: false,
          isError: true,
          error: errorMessage,
          data: null,
        });

        // We still return a properly typed response even in case of error
        return {
          success: false,
          message: errorMessage,
          data: null as unknown as T,
        };
      }
    },
    [initialUrl, initialOptions]
  );

  return {
    ...state,
    request,
  };
}