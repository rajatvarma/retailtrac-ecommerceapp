import axios from "axios"


export const getImagesFromServer = () => async (dispatch) => {

    const productsImagesResponse = await axios.get('http://pvanam.retailtrac360.com:8080/eComWS/rest/EcomInventory/ecomGetImages')
    const categoryImagesResponse = await axios.get('https://pvanam.retailtrac360.com/eComWS/rest/EcomInventory/ecomGetCategoryImages')
    
    let productsImagesMap = productsImagesResponse.data.Images
    let categoriesImagesMap = categoryImagesResponse.data.Images

    dispatch({
        type: 'GET_IMAGES',
        payload: {
            products: productsImagesMap,
            categories: categoriesImagesMap
        }
    })
    
}