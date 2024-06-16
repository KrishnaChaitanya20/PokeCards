import React, { createContext, useContext, useState } from 'react';

const AdminLoginContext = createContext();
export const useAdminLogin = () => useContext(AdminLoginContext);

export const AdminLoginProvider = ({ children }) => {
    const [isAdmin, setisAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   

    return (
        <AdminLoginContext.Provider value={{ isAdmin,setisAdmin ,username, setUsername, password, setPassword }}>
            {children}
        </AdminLoginContext.Provider>
    );
};