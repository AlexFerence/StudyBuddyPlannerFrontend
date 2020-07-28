import axios from 'axios'
import url from '../environment/url'
import { setCharts } from '../actions/chartActions'

export const loadChartsThunk = () => async (dispatch, getState) => {
    try {
        const res = await axios.post(url + '/api/SubjectCharts/listsubjecttotalhours',
        {
            userId: id,
        }, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            console.log(res.data)
            //logic to manipulate charts here
        }


    } catch (e) {
        return(e)
    }
}
