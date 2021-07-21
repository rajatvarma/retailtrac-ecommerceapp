import { combineReducers } from "redux";
import productsReducer from "./ProductsReducer";
import categoriesReducer from "./CategoriesReducer"
import cartReducer from "./CartReducer";
import UserReducer from "./UserReducer";
import OrdersReducer, { OrderDetailsReducer } from "./OrdersReducer";

const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    orders: OrdersReducer,
    orderDetails: OrderDetailsReducer,
    user: UserReducer
})

export default rootReducer