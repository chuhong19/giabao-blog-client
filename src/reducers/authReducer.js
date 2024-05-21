import { SET_AUTH } from "../contexts/constants";

export const authReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, userId, username, email, firstname, lastname, gender }
    } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                userId,
                username,
                email,
                firstname,
                lastname,
                gender
            }

        default:
            return state;
    }

}