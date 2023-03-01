import {
    constructMessage,
    WS
} from "../index.js"
import {
    user, 
} from "./user.js"
import {
    invite
} from "./invite.js"

export class users extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            input : ""
        }
	}

	componentWillUnmount() {

	}

	render() {
        let users = []
        let sortedLoobyUsers = this.props.lobby.members.sort((a, b) => {
            if(a.name < b.name) return -1
            if(a.name > b.name) return 1
            return 0
        })
        //put leader at top of list
        for(let i = 0; i < sortedLoobyUsers.length; i++) {
           if(sortedLoobyUsers[i].id == this.props.lobby.leaderId) {
                let temp = sortedLoobyUsers[0]
                sortedLoobyUsers[0] = sortedLoobyUsers[i]
                sortedLoobyUsers[i] = temp
                break
           }
        }
        for(let i = 0; i < this.props.lobby.members.length; i++) {
            let lobby_user = this.props.lobby.members[i]
            users.push(React.createElement(user, {
                key : lobby_user.id+ " "+ new Date().toISOString(),
                lobbyUser : lobby_user,
                user : this.props.user,
                options : this.props.options,
                lobby : this.props.lobby,
                lobbyMessages : this.props.lobbyMessages,
            }))
        }
        for(let i = 0; i < this.props.lobby.currentInvites.length; i++) {
            let invite_data = this.props.lobby.currentInvites[i]
            users.push(React.createElement(invite, {
                key : invite_data.id,
                invite : invite_data,
                user : this.props.user,
                options : this.props.options,
            }))
        }
        return React.createElement("div", {
                style: {
                    gap : "1vmin",
                    borderRadius: ".4vmin",
                    border: "solid " + (this.props.options.uiTheme === "light" ? "black " : "white ") + "1px",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
                    padding: "1vmin",
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
            }, "lobby users"),
            React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor : this.props.options.uiTheme === "light" ? "white" : "#2e3033",
                    border : "solid " + (this.props.options.uiTheme === "light" ? "black " : "white ") + "1px",
                    overflow : "scroll",
                    width : "30vmin",
                    height : "36vmin"
                }
            },
                users
            ),
            React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",

                }
            },
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
                        placeholder: "name",
                        onKeyDown: (e) => {
                            if(e.key === "Enter") {
                                if(this.state.input.length < 2) return
                                WS.send(constructMessage("invite", [this.state.input]))
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
                            width :"22vmin",
                            height : "2.8vmin"
                        }
                    }, ),
                    React.createElement("button", {
                        onClick : (e) => {
                            if(this.state.input.length < 2) return
                            WS.send(constructMessage("invite", [this.state.input]))
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
                    }, "invite")
                )
            )
        )
	}
}