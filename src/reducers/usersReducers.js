import React from "react"
import {FETCH_USER, FETCH_USER_POSTS, RESET_USER} from "../actions/types"

const initialState = {
    user: null,
    user_posts: null
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_USER:
            return {
                ...state, 
                user: action.payload
            }
        case FETCH_USER_POSTS:
            return {
                ...state,
                user_posts: action.payload
            }
        case RESET_USER:
            return {
                ...state,
                user: null,
                user_posts: null
            }
        default: 
            return state
    }
}