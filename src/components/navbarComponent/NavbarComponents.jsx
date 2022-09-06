import "./navbarComponent.scss";
import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/086 crown.svg";
import CartIcon from "../cartIcon/CartIcon";
import { UserContext } from "../../context/AuthContext";
import {CardContext} from "../../context/CardContext";
import { userSignout } from "../../services/firebase";
import DropDownComponent from "../dropdownContainer/DropDownComponent";

export const NavbarComponents = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCardOpened } = useContext(CardContext);

  const handleSignout = async () => {
    await userSignout();
    setCurrentUser(null);
  }


  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <Logo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>SHOP</Link>
          {currentUser ?
            (<span className="nav-link" onClick={handleSignout}>SIGN OUT</span>)
            : (<Link to="/auth" className="nav-link">signin/signup</Link>)
          }
          <CartIcon/>
        </div>
        {isCardOpened && <DropDownComponent />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default NavbarComponents
