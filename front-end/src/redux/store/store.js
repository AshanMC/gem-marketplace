import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice.js";
import productReducer from "../slices/products/productSlice";
import categoryReducer from "../slices/categories/categorySlice";
import articleReducer from "../slices/articles/articleSlice";
import accessoryReducer from "../slices/accessories/accessorySlice";
import cartReducer from "../slices/Cart/cartSlice.js";
import orderReducer from "../slices/orders/orderSlice.js";
import dashboardReducer from "../slices/dashboard/dashboardSlice.js";
import gemRequestReducer from "../slices/gemRequests/gemRequestSlice";

//store
const store = configureStore({
    reducer:{
        users: usersReducer,
        products: productReducer,
        product: productReducer,
        categories: categoryReducer,
        articles: articleReducer,
        accessories: accessoryReducer,
        cart: cartReducer,
        orders: orderReducer,
        dashboard: dashboardReducer,
        gemRequest: gemRequestReducer,

    },
});


export default store;