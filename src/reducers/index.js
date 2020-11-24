import {combineReducers} from "redux"
import postsReducers from "./postsReducers"
import newsReducers from "./newsReducers"
import usersReducers from "./usersReducers"

export default combineReducers({
    posts_data: postsReducers,
    news_data: newsReducers,
    users_data: usersReducers
})