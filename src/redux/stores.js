
import { configureStore } from "@reduxjs/toolkit";
import examSliceReducer from "./examSlice"

const store=configureStore({
    reducer:{
        exam:examSliceReducer
    }
})

export default store