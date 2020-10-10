import React from "react"
import {Link} from "react-router-dom"
import moment from "moment"
import {ThemeConsumer} from "../../context/Theme"

const Post = ({post}) => (
    <ThemeConsumer>
        {(value) => (
            <div key={post.id} className={`post ${value.theme === 'dark' ? 'dark-theme' : ''}`}>
                <a href={post.url} className="post__title">{post.title}</a>
                <p className="post__description">by <Link to={`/user?id=${post.by}`}>{post.by}</Link> {moment(post.time, 'X').format('L LT')}  with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link> comments</p>
            </div>
        )}
    </ThemeConsumer>
)

export default Post