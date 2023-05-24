import { createContext, useState } from "react";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({})
    const [showPassword, setShowPassword] = useState(false)


    const value = {
        loading, setLoading,
        isAuthenticated, setIsAuthenticated,
        user, setUser, showPassword, setShowPassword
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

