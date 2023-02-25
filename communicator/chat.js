import { constructMessage, WS } from "../index.js"
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

    contentHeight = () => {
        let comContent = this.props.options.comContent
        if(comContent == "friends"  || comContent === "block")
            return "80vmin"
        else if(comContent == "chats")
            return "40vmin"
        else return "85vmin"
    }

	render() {
        let messages = []
        let selectedFriend = this.props.friends.find(friend => friend.requesteeId === this.props.selectedChat || friend.requesterId === this.props.selectedChat)
        if(selectedFriend) {
            this.props.privateMessages.filter(PM => PM.senderId === selectedFriend.friend.id || PM.targetId === selectedFriend.friend.id).forEach((m, mi) => {
                messages.push(React.createElement(message, {
                    key : mi,
                    message : m,
                    user : this.props.user,
                    options : this.props.options,
                    stateChange : this.props.stateChange,
                    setOption : this.props.setOption,
                }))
            })
        }
        messages.reverse()
		return React.createElement("div", {
        },
            React.createElement("div", {
                key : 0,
                style  : {
                    overflowWrap : "break-word",
                    wordBreak : "break-all",
                    display : "flex",
                    height : "35vmin",
                    alignItems : "flex-start",
                    flexDirection : "column",
                    outline : "solid 1px",
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
                    outline: "solid " + (this.props.options.uiTheme === "light" ? "black" : "white") + " 1px",
                    height : "5vmin",
                    gap :".5vmin",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: ".4vmin", 
                    backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
                }
            },
                React.createElement("input", {
                    key : 0,
                    type: "text",
                    placeholder: "message",
                    onFocus : (e) => this.props.stateChange("messageInputSelected", true),
                    onBlur : (e) => this.props.stateChange("messageInputSelected", false),
                    onKeyDown: (e) => {
                        if(e.key === "Enter")
                            if(this.props.selectedChat) {
                                WS.send(constructMessage("PM", [this.props.selectedChat, this.state.input]))
                                this.setState({input : ""})
                               
                            }             
                    },
                    disabled : this.props.selectedChat ? null : {},
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
                        width :"33vmin"
                    }
                }, ),
                React.createElement("button", {
                    onClick : (e) => {
                        if(this.props.selectedChat) {
                             if(this.state.input.length > 0) {
                                WS.send(constructMessage("PM", [this.props.selectedChat, this.state.input]))
                                this.setState({input : ""})
                            }
                        }
                    },
                    key : 1,
                    disabled : this.props.selectedChat ? null : {},
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