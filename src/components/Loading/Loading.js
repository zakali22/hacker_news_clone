import React from "react"
import {ThemeConsumer} from "../../context/Theme"

class Loading extends React.Component {
    state = {
        text: ''
    }

    componentDidMount(){
        this.setState({
            text: this.props.text
        }, () => {
            window.setInterval(() => {
                const endText = this.props.text + '...'
                if(this.state.text !== endText){
                    this.setState((state) => ({
                        text: state.text + '.'
                    }))
                } else {
                    this.setState({
                        text: this.props.text
                    })
                }
            }, 300)
        })

    }

    render(){
        return (
            <ThemeConsumer>
                {(value) => (
                    <div className="container">
                        <p className={`h1 loading-text ${value.theme === 'dark' ? 'dark-theme' : ''}`}>{this.state.text}</p>
                    </div>
                )}
            </ThemeConsumer>
        )
    }
}

export default Loading