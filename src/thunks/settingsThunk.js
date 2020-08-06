import axios from 'axios'
import url from '../environment/url'

export const contactUsRequest = ({ description, requestType }) => async (dispatch, getState) => {
    const state = getState()
    const { profile, subjects, semester } = state
    const { id, token, email } = profile
    try {
        const res = await axios.post(url + "/api/SupportLog/create",
            {
                userEmail: email,
                userId: id,
                description,
                requestType
            },
            {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (e) {
        console.log(e)
    }
}