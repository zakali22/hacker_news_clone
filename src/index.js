import React from "react"
import ReactDOM from "react-dom"
import App from "./pages/App"
import "./styles/index.scss"
import {createStore, applyMiddleware, compose} from "redux"
import {Provider} from "react-redux"
import rootReducer from "./reducers"
import thunk from "redux-thunk"
import logger from "redux-logger"

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middlewares)))

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
document.querySelector("#root"))