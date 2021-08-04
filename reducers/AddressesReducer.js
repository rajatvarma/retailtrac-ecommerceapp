export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ADDRESSES':
            return action.payload
        default:
            return state;
    }
};