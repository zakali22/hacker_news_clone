import {FETCH_NEWS_STORIES, RESET_NEWS} from "./types"
import {fetchNewStories} from "../utils/api"

export const fetchNews = () => async (dispatch) => (
    fetchNewStories().then((res) => {
        window.localStorage.setItem("new_stories", JSON.stringify(res));

        dispatch({
            type: FETCH_NEWS_STORIES,
            payload: res
        })
    })
)

export const resetNews = () => {
    return {
        type: RESET_NEWS
    }
}