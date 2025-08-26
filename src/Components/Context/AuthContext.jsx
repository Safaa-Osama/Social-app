import React, { Children, useEffect, useState } from 'react'
import { createContext } from 'react'
import { getLoggedUserDataApi } from '../../Services/UserServices';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);




    async function getLoggedUserDAta() {
        const response = await getLoggedUserDataApi(userToken);

        if (response.message) {
            setUserData(response.user);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getLoggedUserDAta();
        }
    }, [isLoggedIn])




    return <AuthContext.Provider
        value={{ userToken, setUserToken, userData, setUserData, isLoggedIn, setIsLoggedIn }}>
        {children}
    </AuthContext.Provider>

}
