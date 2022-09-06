import "./categoryfull.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import ProductCard from "../../components/productCard/productCard";
import { CardContext } from "../../context/CardContext";
import { CategoryContext } from "../../context/CategoryContext";
import { useParams } from "react-router-dom";

const CategoryFull = () => {
    const { addItemToCard } = useContext(CardContext);
    const { category } = useContext(CategoryContext);

    const { categoryName } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(category[categoryName])
    }, [category, categoryName])

    return (
        <Fragment>
            {items && <div className="category-preview-container">
                <h2>
                    <sapn className="title">{categoryName}</sapn>
                </h2>
                <div className="preview">
                    {
                        items.map((item) => {
                            return (
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                    addItemToCard={addItemToCard} />
                            )
                        })
                    }
                </div>
            </div>}
        </Fragment>
    )
}

export default CategoryFull