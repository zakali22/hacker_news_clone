import React, { Component } from 'react'
import {connect} from "react-redux"
import {fetchPosts} from "../../actions/postsActions"
import {bindActionCreators} from "redux"

import PostsListing from "../../components/Posts/PostsListing"
import Loading from "../../components/Loading/Loading"

class Home extends Component {

    componentDidMount(){
        
        const {posts_data, fetchPosts} = this.props;
        if(!posts_data.posts_loaded){
            fetchPosts();
        }
    }

    render() {
        console.log(this.props)
        const {posts_data} = this.props;
        if(!posts_data.posts_loaded){
            return <Loading text='Loading'/>
        }
        return (
            <div className="home">
                <div className="container">
                    <div className="post-listing">
                        <PostsListing posts={posts_data.posts}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts_data: state.posts_data
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchPosts
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
