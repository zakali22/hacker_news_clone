import React, { Component } from 'react'
import {Link} from "react-router-dom"
import moment from "moment"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {fetchNews, resetNews} from "../../actions/newsActions"

import Loading from "../../components/Loading/Loading"

class New extends Component {

    componentDidMount(){
        const {news_data: {news_stories_loaded}, fetchNews} = this.props;
        if(!news_stories_loaded){
            fetchNews();
        }
    }

    componentWillUnmount(){
        this.props.resetNews();
    }

    render() {
        const {news_data: {news_stories_loaded, news_stories}} = this.props;
        if(!news_stories_loaded) return <Loading text='Loading'/>
        return (
            <div className="home">
                <div className="container">
                    <div className="post-listing">
                        {news_stories.map(new_story => {
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

const mapStateToProps = (state) => ({
    news_data: state.news_data
})

const mapDispatchToProps = dispatch => bindActionCreators({
   fetchNews,
   resetNews
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(New)