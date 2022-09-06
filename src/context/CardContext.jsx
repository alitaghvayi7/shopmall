import { useState, createContext } from "react";

export const CardContext = createContext({
    isCardOpened: false,
    setIsCardOpened: () => { },
    cardItems: [],
    setCardItems: () => { }
});

const checkExistItemAndAdd = (myCardArray, object) => {
    const item = myCardArray.find(item => item.id === object.id);

    if (item) {
        return myCardArray.map(item => {
            return item.id === object.id ? { ...item, quantity: item.quantity + 1 } : item
        })
    }

    return [...myCardArray, { ...object, quantity: 1 }];
}

const decrementItemFromArray = (myCardArray, object) => {
    return myCardArray.map(item => {
        return item.id === object.id ? { ...item, quantity: item.quantity - 1 < 0 ? 0 : item.quantity - 1 } : item
    })
};

const removeFromArray = (myCardArray, object) => {
    return myCardArray.filter(item => {
        return item.id !== object.id
    })
}


export const CardProvider = ({ children }) => {
    const [isCardOpened, setIsCardOpened] = useState(false);
    const [cardItems, setCardItems] = useState([]);

    const addItemToCard = (obj) => {
        setCardItems(checkExistItemAndAdd(cardItems, obj));
    }

    const decrementCount = (obj) => {
        setCardItems(decrementItemFromArray(cardItems, obj));
    }

    const removeFormCard = (obj) => {
        setCardItems(removeFromArray(cardItems, obj))
    }

    const totalPrice = () => {
        return cardItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0)
    }

    const value = { isCardOpened, setIsCardOpened, cardItems, addItemToCard, decrementCount, removeFormCard ,totalPrice}
    return (<CardContext.Provider value={value}>
        {children}
    </CardContext.Provider>)
}