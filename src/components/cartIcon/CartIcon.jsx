import "./carticon.scss"
import {ReactComponent as ShopIcon} from "../../assets/114 shopping-bag.svg";
 import { useContext } from "react";
 import { CardContext } from "../../context/CardContext";

const CartIcon = () => {

  const {isCardOpened,setIsCardOpened,cardItems} = useContext(CardContext);

  const toggleDropDown = () => {
    setIsCardOpened(!isCardOpened);
  }

  return (
    <div className="cart-icon-container" onClick={toggleDropDown}>
        <ShopIcon className="shopping-icon"/>
        <span className="item-count">{cardItems.length}</span>
    </div>
  )
}

export default CartIcon