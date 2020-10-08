import React from "react"

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
            }, 600)
        })

    }

    render(){
        return (
            <div className="container">
                <p className="h1 loading-text">{this.state.text}</p>
            </div>
        )
    }
}

export default Loading