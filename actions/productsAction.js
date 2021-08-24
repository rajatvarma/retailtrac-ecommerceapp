import axios from "axios"
import { productByCategoryURL } from "../apiCalls"

const getProductsFromCategory = (category_name) => async (dispatch) => {
    const productsList = await axios.get(productByCategoryURL+`?categoryName=${category_name}`)
    
    dispatch({
        type: "GET_PRODUCTS",
        payload: productsList.data.Items
    })
}

export const clearProducts = () => async (dispatch) => {
    dispatch({
        type: "CLEAR_PRODUCTS",
    })
}

export default getProductsFromCategory