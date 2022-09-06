import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AuthenticationPage from "./pages/authentication-page/AuthenticationPage.jsx";
import NavbarComponents from "./components/navbarComponent/NavbarComponents";
import ShopPage from "./pages/ShopPage/ShopPage.jsx";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarComponents />}>
        <Route index element={<HomePage />} />
        <Route path="shop/*" element={<ShopPage />} />
        <Route path="auth" element={<AuthenticationPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
