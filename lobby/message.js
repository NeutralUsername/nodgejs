import {
    WS,
    constructMessage
}from "../index.js"
export class message extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return React.createElement("div", {
            style : {
                display : "flex",
                width : "46vmin",
                justifyContent : "flex-" + (this.props.message.senderId == this.props.user.id ? "end" : "start"),
            }
        },
            React.createElement("div", { 
                onClick : () => {
                    WS.send(constructMessage("profile", [this.props.message.senderId == this.props.user.id ? this.props.user.name : this.props.message.senderName]))
                },
                style: {
                    maxWidth : "35vmin",
                    display : "flex",
                    flexDirection : "column",
                    padding : ".25vmin",
                    alignItems : "start",
                    paddingLeft : "1vmin",
                    paddingRight : "1vmin",
                    marginTop : ".5vmin",
                    justifyContent : "flex-" + (this.props.message.senderId == this.props.user.id ? "end" : "start"),
                    borderRadius : "1vmin",
                    border : "1px solid "+(this.props.options.uiTheme == "light" ? "black": "gainsboro"),
                    cursor : "pointer",
                    backgroundColor : this.props.options.uiTheme == "light" ? "gainsboro" : ""
                }
            },
                React.createElement("i", {
                    style : {
                        fontSize : "1.5vmin",
                    }
                },(this.props.message.senderId == this.props.user.id ? "you" : this.props.message.senderName)+":"),
                React.createElement("b", {
                    style : {
                        fontSize : "1.7vmin",
                    }
                },
                    this.props.message.content
                )
            )
        )
	}
} 
