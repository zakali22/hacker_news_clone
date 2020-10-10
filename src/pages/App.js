import React, {Component, Suspense, lazy} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Nav from "../components/Nav/Nav"
import {ThemeProvider} from "../context/Theme"
import Loading from "../components/Loading/Loading"

const Home = lazy(() => import("./Home/Home.js"))
const User = lazy(() => import("./User/User.js"))
const Post = lazy(() => import("./Post/Post.js"))
const New = lazy(() => import("./New/New.js"))


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
                <Suspense fallback={<Loading />}>
                    <Router>
                        <Nav />
                        <Switch>
                            <Route exact path={"/"} component={Home} />
                            <Route path={"/user"} component={User} />
                            <Route path={"/post"} component={Post} />
                            <Route path={"/new"} component={New} />
                        </Switch>
                    </Router>
                </Suspense>
            </ThemeProvider>
        )
    }
}

export default App