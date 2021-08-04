import axios from "axios"


export const getImagesFromServer = () => async (dispatch) => {

    const images = await axios.get('http://pvanam.retailtrac360.com:8080/eComWS/rest/EcomInventory/ecomGetImages')

    images_list = images.data.Images

    let imagesMap = {}

    images_list.forEach(element => {
        const product_id = element.item_image.split('Prakruthi')[0].slice(0, -1)
        imagesMap[product_id] = element.item_image
    });

    dispatch({
        type: 'GET_IMAGES',
        payload: imagesMap
    })
    
}