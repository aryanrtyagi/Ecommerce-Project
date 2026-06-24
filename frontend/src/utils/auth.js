const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

export const saveToken = (token) => {
    localStorage.setItem("access_token", token.access);
    localStorage.setItem("refresh_token", token.refresh);
};

export const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => {
    return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refresh_token");
};

// Refresh the access token using refresh token
const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        clearTokens();
        window.location.href = "/login";
        return null;
    }

    try {
        const res = await fetch(`${BASE}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!res.ok) {
            // Refresh token also expired — force logout
            clearTokens();
            window.location.href = "/login";
            return null;
        }

        const data = await res.json();
        localStorage.setItem("access_token", data.access);
        return data.access;

    } catch (error) {
        console.error("Token refresh failed:", error);
        clearTokens();
        window.location.href = "/login";
        return null;
    }
};

// authFetch — automatically refreshes token on 401
export const authFetch = async (url, options = {}) => {
    let token = getAccessToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let res = await fetch(url, { ...options, headers });

    // If 401 — try refreshing token and retry once
    if (res.status === 401) {
        const newToken = await refreshAccessToken();

        if (newToken) {
            headers["Authorization"] = `Bearer ${newToken}`;
            res = await fetch(url, { ...options, headers });
        }
    }

    return res;
};