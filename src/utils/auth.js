
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://realtime-database-bf38b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const userDetailsInDB = ref(database, "userDetails")

