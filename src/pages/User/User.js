import React, { Component } from 'react'
import queryString from "query-string"
import {fetchUserData, fetchUserPosts} from "../../utils/api"
import moment from "moment"
import {Markup} from "interweave"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {fetchUser, fetchPostsUser, resetUser} from "../../actions/userActions"

import PostsListing from '../../components/Posts/PostsListing'
import Loading from "../../components/Loading/Loading"
import {ThemeConsumer} from "../../context/Theme"

class User extends Component {

    componentDidMount(){
        const value = this.props.location.search;
        const {id} = queryString.parse(value)
        
        this.props.fetchUser(id)
        
    }

    componentWillUnmount(){
        this.props.resetUser();
    }

    render() {

        let date, parser, htmlDoc, aboutBio;
        const {users_data} = this.props;
        if(users_data.user){
            parser = new DOMParser();
            htmlDoc = parser.parseFromString(users_data.user.about, 'text/html');
            aboutBio = htmlDoc.body.innerHTML.split('<p>').join('<p>').replace('<br>', '')
        }

        return (
            <ThemeConsumer>
                {(value) => (
                    <div className={`user-page ${value.theme === 'dark' ? 'dark-theme' : ''}`}>
                        <div className="container">
                            {users_data.user ? (
                                <React.Fragment>
                                    <div className="user-page__content">
                                        <h1><strong>{users_data.user.id}</strong></h1>
                                        <p>joined <span className="meta-data">{moment(users_data.user.created, 'X').format('L LT')}</span> has <span className="meta-data">{users_data.user.karma}</span> karma</p>
                                        {aboutBio !== "undefined" ? <Markup content={aboutBio} /> : null}
                                    </div>
                                    <div className="user-page__posts post-listing">
                                        {users_data.user_posts && users_data.user ? (
                                            <React.Fragment>
                                                <h3>Posts</h3>
                                                <PostsListing posts={users_data.user_posts} />
                                            </React.Fragment>
                                        ) : (<Loading text='Loading posts'/>)}
                                    </div>
                                </React.Fragment>
                            ) : <Loading text='Loading user'/>}
                        </div>
                    </div>
                )}
            </ThemeConsumer>
        )
    }
}

const mapStateToProps = (state) => ({
    users_data: state.users_data
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPostsUser,
    fetchUser,
    resetUser
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(User)