import React from "react"
import {FETCH_USER, FETCH_USER_POSTS, RESET_USER} from "./types"
import {fetchUserData, fetchUserPosts} from "../utils/api"

export const fetchUser = (id) => async (dispatch, getState) => (
    fetchUserData(id).then(res => {
        dispatch({
            type: FETCH_USER,
            payload: res
        })
    }).then(() => {
        const data = getState().users_data.user
        console.log(data)
        dispatch(fetchPostsUser(data))
    })
)

export const fetchPostsUser = (user) => async (dispatch) => (
    fetchUserPosts(user).then(res => {
        dispatch({
            type: FETCH_USER_POSTS,
            payload: res
        })
    })
)

export const resetUser = () => {
    return {
        type: RESET_USER
    }
}