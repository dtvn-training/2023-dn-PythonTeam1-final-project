import buildAPI from "../../const/buildAPI";
import ACTIONS from "./actionType";

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    };
};

export const dispatchLogout = () => {
    return {
        type: ACTIONS.LOGOUT
    };
};

export function validateToken() {
    return async function validateTokenThunk(dispatch) {
        try {
            const response = await buildAPI.get("auth/checkTokenExpired")
            if (response.status === 200)
                dispatch(dispatchLogin())
        } catch {
            dispatch(dispatchLogout())
        }

    }
}