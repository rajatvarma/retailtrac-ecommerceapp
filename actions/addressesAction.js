import { getUserData, saveUserData } from "../userStorage"

export const getAddresses = () => async (dispatch) => {
    try {
        var addresses = await getUserData('addresses')
        var userAddressList = JSON.parse(addresses).addressList
    } catch (error) {
        console.log(error)
    }

    dispatch({
        type: 'GET_ADDRESSES',
        payload: userAddressList ? userAddressList : []
    })
}

export const addAddress = (address) => async (dispatch) => {
    try {
        let addresses = await getUserData('addresses')
        var userAddressList = JSON.parse(addresses).addressList
        userAddressList.push({...address, id: Date.now()})
        saveUserData('addresses', JSON.stringify({addressList: userAddressList}))

    } catch (error) {
        console.log(error)
        let userAddressList = []
        addresses.push({...address, id: Date.now()})
        saveUserData('addresses', JSON.stringify({addressList: userAddressList}))
    }

    dispatch({
        type: 'GET_ADDRESSES',
        payload: userAddressList ? userAddressList : []
    })
}

export const deleteAddress = (id) => async (dispatch) => {
    try {
        var addresses = await getUserData('addresses')
        var userAddressList = JSON.parse(addresses).addressList
        var newAddresses = []
        userAddressList.forEach(element => {
            if (element.id !== id) {
                newAddresses.push(element)
            }   
        });
    } catch (error) {
        console.log(error)
    }

    dispatch({
        type: 'GET_ADDRESSES',
        payload: newAddresses
    })

    await saveUserData('addresses', JSON.stringify({'addressList': newAddresses}))
    
}

export const editAddress = (address) => async (dispatch) => {
    try {
        var addresses = await getUserData('addresses')
        var userAddressList = JSON.parse(addresses).addressList
        const addressIndex = userAddressList.findIndex(element => element.id == address.id)
        var newAddresses = [...userAddressList]
        newAddresses[addressIndex] = {...address, id: address.id}
    } catch (error) {
        console.log(error)
    }

    dispatch({
        type: 'GET_ADDRESSES',
        payload: newAddresses
    })

    await saveUserData('addresses', JSON.stringify({'addressList': newAddresses}))
}