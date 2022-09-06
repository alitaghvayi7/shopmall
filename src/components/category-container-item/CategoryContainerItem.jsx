import "./categoryItemContainer.scss";
import { Link } from "react-router-dom";
export default function CategoryContainerItem({ category }) {
  const { imageUrl, title } = category;
  return (
    <Link to={`/shop/${title}`} className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </Link>
  );
}
