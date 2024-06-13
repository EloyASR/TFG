import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const AlertContext = createContext();

// Proveedor de alertas
export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ message: '', visible: false, type:'success' });

    const showAlert = (message, type) => {
        setAlert({ message, visible: true, type:type});
    };

    const hideAlert = () => {
        setAlert({ ...alert, visible: false });
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

// Custom hook para usar el contexto
export const useAlert = () => {
    return useContext(AlertContext);
};