import "./checkOut.scss";
import CheckoutItem from "../../components/checkoutitem/CheckoutItem";
import { useContext } from "react";
import { CardContext } from "../../context/CardContext";

const CheckoutPage = () => {

    const { cardItems,addItemToCard,decrementCount ,removeFormCard,totalPrice} = useContext(CardContext);

    return (
        <div className="checkout-container">
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Describtion</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cardItems.map((item) => {
                    return (<CheckoutItem
                        item={item}
                        key={item.id}
                        onIncrement = {addItemToCard} 
                        onDecrement = {decrementCount}
                        onRemove={removeFormCard}/>)
                })
            }

            <span className='total'>Total : ${totalPrice()}</span>
        </div>
    )
}

export default CheckoutPage