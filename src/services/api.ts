// Centralized API client — all HTTP calls go through here.
// Automatically attaches the JWT token and handles errors consistently.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper to get the stored token
function getToken(): string | null {
    return localStorage.getItem('leadflow_token');
}

// Core fetch wrapper — adds auth header and parses JSON
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    // If a token exists, attach it to every request automatically
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
    const data = await response.json();

    // If the backend returned { success: false }, throw an error with the message
    if (!response.ok || data.success === false) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
}

// Auth
export const authApi = {
    login: (email: string, password: string) =>
        request<{ success: boolean; token: string; user: any }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),
    getMe: () => request<{ success: boolean; user: any }>('/api/auth/me'),
};

// Leads
export const leadsApi = {
    getAll: (params?: Record<string, string>) => {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return request<any>(`/api/leads${query}`);
    },
    getById: (id: string) => request<any>(`/api/leads/${id}`),
    create: (data: Record<string, any>) =>
        request<any>('/api/leads', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Record<string, any>) =>
        request<any>(`/api/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) =>
        request<any>(`/api/leads/${id}`, { method: 'DELETE' }),
};

// Notes
export const notesApi = {
    getByLead: (leadId: string) => request<any>(`/api/leads/${leadId}/notes`),
    add: (leadId: string, content: string) =>
        request<any>(`/api/leads/${leadId}/notes`, {
            method: 'POST',
            body: JSON.stringify({ content }),
        }),

    // AI note summariser — calls Gemma 4 via backend
    summarise: (leadId: string) =>
        request<{ success: boolean; summary: string }>(`/api/leads/${leadId}/notes/summary`, {
            method: 'POST',
        }),
};

// Dashboard
export const dashboardApi = {
    getStats: () => request<any>('/api/dashboard/stats'),
};

// Public (no auth required)
export const publicApi = {
    getStats: () => request<any>('/api/public/stats'),
};