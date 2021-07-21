import axios from "axios"

const getOrders = (customer_id) => async (dispatch) => {
    data = await axios.get(`http://pvanam.retailtrac360.com:8080/MergedWebservicesFMCG/rest/EcomSales/EcomGeTotalSalesInfo?customer_id=${customer_id}`)

    ordersList = data.data.split("@")

    dispatch({
        type: 'GET_ORDERS',
        payload: ordersList
    })
}

export const getOrderSummary = (id) => async (dispatch) => {
    data = await axios.get(`http://pvanam.retailtrac360.com:8080/MergedWebservicesFMCG/rest/EcomSales/ezPOZListAllItemsByInvoiceCode?invoiceNumber=${id}`)
    dispatch({
        type: 'GET_DETAILS',
        payload: data.data.itemList 
    })
}


export default getOrders