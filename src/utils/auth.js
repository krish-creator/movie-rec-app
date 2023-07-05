import { useState, useContext, createContext } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, push, ref } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://movie-rec-app-8298c-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const userDetailsInDB = ref(database, "userDetails")

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const currentUser = JSON.parse(localStorage.getItem("userName"))

    const [user, setUser] = useState(currentUser || null)

    const login = (user) => {
        setUser(user)
        localStorage.setItem("userName", JSON.stringify(user))
    }

    const logout = () => {
        push(userDetailsInDB, JSON.parse(localStorage.getItem("userDetails")))
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
