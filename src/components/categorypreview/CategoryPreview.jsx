import "./categorypreview.scss";
import { useContext } from "react";
import ProductCard from "../../components/productCard/productCard";
import { CardContext } from "../../context/CardContext";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, items }) => {
    const { addItemToCard } = useContext(CardContext);

    return (
        <div className="category-preview-container">
            <Link to={`/shop/${title}`}>
                <sapn className="title">{title}</sapn>
            </Link>
            <div className="preview">
                {
                    items.filter((_, id) => id < 4).map((item) => {
                        return (
                            <ProductCard
                                key={item.id}
                                product={item}
                                addItemToCard={addItemToCard} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategoryPreview