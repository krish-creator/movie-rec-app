import { useState, useContext, createContext } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, update } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://realtime-database-bf38b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const userDetailsInDB = ref(database, "userDetails")

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const currentUser = JSON.parse(localStorage.getItem("userName"))
    const [user, setUser] = useState(currentUser || null)

    const register = (name, password) => {
        push(userDetailsInDB, { name, password })
    }

    const login = (user) => {
        onValue(userDetailsInDB, function (snapshot) {
            let userDetailsArray = Object.values(snapshot.val())
            for (let i = 0; i < userDetailsArray.length; i++) {
                if (userDetailsArray[i].name === currentUser) {
                    setUser(user)
                }
            }
            localStorage.setItem("userName", JSON.stringify(user))
        })
    }

    const logout = () => {
        onValue(userDetailsInDB, function (snapshot) {
            let userDetailsArray = Object.values(snapshot.val())
            for (let i = 0; i < userDetailsArray.length; i++) {
                if (userDetailsArray[i].name === currentUser) {
                    update(userDetailsInDB, JSON.parse(localStorage.getItem("userDetails")))
                }
            }
            setUser(null)
            localStorage.removeItem("userName")
            localStorage.removeItem("genres")
        })

    }

    const authValue = {
        user,
        login,
        logout,
        register
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
