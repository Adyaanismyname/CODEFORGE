// API configuration for different environments
export const API_CONFIG = {
    BASE_URL: 'https://codeforge-server.vercel.app',  // Always use the Vercel backend server
    // BASE_URL: import.meta.env.PROD
    //     ? 'https://codeforge-server.vercel.app'  // Production backend
    //     : 'http://localhost:3001',               // Local development backend

    ENDPOINTS: {
        CONTACT: '/api/contact',
        HEALTH: '/api/health'
    }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};
