import axios from "axios";

const getCategories = () => async (dispatch) => {
    const categoriesList = await axios.get("http://pvanam.retailtrac360.com:8080/MergedWebservicesFMCG/rest/EcomInventory/allCategorywithSearchText?search_text=")

    dispatch({
        type: "GET_CATEGORIES",
        payload: categoriesList.data.category
    })
}

export default getCategories