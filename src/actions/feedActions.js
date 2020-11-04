export const SET_FEED = 'SET_FEED'
export const setFeed = (feed) => ({
    type: SET_FEED,
    payload: feed
})

export const SET_LASTSEEN = 'SET_LASTSEEN'
export const feedSeen = () => ({
    type: SET_LASTSEEN
})
