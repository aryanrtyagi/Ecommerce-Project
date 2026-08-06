import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken } from "../utils/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await authFetch(`${BASEURL}/api/profile/`);
            if (!res.ok) throw new Error("Failed to fetch profile");
            const data = await res.json();
            setProfile(data);
        } catch (error) {
            console.log("Error fetching profile:", error);
            setProfile(null);
        }
    };

    useEffect(() => {
        if (getAccessToken()) {
            fetchProfile();
        }
    }, []);

    const clearProfile = () => setProfile(null);

    return (
        <UserContext.Provider value={{ profile, fetchProfile, clearProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);