import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const currentUser = JSON.parse(localStorage.getItem("userName"))

    const [user, setUser] = useState(currentUser || null)

    const login = (user) => {
        setUser(user)
        localStorage.setItem("userName", JSON.stringify(user))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("userName")
        localStorage.removeItem("genres")
    }

    const authValue = {
        user,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}
