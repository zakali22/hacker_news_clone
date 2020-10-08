import React from "react"
import {Link} from "react-router-dom"
import moment from "moment"
import {Markup} from "interweave"

const Comment = ({comment}) => (
    <div key={comment.id} className="comment-listing__post">
        <p className="post__description">by <Link to={`/user?id=${comment.by}`}>{comment.by}</Link> on {moment(comment.time, 'X').format('L LT')}</p>
        <Markup content={comment.text} />
    </div>
)

export default Comment