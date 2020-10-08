import React, { Component } from 'react'
import {fetchNewStories} from "../../utils/api"
import {Link} from "react-router-dom"
import moment from "moment"

import Loading from "../../components/Loading/Loading"

class Home extends Component {
    state = {
        new_stories: null
    }

    componentWillMount(){
        this.setState({
            new_stories: JSON.parse(
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
        if(!new_stories) return <Loading text='Loading'/>
        return (
            <div className="home">
                <div className="container">
                    <div className="post-listing">
                        {new_stories.map(new_story => {
                            return (
                                <div key={new_story.id} className="post">
                                    {new_story.url ? (<a href={new_story.url} className="post__title">{new_story.title}</a>) : (<Link className="post__title" to={`/post?id=${new_story.id}`}>{new_story.title}</Link>) }
                                    <p className="post__description">by <Link to={`/user?id=${new_story.by}`}>{new_story.by}</Link> {moment(new_story.time, 'X').format('L LT')}  with <Link to={`/post?id=${new_story.id}`}>{new_story.descendants}</Link> comments</p>
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