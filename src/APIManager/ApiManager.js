import axios from 'axios'

const BASE_URL = "http://www.umamisquare.com/api"


//EndPoint
const Get_CardInfo_EndPoint = "/card_info"
const Update_SpendingLimit_EndPoint = "/update_limit"

// Get card info
export const Get_Card_Info_Request = async () => {
    return await axios.get(BASE_URL.concat(Get_CardInfo_EndPoint)).then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export const Update_Limit = async (
    id,card_limit
) => {
    return await axios.post(BASE_URL.concat(Update_SpendingLimit_EndPoint), {
        id: id,
        card_limit: card_limit,
    }).then(response => {
        return response
    }).catch(error => {
         return error
    })
}