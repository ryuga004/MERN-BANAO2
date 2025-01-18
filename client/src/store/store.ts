import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import postReducer from "./postSlice"
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {

        user: userReducer,
        posts: postReducer,
    },
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>