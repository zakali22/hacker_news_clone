import React, {Component} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Nav from "../components/Nav/Nav"

/** Implement Code splitting - TODO */
import Home from "./Home/Home.js"
import User from "./User/User.js"
import Post from "./Post/Post.js"
import New from "./New/New.js"

class App extends Component {
    render(){
        return (
            <Router>
                <Nav />
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route path={"/user"} component={User} />
                    <Route path={"/post"} component={Post} />
                    <Route path={"/new"} component={New} />
                </Switch>
            </Router>
        )
    }
}

export default App