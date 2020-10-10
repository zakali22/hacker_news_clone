import React, {Component} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Nav from "../components/Nav/Nav"
import {ThemeProvider} from "../context/Theme"

/** Implement Code splitting - TODO */
import Home from "./Home/Home.js"
import User from "./User/User.js"
import Post from "./Post/Post.js"
import New from "./New/New.js"

class App extends Component {
    state = {
        theme: 'light',
        themeChange: () => {
            if(this.state.theme === 'light'){
                document.body.classList.add('dark-theme')
            } else {
                document.body.classList.remove('dark-theme')
            }
            this.setState((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            }))
        }
    }
    render(){
        return (
            <ThemeProvider value={this.state}>
                <Router>
                    <Nav />
                    <Switch>
                        <Route exact path={"/"} component={Home} />
                        <Route path={"/user"} component={User} />
                        <Route path={"/post"} component={Post} />
                        <Route path={"/new"} component={New} />
                    </Switch>
                </Router>
            </ThemeProvider>
        )
    }
}

export default App