import React from "react"
import {FETCH_NEWS_STORIES} from "../actions/types"

const initialState = {
    news_stories_data: {
        news_stories_loaded: false,
        news_stories: JSON.parse(window.localStorage.getItem("new_stories")) || null
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_NEWS_STORIES:
            return {
                ...state,
                news_stories_loaded: true,
                news_stories: action.payload
            }
        default:
            return state
    }
}