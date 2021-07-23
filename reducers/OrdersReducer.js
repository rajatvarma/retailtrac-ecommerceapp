const OrdersReducer = (state=[], action) => {
    switch (action.type) {
        case 'GET_ORDERS':
            return action.payload
    
        default:
            return state
    }
}

export const OrderDetailsReducer = (state=[], action) => {
    switch (action.type) {
        case 'GET_ORDER_DETAILS':
            console.log("Reducer", action.payload)
            return action.payload
    
        default:
            return state
    }
}

export default OrdersReducer