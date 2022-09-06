import "./shopPage.scss"
import { Routes, Route } from "react-router-dom";
import AllCategories from "../allcategories/AllCatgories";
import CategoryFull from "../../components/categoryfull/CategoryFull"

const ShopPage = () => {
  return (
    <Routes>
      <Route index element={<AllCategories />} />
      <Route path=":categoryName" element={<CategoryFull />} />
      
    </Routes>
  )
}

export default ShopPage