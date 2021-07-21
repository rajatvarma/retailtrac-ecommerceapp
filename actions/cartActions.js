
export const updateCart = (item) => async (dispatch) => {
    dispatch({
        type: 'MODIFY_CART',
        payload: item
    })
}

export const deleteCartItem = (item) => async (dispatch) => {
    dispatch(
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: item
        })
    )
}

export const addCartItem = (item) => async (dispatch) => {
    dispatch({
        type: 'ADD_TO_CART',
        payload: item
    })
}

export const clearCart = () => async (dispatch) => {
    dispatch({
        type: 'CLEAR_CART'
    })
}