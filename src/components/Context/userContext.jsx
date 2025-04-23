import { createContext, useEffect } from "react";
import { profile } from "../../services/Api";
import { useState } from "react";

export const UserContext = createContext({});

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const getMyInfor = async () => {
            try {
                const response = await profile(token);
                console.log("user context", response.data);
                setUserData(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };

        getMyInfor();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
