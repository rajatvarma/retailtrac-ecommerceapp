const cartReducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload]
        
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.item_code !== action.payload.item_code)
        
        case 'MODIFY_CART':
            const item_index = state.findIndex(element => element.item_code == action.payload.item_code)
            let newState = [...state]
            newState[item_index] = action.payload
            return newState
        case 'CLEAR_CART':
            return []
        default:
            return state
    }
}

export default cartReducer