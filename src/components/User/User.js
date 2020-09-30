import React, { Component } from 'react'
import queryString from "query-string"
import {fetchUserData} from "../../utils/api"
import moment from "moment"
import {Markup} from "interweave"

class User extends Component {
    state = {
        user: null
    }

    componentDidMount(){
        const value = this.props.location.search;
        const {id} = queryString.parse(value)
        
        fetchUserData(id).then(res => {
            console.log(res)
            this.setState({
                user: res
            })
        })
    }

    render() {
        if(!this.state.user) return <p>Loading</p>

        const date = moment(this.state.user.created, 'X').format('L LT');
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(this.state.user.about, 'text/html');
        let aboutBio = htmlDoc.body.innerHTML.split('<p>').join('<p>').replace('<br>', '')
        

        return (
            <div className="user-page">
                <div className="container">
                    <div className="user-page__content">
                        <h2><strong>{this.state.user.id}</strong></h2>
                        <p>joined {date} has {this.state.user.karma} karma</p>
                        <Markup content={aboutBio} />
                    </div>
                </div>
            </div>
        )
    }
}


export default User