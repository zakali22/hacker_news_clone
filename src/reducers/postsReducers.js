import React from "react"
import {FETCH_POSTS, FETCH_POST, FETCH_POST_COMMENTS} from "../actions/types"

const initialState = {
    posts_loaded: false, 
    posts: JSON.parse(window.localStorage.getItem("posts")) || null,
    post: JSON.parse(window.localStorage.getItem('post')) || null,
    post_loaded: false
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_POSTS:
            return {
                ...state,
                posts_loaded: true,
                posts: action.payload
            }
        case FETCH_POST:
            return {
                ...state,
                post: action.payload,
                post_loaded: true
            }
        case FETCH_POST_COMMENTS:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: action.payload
                }
            }
        default: 
            return state
    }
}