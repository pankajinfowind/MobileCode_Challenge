import * as ACTIONTYPES from '../actionTypes'

export const initialState = {
    cardInfo: {},
    isLimitUpdated: false
};
export default function auth(state = initialState, action) {
    console.log(action.payload);
    switch (action.type) {
        case ACTIONTYPES.GetCard:
            return {
                ...state,
                cardInfo: action.payload,
            };
        case ACTIONTYPES.UpdateLimit:
            return {
                ...state,
                isLimitUpdated: action.payload,
            };

        default:
            return state;
    }
}
