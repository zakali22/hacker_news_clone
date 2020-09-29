import React, {Component} from "react"
import {fetchTopNews, fetchUserData, fetchUserPosts, fetchPostComments} from "../utils/api.js"

class App extends Component {
    state = {
        posts: null
    }

    componentDidMount(){
        fetchTopNews().then(res => {
            fetchUserData(res[0].by).then(res => {
                fetchUserPosts(res).then(res => {
                    fetchPostComments(res[1]).then(res => {
                        // console.log(res)
                    })
                })
            })
        })
    }

    render(){
        return (
            <div>{}</div>
        )
    }
}

export default App