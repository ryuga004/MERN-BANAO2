import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface UserType {
    id: string | null,
    username: string | null,
    email: string | null,
}
export interface UserDataType {
    user: UserType
}
const initialState: UserDataType = {
    user: {
        id: "",
        username: "",
        email: "",
    },
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUser: (state, action: PayloadAction<UserType>) => {
            const { id, username, email } = action.payload;
            state.user = { id, username, email };
        },
        clearUser: (state) => {
            state.user = {
                id: "",
                username: "",
                email: "",
            };
        },
    }
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;