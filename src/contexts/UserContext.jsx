import { createContext, useEffect, useState } from "react";

const userContext = createContext(null);

const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({});
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            try {
                setUserDetails(JSON.parse(storedUserDetails));
            } catch (error) {
                console.error("Failed to parse user details from localStorage", error);
                localStorage.removeItem('userDetails');
            }
        }
    }, []);

    const login = (data) => {
        setUserDetails(data);
    };

    const logout = () => {
        setUserDetails(null);
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <userContext.Provider value={{ userDetails, loader, setLoader, login, logout }}>
            {children}
        </userContext.Provider>
    );
};

export { UserProvider, userContext };