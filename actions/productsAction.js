import axios from "axios"

const getProductsFromCategory = (category_name) => async (dispatch) => {
    const productsList = await axios.get(`http://pvanam.retailtrac360.com:8080/MergedWebservicesFMCG/rest/EcomInventory/ecommerceItemsBasedOnParentCategory?categoryName=${category_name}`)
    
    dispatch({
        type: "GET_PRODUCTS",
        payload: productsList.data.Items
    })
}

export default getProductsFromCategory