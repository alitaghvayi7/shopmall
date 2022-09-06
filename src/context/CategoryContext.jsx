import { useState, createContext, useEffect } from "react";
import { getDocumentAndCollections } from "../services/firebase.js";

export const CategoryContext = createContext({
    category: {},
});


export const CategoryProvider = ({ children }) => {

    const [category, setCategory] = useState({});
    const value = { category };

    useEffect(() => {
        const getCatgories = async () => {
            const result = await getDocumentAndCollections();
            setCategory(result);
        }
        getCatgories();

    }, []);
    
    return (<CategoryContext.Provider value={value}>
        {children}
    </CategoryContext.Provider>)
}