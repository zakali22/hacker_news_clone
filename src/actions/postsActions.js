import {FETCH_POSTS, FETCH_POST, FETCH_POST_COMMENTS, RESET_POST} from "./types"
import {fetchTopNews, fetchPostItem, fetchPostComments} from "../utils/api"

export const fetchPosts = () => async (dispatch) => (
    fetchTopNews().then((res) => {
        window.localStorage.setItem("posts", JSON.stringify(res));
        dispatch({
            type: FETCH_POSTS,
            payload: res
        })         
    })
)

export const fetchPost = (id) => async (dispatch, getState) => (
    fetchPostItem(id).then(res => {
        window.localStorage.setItem('post', JSON.stringify(res))
        dispatch({
            type: FETCH_POST,
            payload: res
        })
    }).then(() => {
        let data = getState().posts_data.post
        console.log(data)
        dispatch(fetchCommentsPost(data))
    })
)

export const fetchCommentsPost = data => async (dispatch, getState) => (
    fetchPostComments(data).then(res => {
        dispatch({
            type: FETCH_POST_COMMENTS,
            payload: res
        })
    })
)

export const resetPosts = () => {
    return {
        type: RESET_POST
    }
}