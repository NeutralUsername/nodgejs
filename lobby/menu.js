import {
	WS,
	constructMessage
} from "../index.js"

export class menu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hide : true
		}
	}

	componentWillUnmount() {

	}

	render() {
		let isLeader = this.props.user.id == this.props.lobby.leaderId
		return React.createElement("div", {
				style: {
					gap : "3vmin",
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
				}
			}, "lobby menu"),

			React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "row",
					width: "100%",
					
				}
			}, 
				React.createElement("div", {
					style : {
						display : "flex",
						width : "50%",
						justifyContent : "flex-start",
					}
				},
					React.createElement("b", {	
						onClick : () => this.props.setOption("playMode" , this.props.options.playMode = "matchmaking"),
						style : {
							display : "flex",
							height : "2.2vmin",
							fontSize : "1.8vmin",
							cursor : !isLeader ? "default" : "pointer",
						}
					}, "matchmaking"),
					React.createElement("input", {
						type : "radio",
						name : "mode",
						onChange : () => {
							this.props.setOption("playMode" , this.props.options.playMode = "matchmaking")
						},
						checked : this.props.options.playMode == "matchmaking",
						style : {
							display : "flex",
							fontSize : "1.8vmin",
							height : "2.2vmin",
							width : "2.2vmin",
							cursor : !isLeader ? "default" : "pointer",
						}
					},),
				),
				React.createElement("div", {
					style : {
						display : "flex",
						width : "50%",
						justifyContent : "flex-end",
					}
				},
					React.createElement("b", {	
						onClick : () => this.props.setOption("playMode" , this.props.options.playMode = "custom"),
						style : {
							display : "flex",
							height : "2.2vmin",
							fontSize : "1.8vmin",
							cursor : !isLeader ? "default" : "pointer",
						}
					}, "custom"),
					React.createElement("input", {
						type : "radio",
						name : "mode",
						onChange : () => {
							this.props.setOption("playMode" , this.props.options.playMode = "custom")
						},
						checked : this.props.options.playMode == "custom",
						style : {
							display : "flex",
							fontSize : "1.8vmin",
							height : "2.2vmin",
							width : "2.2vmin",
							cursor : !isLeader ? "default" : "pointer",

						}
					},),
				),
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
					type: "text",
					placeholder: "lobby name",
					onChange : (e) => {
						this.setState({lobbyNameInput : e.target.value})
					},
					value : this.state.lobbyNameInput == undefined ? this.props.lobby.name : this.state.lobbyNameInput,
					style: {
						borderRadius  : ".4vmin",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "2vmin",
						width :"21.7vmin",
						height : "2.8vmin"
					}
				}, ),
				React.createElement("button", {
					disabled : !isLeader,
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "2vmin",
						width : "7vmin",
						cursor : !isLeader ? "default" : "pointer",
					},
					onClick : () => {
						WS.send(constructMessage("lobby_name", [this.state.lobbyNameInput]))
					}
				}, "set")
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
					type : this.state.hide ? "password" :"text",
					placeholder : "lobby password",
					onChange : (e) => {
						this.setState({lobbyPasswordInput : e.target.value})
					},
					value : this.state.lobbyPasswordInput == undefined ? this.props.lobby.password : this.state.lobbyPasswordInput,
					style: {
						borderRadius  : ".4vmin",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "2vmin",
						width :"21.7vmin",
						height : "2.8vmin"
					}
				}, ),
				React.createElement("button", {
					disabled : !isLeader,
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "2vmin",
						width : "7vmin",
						cursor : !isLeader ? "default" : "pointer",
					},
					onClick : () => {
						WS.send(constructMessage("lobby_password", [this.state.lobbyPasswordInput]))
					}
				}, "set")
			),
			React.createElement("div", {
				style : {
					marginLeft : "-25vmin",
					marginTop : "-3vmin",
					display : "flex",
					flexDirection : "row",
					justifyContent : "center",
				}
			},
				React.createElement("input", {
					type : "checkbox",
					checked : this.state.hide,
					onChange : () => {
						this.setState({hide : !this.state.hide})
					},
					style : {
						cursor : "pointer",
						width : "1.5vmin",
						height : "1.5vmin",
						marginTop : ".5vmin",
					}
				},
				),
				React.createElement("div", {
					style : {
						cursor : "pointer",
						fontSize : "1.8vmin",
					},
					onClick : () => {
						this.setState({hide : !this.state.hide})
					}
				},
					"hide",
				),
			),

			React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "row",
					width: "100%",
					
				}
			}, 
				React.createElement("div", {
					style : {
						display : "flex",
						width : "50%",
						justifyContent : "center",
					}
				},
					React.createElement("b", {	
						style : {
							display : "flex",
							height : "2.2vmin",
							fontSize : "1.8vmin",
							cursor : "pointer"
						},
						onClick : () => {
							WS.send("lobby_public")
						}
					}, "public"),
					React.createElement("input", {
						type : "checkbox",
						checked : this.props.lobby.public,
						disabled : !isLeader,
						onChange : () => {
							WS.send("lobby_public")
						},
						style : {
							display : "flex",
							fontSize : "1.8vmin",
							height : "2.2vmin",
							width : "2.2vmin",
							cursor : !isLeader ? "default" : "pointer",
						}
					},),
				),
				React.createElement("div", {
					style : {
						display : "flex",
						width : "50%",
						justifyContent : "center",
					}
				},
					React.createElement("b", {	
						style : {
							display : "flex",
							height : "2.2vmin",
							fontSize : "1.8vmin",
							cursor : "pointer"
						},
						onClick : () => {
							WS.send("lobby_protected")
						}
					}, "password"),
					React.createElement("input", {
						type : "checkbox",
						checked : this.props.lobby.passwordProtected,
						disabled : !isLeader,
						onChange : () => {
							WS.send("lobby_protected")
						},
						style : {
							display : "flex",
							fontSize : "1.8vmin",
							height : "2.2vmin",
							width : "2.2vmin",
							cursor : !isLeader ? "default" : "pointer",
						}
					},),
				),
			),

			React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "row",
					width: "100%",
					
				}
			}, 
				React.createElement("div", {
					style : {
						display : "flex",
						width : "50%",
						justifyContent : "center",
					}
				},
					React.createElement("b", {	
						style : {
							display : "flex",
							height : "2.2vmin",
							fontSize : "1.8vmin",
							cursor : "pointer"
						},
						onClick : () => {
							WS.send("lobby_invites")
						}
					}, "invites"),
					React.createElement("input", {
						type : "checkbox",
						checked : this.props.lobby.invites,
						disabled : !isLeader,
						onChange : () => {
							WS.send("lobby_invites")
						},
						style : {
							display : "flex",
							fontSize : "1.8vmin",
							height : "2.2vmin",
							width : "2.2vmin",
							cursor : !isLeader ? "default" : "pointer",
						}
					},),
				),
				React.createElement("div", {
					style : {
						display : "flex",
						width : "50%",
						justifyContent : "center",
					}
				},
					React.createElement("b", {	
						style : {
							display : "flex",
							height : "2.2vmin",
							cursor : "pointer"
						},
						onClick : () => {
							WS.send("lobby_cancels")
						}
					}, "cancels"),
					React.createElement("input", {
						type : "checkbox",
						checked : this.props.lobby.cancels,
						disabled : !isLeader,
						onChange : () => {
							WS.send("lobby_cancels")
						},
						style : {
							display : "flex",
							fontSize : "1.8vmin",
							height : "2.2vmin",
							width : "2.2vmin",
							cursor :!isLeader ? "default" : "pointer",
						}
					},),
				),
			),

			/* React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "column",
					alignItems : "center",
				
				}
			},
				React.createElement("button", {
					style : {
						fontSize : "1.8vmin",
						width : "16vmin",
						height : "4vmin",
						whiteSpace: "nowrap",
						overflow: "hidden",
						cursor :this.props.lobby.invites == false ? "default" :  "pointer",
					},
					disabled : this.props.lobby.invites == false,
					onClick : () => {
						this.setState({linkedCopied : true})
						/* navigator.clipboard.writeText("dawdd") */
					}
				}, "copy invite link"),
				React.createElement("label" , {
				
				},this.state.linkedCopied ? "copied to clipboard" : ""),
			) */
		)
	}
} 