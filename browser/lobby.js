import {
	WS,
	constructMessage,
} from "../index.js"
export class lobby extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {
		return React.createElement("div", {
				style: {
					display: "flex",
                    flexDirection: "row",
					gap : "2vmin",
					alignItems: "center",
				}
			},
			React.createElement("div", {
				onClick : () => {
					if(confirm("join lobby " + this.props.lobby.lobbyName + "?"))
						WS.send(constructMessage("join", [this.props.lobby.lobbyId, this.props.lobby.passwordProtected ? prompt("enter password") : ""]))
				},
				style : {
					display : "flex",
					alignItems: "center",
					cursor :"pointer",
				}
			},
				React.createElement("img", {
					style : {
						width : "2vmin",
						height : "2vmin",
					},
					src : this.props.options.uiTheme == "dark"? "https://nodge.s3.eu-central-1.amazonaws.com/user_w.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/user_b.svg",
				},),
				React.createElement("b", {
					style : {
						fontSize : "2vmin",
					},
				}, this.props.lobby.userCount),
				this.props.lobby.passwordProtected ? React.createElement("img", {
					style : {
						width : "2.2vmin",
						height : "2.2vmin",
						marginLeft : "2vmin"
					},
					src : this.props.options.uiTheme == "dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/lock_b.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/lock_w.svg",
				}, ) : 
				React.createElement("div", {
					style : {
						width : "2.2vmin",
						height : "2.2vmin",
						marginLeft : "2vmin"
					},
				})
			),
			React.createElement("div", {
				style : {
					cursor :"pointer",
				},
				onClick : () => {
					if(confirm("join lobby " + this.props.lobby.lobbyName + "?"))
						WS.send(constructMessage("join", [this.props.lobby.lobbyId, this.props.lobby.passwordProtected ? prompt("enter password") : ""]))
				},
			}, this.props.lobby.lobbyName),
			React.createElement("b", {
				onClick : () => {
					WS.send(constructMessage("profile", [this.props.lobby.leaderName]))
				},
				style : {
					display : "flex",
					alignItems: "center",
					cursor :"pointer",
				}
			},
				React.createElement("img", {
					style : {
						width : "2vmin",
						height : "2vmin",
					},
					src : this.props.options.uiTheme =="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/crown_white.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/crown_black.svg",
				}),
				React.createElement("div", {

				},
					this.props.lobby.leaderName
				)
			),
		)
	}
} 