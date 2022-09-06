import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/categorypreview/CategoryPreview";
import { CategoryContext } from "../../context/CategoryContext";

const AllCategories = () => {
    const { category } = useContext(CategoryContext);
    return (
        <Fragment>
            {Object.keys(category).map((ctg) => {
                return <CategoryPreview title={ctg} items={category[ctg]} key={ctg}/>
            })}
        </Fragment>
    )
}

export default AllCategories