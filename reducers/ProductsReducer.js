export const productsReducer = (state={}, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {...state, products: action.payload}
        case 'CLEAR_PRODUCTS':
            return {}
        default: 
            return state
    }
}

export default productsReducer