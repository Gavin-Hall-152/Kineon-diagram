/**
 * Application constants
 * This file contains constant values used throughout the application.
 */

/**
 * Navigation menu items
 * @typedef {Object} NavItem
 * @property {string} title - Display title of the navigation item
 * @property {string} href - URL path for the navigation item
 * @property {string} [icon] - Optional icon name for the navigation item
 */
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  requiresAuth?: boolean;
}

/**
 * Main navigation items for the sidebar/header
 */
export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    requiresAuth: true,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: 'analytics',
    requiresAuth: true,
  },
  {
    title: 'Users',
    href: '/users',
    icon: 'users',
    requiresAuth: true,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'settings',
    requiresAuth: true,
  },
];

/**
 * Site metadata
 */
export const SITE_CONFIG = {
  name: 'KIN Analysis System',
  description: 'Analytics platform for learning and knowledge management',
  url: 'https://kin-analytics.example.com',
  ogImage: '/og-image.jpg',
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  users: '/api/users',
  analytics: '/api/analytics',
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
  },
};