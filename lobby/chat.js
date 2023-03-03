import {
    WS,
    constructMessage
} from "../index.js"
import {
    message
} from "./message.js"
export class chat extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            input : ""
        }
	}

	componentWillUnmount() {

	}

	render() {
        let messages = []
        let sortedMessages = this.props.lobbyMessages.sort((a, b) => {
            return new Date(b.sentAt).valueOf() - new Date(a.sentAt).valueOf()
        })
        for(let i = 0; i < this.props.lobbyMessages.length; i++) {
            let messageData = sortedMessages[i]
            messages.push(React.createElement(message, {
                key : i,
                message : messageData,
                options : this.props.options,
                user : this.props.user,
            },))
        }
		return React.createElement("div", {
            style: {
                gap : "1vmin",
                borderRadius: ".4vmin",
                border: "solid " + (this.props.options.uiTheme === "light" ? "black " : "white ") + "1px",
                alignItems: "center",
                display: "flex",
                padding: "1vmin",
                flexDirection: "column",
                backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
            }
        },
            React.createElement("b", {
                style: {
                    alignItems: "center",
                    display: "flex",
                    fontSize : "2vmin",
                    flexDirection: "row",
                    marginBottom: "1vmin",
                }
            }, "lobby chat"),
            React.createElement("div", {
                key : 0,
                style  : {
                    overflowWrap : "break-word",
                    wordBreak : "break-all",
                    display : "flex",
                    height : "36vmin",
                    width : "48vmin",
                    alignItems : "flex-start",
                    flexDirection : "column",
                    border: "solid " + (this.props.options.uiTheme === "light" ? "black" : "white") + " 1px",
                    overflow: "scroll",
                    overflowX : "hidden",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    backgroundColor : this.props.options.uiTheme === "light" ? "white" : "#2e3033",
                    borderRadius: ".4vmin",
                }
            },
                messages,
            ),
            React.createElement("div", {
                style: {
                    display: "flex",
                    gap :".5vmin",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }
            },
                React.createElement("input", {
                    key : 0,
                    type: "text",
                    placeholder: "message",
                    onKeyDown: (e) => {
                        if(e.key === "Enter") {
                            WS.send(constructMessage("LM", [this.props.lobby.id, this.state.input]))
                            this.setState({input : ""})        
                        }
                    },
                    onChange : (e) =>{
                        this.setState({input : e.target.value})
                    },
                    value : this.state.input,
                    style: {
                        borderRadius  : ".4vmin",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2vmin",
                        width :"40vmin",
                        height : "2.8vmin"
                    }
                }, ),
                React.createElement("button", {
                    onClick : (e) => {
                        WS.send(constructMessage("LM", [this.props.lobby.id, this.state.input]))
                        this.setState({input : ""})
                    },
                    key : 1,
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2vmin",
                        width : "7vmin",
                        cursor: "pointer",
                    }
                }, "send")
            )
        )   
	}
}