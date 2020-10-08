import React, { Component } from 'react'
import {fetchTopNews} from "../../utils/api"
import {Link} from "react-router-dom"
import moment from "moment"

import PostsListing from "../../components/Posts/PostsListing"

class Home extends Component {
    state = {
        posts: null
    }

    componentWillMount(){
        this.setState({
            posts: JSON.parse(
                window.localStorage.getItem("posts")
              ) || null
        })
    }

    componentDidMount(){
        // console.log(this.props)
        fetchTopNews().then((res) => {
            console.log(res)
            this.setState({
                posts: res
            }, () => {
                window.localStorage.setItem("posts", JSON.stringify(this.state.posts));
            })
        })
    }

    render() {
        const {posts} = this.state;
        if(!posts) return <p>Loading</p>
        return (
            <div className="home">
                <div className="container">
                    <div className="post-listing">
                        <PostsListing posts={posts}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home
