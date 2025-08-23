import React, { Children, useEffect, useState } from 'react'
import { createContext } from 'react'
import { getUserPostsApi } from '../../Services/UserServices';

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
const [userToken, setUserToken] = useState(localStorage.getItem('token') || '');
const [userData, setUserData] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);


 

async function getLoggedUserDAta(params){
const response = await getUserPostsApi();
if(response.message){
    setUserData(response.user);
}
}

useEffect(() => {
    if (isLoggedIn){
  getLoggedUserDAta(); }
 }, [])

    


return <AuthContext.Provider 
value = {{userToken, setUserToken, userData, setUserData, isLoggedIn, setIsLoggedIn}}>
    {children}
</AuthContext.Provider>

}
