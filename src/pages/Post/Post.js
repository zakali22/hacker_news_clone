import React, { Component } from 'react'
import {fetchPostItem, fetchPostComments} from "../../utils/api"
import queryString from "query-string"
import moment from "moment"
import {Link} from "react-router-dom"
import {Markup} from "interweave"

import CommentsListing from "../../components/Comments/CommentsListing"
import Loading from "../../components/Loading/Loading"

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
                    console.log(res)
                    this.setState({
                        comments: res ? (res.length ? res : []) : []
                    })
                })
            })
        })
    }

    render() {
        const {post, comments} = this.state;
        if(!post) return <Loading text='Loading posts'/>
        return (
            <div className="post-page">
                <div className="container">
                    <div className="post-page__content">
                        <a href={post.url}><h1 className="post__title"><strong>{post.title}</strong></h1></a>
                        <p className="post__description">by <Link to={`/user?id=${post.by}`}>{post.by}</Link> {moment(post.time, 'X').format('L LT')} has <span style={{color: '#000000'}}>{post.descendants}</span> karma</p>
                        <Markup content={post.text} />
                    </div>
                    <div className="post-page__post-listing post-listing">
                        {comments ? (
                            comments.length ? (
                                <CommentsListing comments={comments} />
                            ) : (<p>This post has no comments</p>)
                        ) : <Loading text='Loading comments'/> }
                    </div>
                </div>
            </div>
        )
    }
}


export default Post