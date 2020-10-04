import React, { Component } from 'react'
import {fetchPostItem, fetchPostComments} from "../../utils/api"
import queryString from "query-string"
import moment from "moment"
import {Link} from "react-router-dom"
import {Markup} from "interweave"

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            post: JSON.parse(window.localStorage.getItem('post')) || null
        }
    }


    componentDidMount(){
        const value = this.props.location.search;
        const {id} = queryString.parse(value)
        fetchPostItem(id).then(res => {
            console.log(res)
            this.setState({
                post: res
            }, () => {
                window.localStorage.setItem('post', JSON.stringify(this.state.post))
                fetchPostComments(this.state.post).then(res => {
                    this.setState({
                        comments: res.length ? res : []
                    })
                })
            })
        })
    }

    render() {
        const {post, comments} = this.state;
        if(!post) return <p>Loading post</p>
        return (
            <div className="post-page">
                <div className="container">
                    <div className="post-page__content">
                        <a href={post.url}><h2><strong>{post.title}</strong></h2></a>
                        <p>by <Link to={post.by}>{post.by}</Link> {moment(post.time, 'X').format('L LT')} has {post.descendant} karma</p>
                        <Markup content={post.text} />
                    </div>
                    <div className="post-page__post-listing post-listing">
                        {comments ? (
                            comments.length ? (
                                this.state.comments.map(comment => {
                                    return (
                                        <div key={comment.id} className="comment-listing__post">
                                            <p>by <Link to={`/user?id=${comment.by}`}>{comment.by}</Link> on {moment(post.time, 'X').format('L LT')}</p>
                                            <Markup content={comment.text} />
                                        </div>
                                    )
                                })
                            ) : (<p>This post has no comments</p>)
                        ) : (<p>Loading comments</p>)}
                    </div>
                </div>
            </div>
        )
    }
}


export default Post