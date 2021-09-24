import axios from 'axios'
import { addUserAddressURL, getUserAddressesURL } from "../apiCalls"
import QueryString from "qs"

export const getAddresses = (cid) => async (dispatch) => {
    const response = await axios.get(getUserAddressesURL + `?customer_id=${cid}`)
    const userAddressList = response.data.customerDetails
    
    dispatch({
        type: 'GET_ADDRESSES',
        payload: userAddressList ? userAddressList : []
    })
}

export const addAddress = (address, customer_id) => async (dispatch) => {
    const thisAddress =  `${address.address}:${address.area}:${address.city}:${address.pincode}:${address.landMark}:${address.mobileNumber}:${address.Id}#`
    console.log(QueryString.stringify({
        address_list: thisAddress,
        customer_id: customer_id,
        customer_name: address.customerName
    }))
    axios.post(addUserAddressURL, QueryString.stringify({
        address_list: thisAddress,
        customer_id: customer_id,
        customer_name: address.customerName
    })).then(r => console.log(r.data)).catch(e => console.log(e))
    // dispatch({
    //     type: 'ADD_ADDRESS',
    //     payload: address
    // })
}

export const deleteAddress = (id) => async (dispatch) => {
    dispatch({
        type: 'DELETE_ADDRESS',
        payload: id
    })
}

export const editAddress = (address, customer_id) => async (dispatch) => {
    const thisAddress =  `${address.address}:${address.area}:${address.city}:${address.pincode}:${address.landmark}:${address.mobileNumber}:${address.Id}#`
    console.log(QueryString.stringify({
        address_list: thisAddress,
        customer_id: customer_id,
        customer_name: address.customerName
    }))
    axios.post(addUserAddressURL, QueryString.stringify({
        address_list: thisAddress,
        customer_id: customer_id,
        customer_name: address.customerName
    })).then(r => console.log(r.data)).catch(e => console.log(e))
    // dispatch({
    //     type: 'EDIT_ADDRESS',
    //     payload: address
    // })
}