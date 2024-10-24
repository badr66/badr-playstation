"use client"
import { UserType } from '@/types/UserType';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';  

interface UserContextType {  
    user: UserType | null;  
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;  
}  


const UserContext = createContext<UserContextType | undefined>(undefined);  

 
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  
    const [user, setUser] = useState<UserType | null>(null);  
    useEffect(() => {   
        const storedUser = localStorage.getItem('user');  
        if (storedUser) {  
            setUser(JSON.parse(storedUser));  
        }  
    });  
 
    useEffect(() => {  
        if (user) {  
            localStorage.setItem('user', JSON.stringify(user));  
        } else {  
            localStorage.removeItem('user'); 
        }  
    }, [user]); 

    return (  
        <UserContext.Provider value={{ user, setUser }}>  
            {children}  
        </UserContext.Provider>  
    );  
};  


export const useUser = (): UserContextType => {  
    const context = useContext(UserContext);  
    if (!context) {  
        throw new Error('useUser must be used within a UserProvider');  
    }  
    return context;  
};