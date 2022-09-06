import "./dropdowncontainer.scss"
import Button from "../button/Button"
import { useContext } from "react";
import { CardContext } from "../../context/CardContext";
import CardItem from "../cartitem/CardItem";
import { useNavigate } from "react-router-dom";

const DropDownComponent = () => {

  const navigate = useNavigate();

  const { cardItems,setIsCardOpened,isCardOpened } = useContext(CardContext);

  const clickHandler = () => {
    setIsCardOpened(!isCardOpened);
    navigate("/checkout");
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cardItems.map((item) => {
          return (<CardItem key={item.id} product={item} />)
        })}
      </div>
      <Button onClick={clickHandler}>CHECKOUT</Button>
    </div>
  )
}

export default DropDownComponent