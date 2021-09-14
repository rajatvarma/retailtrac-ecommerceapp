import { combineReducers } from "redux";
import categoriesReducer from "./CategoriesReducer"
import cartReducer from "./CartReducer";
import UserReducer from "./UserReducer";
import OrdersReducer, { OrderDetailsReducer } from "./OrdersReducer";
import imagesReducer from "./ImagesReducer";
import AddressesReducer from "./AddressesReducer";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    cart: cartReducer,
    orders: OrdersReducer,
    images: imagesReducer,
    addresses: AddressesReducer,
    orderDetails: OrderDetailsReducer,
    user: UserReducer
})

export default rootReducer