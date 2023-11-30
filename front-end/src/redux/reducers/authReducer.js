import ACTIONS from "../actions/actionType"

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                token: null,
                isLogged: false,
            };

        default:
            return state
    }
}


export default authReducer