import React from "react"
import {Link} from "react-router-dom"
import moment from "moment"

const Post = ({post}) => (
    <div key={post.id} className="post">
        <a href={post.url} className="post__title">{post.title}</a>
        <p className="post__description">by <Link to={`/user?id=${post.by}`}>{post.by}</Link> {moment(post.time, 'X').format('L LT')}  with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link> comments</p>
    </div>
)

export default Post