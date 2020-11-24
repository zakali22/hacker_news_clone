import React, { Component } from 'react'
import {fetchPostItem, fetchPostComments} from "../../utils/api"
import queryString from "query-string"
import moment from "moment"
import {Link} from "react-router-dom"
import {Markup} from "interweave"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {fetchPost, fetchCommentsPost, resetPosts} from "../../actions/postsActions"

import CommentsListing from "../../components/Comments/CommentsListing"
import Loading from "../../components/Loading/Loading"
import {ThemeConsumer} from "../../context/Theme"

class Post extends Component {

    componentDidMount(){
        const value = this.props.location.search;
        const {id} = queryString.parse(value)

        this.props.fetchPost(id)
    }

    componentWillUnmount(){
        this.props.resetPosts();
    }

    render() {
        const {posts_data: {post, post_loaded}} = this.props;
        if(!post_loaded) return <Loading text='Loading posts'/>
        return (
            <ThemeConsumer>
                {(value) => (
                    <div className={`post-page ${value.theme === 'dark' ? 'dark-theme' : ''}`}>
                        <div className="container">
                            <div className="post-page__content">
                                <a href={post.url}><h1 className="post__title"><strong>{post.title}</strong></h1></a>
                                <p className="post__description">by <Link to={`/user?id=${post.by}`}>{post.by}</Link> {moment(post.time, 'X').format('L LT')} has <span style={{color: '#000000'}}>{post.descendants}</span> karma</p>
                                <Markup content={post.text} />
                            </div>
                            <div className="post-page__post-listing post-listing">
                                {post.comments ? (
                                    post.comments.length ? (
                                        <CommentsListing comments={post.comments} />
                                    ) : (<p>This post has no comments</p>)
                                ) : <Loading text='Loading comments'/> }
                            </div>
                        </div>
                    </div>
                )}
            </ThemeConsumer>
        )
    }
}


const mapStateToProps = (state) => ({
    posts_data: state.posts_data
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchPost,
    fetchCommentsPost,
    resetPosts
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post)