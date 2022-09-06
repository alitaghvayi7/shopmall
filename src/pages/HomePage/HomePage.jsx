import DirectoryContainer from "../../components/directory-container/DirectoryContainer";
import { Fragment, useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";

const HomePage = () => {
    const { category } = useContext(CategoryContext);
    return (
        <Fragment>
            {category && <DirectoryContainer />}
        </Fragment>
    )
}
export default HomePage;