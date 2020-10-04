import React, { Component } from 'react'
import {fetchTopNews} from "../../utils/api"
import {Link} from "react-router-dom"
import moment from "moment"

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
                        {posts.map(post => {
                            return (
                                <div key={post.id} className="post-listing__post">
                                    <a href={post.url} className="post-listing__post-title">{post.title}</a>
                                    <p>by <Link to={`/user?id=${post.by}`}>{post.by}</Link> {moment(post.time, 'X').format('L LT')}  with <Link to={`/post?id=${post.id}`}>{post.descendants}</Link> comments</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


export default Home
