const initState = {}

const categoriesReducer = (state=initState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {...state, categories: action.payload}

        default: 
            return state
    }
}

export default categoriesReducer

