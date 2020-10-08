import React from "react"
import Comment from "./Comment"

const CommentsListing = ({comments}) => (
    comments.map((comment, id) => {
        return (
            <Comment comment={comment} key={id} />
        )
    })
)

export default CommentsListing