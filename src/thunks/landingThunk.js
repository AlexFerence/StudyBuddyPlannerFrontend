import axios from 'axios'
import url from '../environment/url'
import { updatePremiumStats } from '../actions/premiumStatsActions'

export const loadIGFeed = () => async (dispatch, getState) => {
    const state = getState()
    const { profile, premiumStats } = state
    const { id, token } = profile
    const { taskTypeSelect, subjectSelect } = premiumStats
    try {
        const res = await axios.get('https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/p/CGLpaOxHOq8/&access_token=984381228711095|9ff285d0e093d054c0a75a0a62920579')
        return res.data
    } catch (e) {
        return (e)
    }
}