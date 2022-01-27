import * as ACTIONTYPES from '../actionTypes'
import axios from 'axios'

const BASE_URL = "http://www.umamisquare.com/api"


//EndPoint
const Get_CardInfo_EndPoint = "/card_info"
const Update_SpendingLimit_EndPoint = "/update_limit"

export const GetCard = () => async dispatch => {
    try {
        return await axios.get(BASE_URL.concat(Get_CardInfo_EndPoint)).then(response => {
            dispatch({ type: ACTIONTYPES.GetCard, payload: response.data });
        }).catch(error => {
            console.log("error is =",error)
        })
    } catch (error) {
        console.log(error);
        //dispatch({ type: GET_LOGIN_FAILURE, payload: error });
    }
};
export const UpdateCardLimit = (id,card_limit) => async dispatch => {
    try {
        return await axios.post(BASE_URL.concat(Update_SpendingLimit_EndPoint), {
            id: id,
            card_limit: card_limit,
        }).then(response => {
            dispatch({ type: ACTIONTYPES.UpdateLimit, payload: true });
        }).catch(error => {
            console.log("error is =",error)
        })
    } catch (error) {
        console.log(error);
        //dispatch({ type: GET_LOGIN_FAILURE, payload: error });
    }
};
