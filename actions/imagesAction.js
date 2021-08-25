import axios from "axios"


export const getImagesFromServer = () => async (dispatch) => {

    const images = await axios.get('http://pvanam.retailtrac360.com:8080/eComWS/rest/EcomInventory/ecomGetImages')

    const images_list = images.data.Images

    let productsImagesMap = {}
    let categoriesImagesMap = {}

    images_list.forEach(element => {
        if (element.item_image) {
            const product_id = element.item_image.split('Prakruthi')[0].slice(0, -1)
            productsImagesMap[product_id] = element.item_image
        }
        if (element.category_image) {
            const category_name = element.category_image
            categoriesImagesMap[category_name] = element.category_image
        }
    });

    dispatch({
        type: 'GET_IMAGES',
        payload: {
            products: productsImagesMap,
            categories: categoriesImagesMap
        }
    })
    
}