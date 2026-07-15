import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/Authslice";
import ProductReducer from "../slices/ProductSlice";

const Mystore = configureStore({
    reducer: {
        auth: AuthReducer,
        products: ProductReducer,
    },
});

export default Mystore;