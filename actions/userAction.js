import { getUserData } from "../userStorage"

export const getUser = async (dispatch) => {
    const userData = getUserData(user)
    
    dispatch({
        type: "GET_USER",
        payload: userData
    })
}

export const setUser = (data) => async (dispatch) => {
    dispatch({
        type: 'SET_USER',
        payload: data
    })
}