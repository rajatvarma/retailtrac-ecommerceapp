import axios from "axios";
import { categoriesURL } from "../apiCalls";

const getCategories = () => async (dispatch) => {
    const categoriesList = await axios.get(categoriesURL).catch(e => console.log(e))

    dispatch({
        type: "GET_CATEGORIES",
        payload: categoriesList.data.category
    })
}

export default getCategories