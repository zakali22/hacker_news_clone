import React, { Component } from 'react'
import queryString from "query-string"
import {fetchUserData, fetchUserPosts} from "../../utils/api"
import moment from "moment"
import {Markup} from "interweave"
import {Link} from "react-router-dom"

class User extends Component {
    state = {
        user: null,
        userPosts: null
    }

    componentDidMount(){
        const value = this.props.location.search;
        const {id} = queryString.parse(value)
        
        fetchUserData(id).then(res => {
            this.setState({
                user: res
            }, () => {
                fetchUserPosts(this.state.user).then(res => {
                    console.log(res)
                    this.setState({
                        userPosts: res
                    })
                })
            })
        })
    }

    render() {

        let date, parser, htmlDoc, aboutBio;
        if(this.state.user){
            parser = new DOMParser();
            htmlDoc = parser.parseFromString(this.state.user.about, 'text/html');
            aboutBio = htmlDoc.body.innerHTML.split('<p>').join('<p>').replace('<br>', '')
        }

        return (
            <div className="user-page">
                <div className="container">
                    {this.state.user ? (
                        <React.Fragment>
                            <div className="user-page__content">
                                <h1><strong>{this.state.user.id}</strong></h1>
                                <p>joined <span className="meta-data">{moment(this.state.user.created, 'X').format('L LT')}</span> has <span className="meta-data">{this.state.user.karma}</span> karma</p>
                                {aboutBio !== "undefined" ? <Markup content={aboutBio} /> : null}
                            </div>
                            <div className="user-page__posts">
                                {this.state.userPosts && this.state.user ? (
                                    <React.Fragment>
                                        <h3>Posts</h3>
                                        {this.state.userPosts.length ? (
                                            this.state.userPosts.map(post => (
                                                !post['deleted'] ? (
                                                    <div key={post.id} className="post-listing__post">
                                                        <a href={post.url} className="post-listing__post-title">{post.title}</a>
                                                        <p className="post-listing__post-description">by <Link to={`/user?id=${post.by}`}>{post.by}</Link> {moment(post.time, 'X').format('L LT')}  with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link> comments</p>
                                                    </div>
                                                ) : null
                                            ))
                                        ) : (<p>This user hasn't posted yet</p>)}
                                    </React.Fragment>
                                ) : (<p>Loading posts</p>)}
                            </div>
                        </React.Fragment>
                    ) : <p>Loading user</p>}
                </div>
            </div>
        )
    }
}


export default User