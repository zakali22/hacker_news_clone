import React, { Component } from 'react'
import {fetchNewStories} from "../../utils/api"
import {Link} from "react-router-dom"

class Home extends Component {
    state = {
        new_stories: null
    }

    componentWillMount(){
        this.setState({
            posts: JSON.parse(
                window.localStorage.getItem("new_stories")
              ) || null
        })
    }

    componentDidMount(){
        console.log(this.props)
        fetchNewStories().then((res) => {
            console.log(res)
            this.setState({
                new_stories: res
            }, () => {
                window.localStorage.setItem("new_stories", JSON.stringify(this.state.new_stories));
            })
        })
    }

    render() {
        const {new_stories} = this.state;
        if(!new_stories) return <p>Loading</p>
        return (
            <div className="home">
                <div className="container">
                    <div className="post-listing">
                        {new_stories.map(new_story => {
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