import { createContext, useEffect } from "react";
import { profile } from "../../services/Api";
import { useState } from "react";


export const UserContext = createContext({});

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const token = localStorage.getItem("token")

    useEffect(() => {
        
        if (!token) {
            return
        }
        const getMyInfor = async () => {
            try {
                // console.log(token)
                const response = await profile(token)
                console.log(response.data)
                setUserData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInfor()
    }, [token])
    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    )
}
