import React, { Component } from 'react'
import propTypes from "prop-types"
import Post from "./Post"

const PostsListing = ({posts}) => (
    <React.Fragment>
        {posts.length ? 
            posts.map((post, id) => {
                return (
                    <Post key={id} post={post}/>
                )
            })
        : (<p>This user hasn't posted yet</p>)}
    </React.Fragment>
)

// PostsListing.propTypes = {
//     posts: PropTypes.array.isRequired
// }

export default PostsListing