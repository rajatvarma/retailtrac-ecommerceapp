import axios from "axios"
import { getCustomerOrdersURL, getOrderDetailsURL } from "../apiCalls"

const getOrders = (customer_id) => async (dispatch) => {

    let error

    const data = await axios.get(getCustomerOrdersURL+`?customer_id=${customer_id}`).catch(e => error = e)
    
    let  ordersList = []

    if (error) {
        return dispatch({
            type: 'GET_ORDERS',
            error: error,
            payload: []
        })
    }
    
    try {
        ordersList = data.data.split('@')
    } catch (e) {
        return dispatch({
            type: 'GET_ORDERS',
            error: e,
            payload: []
        })
    }

    return dispatch({
        type: 'GET_ORDERS',
        payload: ordersList
    })
}

export const getOrderSummary = (id) => async (dispatch) => {
    let error

    const data = await axios.get(getOrderDetailsURL+`?invoiceNumber=${id}`).catch(e => error = e)
    
    if (error) {
        return dispatch({
            type: 'ERROR',
            error: error
        })
    }

    dispatch({
        type: 'GET_ORDER_DETAILS',
        payload: data.data.itemList 
    })
}


export default getOrders