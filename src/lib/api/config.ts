// Database configuration and connection settings
export const dbConfig = {
  host: (import.meta as any).env?.VITE_DB_HOST || 'localhost',
  port: parseInt((import.meta as any).env?.VITE_DB_PORT || '3306'),
  user: (import.meta as any).env?.VITE_DB_USER || 'root',
  password: (import.meta as any).env?.VITE_DB_PASSWORD || '',
  database: (import.meta as any).env?.VITE_DB_NAME || 'nasdem_admin_panel',
};

// API base URL
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

// API endpoints
export const API_ENDPOINTS = {
  news: {
    list: '/news',
    create: '/news',
    update: (id: string) => `/news/${id}`,
    delete: (id: string) => `/news/${id}`,
    pin: (id: string) => `/news/${id}/pin`,
    unpin: (id: string) => `/news/${id}/unpin`,
    publish: (id: string) => `/news/${id}/publish`,
    archive: (id: string) => `/news/${id}/archive`,
  },
  media: {
    list: '/media',
    upload: '/media/upload',
    update: (id: string) => `/media/${id}`,
    delete: (id: string) => `/media/${id}`,
  },
  albums: {
    list: '/albums',
    create: '/albums',
    update: (id: string) => `/albums/${id}`,
    delete: (id: string) => `/albums/${id}`,
  },
  persons: {
    list: '/persons',
    create: '/persons',
    update: (id: string) => `/persons/${id}`,
    delete: (id: string) => `/persons/${id}`,
  },
  roles: {
    list: '/roles',
    create: '/roles',
    update: (id: string) => `/roles/${id}`,
    delete: (id: string) => `/roles/${id}`,
    byUnit: (unit: string) => `/roles/unit/${unit}`,
  },
  dapils: {
    list: '/dapils',
    update: (id: number) => `/dapils/${id}`,
  },
  dashboard: {
    stats: '/dashboard/stats',
    activity: '/dashboard/activity',
    auditLogs: '/dashboard/audit-logs',
    health: '/dashboard/health',
    organization: '/dashboard/organization',
    export: (type: string) => `/dashboard/export/${type}`,
    quickActions: '/dashboard/quick-actions',
  },
};

// HTTP client configuration
export const httpConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
