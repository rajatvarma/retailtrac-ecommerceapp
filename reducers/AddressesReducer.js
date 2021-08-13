import axios from "axios";
import QueryString from "qs";
import { addUserAddressURL } from "../apiCalls";

export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ADDRESSES':
            return action.payload
        case 'ADD_ADDRESS':
            return [...state, action.payload]
        case 'DELETE_ADDRESS':
            var newAddresses = []
            state.forEach(element => {
                if (element.Id !== action.payload) {
                    console.log(element)
                    newAddresses.push(element)
                }   
            });
            return newAddresses
        case 'EDIT_ADDRESS':
            const addressIndex = state.findIndex(element => element.Id == action.payload.Id)
            var newAddresses = [...state]
            newAddresses[addressIndex] = action.payload
            return newAddresses
        default:
            return state;
    }
};