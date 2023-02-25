import {
	WS,
	constructMessage
} from "../index.js"
import {
	menubar_element
} from "./menubar_element.js"

export class menubar extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}



	render() {

		return React.createElement("div", {
				style: {
					gap : "3vmin",
					borderRadius: ".4vmin",
					border: "solid " + (this.props.options.uiTheme === "light" ? "black " : "white ") + "1px",
					justifyContent: "space-evenly",
					display: "flex",
					height : "3vmin",
					padding: ".8vmin",
					flexDirection: "row",
					backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
					width : "150vmin"
				},
				id : "menubar"
			},
			React.createElement(menubar_element, {
				name : "lobby",
				content : this.props.content,
				clickEvent : () => this.props.stateChange("content", "lobby"),
				options : this.props.options
			}),

			React.createElement(menubar_element, {
				name : "browser",
				content : this.props.content,
				clickEvent : () => WS.send("browser"),
				options : this.props.options
			}),

			React.createElement(menubar_element, {
				name : "profile",
				content : this.props.content,
				clickEvent : () => this.props.stateChange("content", "profile"),
				options : this.props.options
			}),

/* 			React.createElement(menubar_element, {
				name : "tutorial",
				content : this.props.content,
				clickEvent : () => this.props.stateChange("content", "tutorial"),
				options : this.props.options
			}),
 */
			React.createElement(menubar_element, {
				name : "leaderboard",
				content : this.props.content,
				clickEvent : () => WS.send("leaderboard"),
				options : this.props.options
			}),

			React.createElement(menubar_element, {
				name : "editor",
				content : this.props.content,
				clickEvent : () => {
					if(!this.props.editor)
						this.props.stateChange("editor", this.props.boardString)
					this.props.stateChange("content", "editor")
				},
				options : this.props.options
			}),

			React.createElement(menubar_element, {
				disabled : !this.props.user.ingame,
				name : "game",
				content : this.props.content,
				clickEvent : () => {
					this.props.stateChange("loadedStep", -1)
					this.props.stateChange("loadedTurn", -1)
					this.props.stateChange("content", "game")
				},
				options : this.props.options
			}),

			React.createElement("div", {
				style: {
					display: "flex",
					flexDirection: "row",
					gap : "2vmin"
				}
			},
				React.createElement("div", {
					style: {
						display: "flex",
						alignItems : "center",
						justifyContent : "right",
						paddingBottom : ".25vmin",
					}
				},
					React.createElement("b", {
						id : "menubarName",
						style : {
							fontSize : "2.3vmin",
							cursor: "pointer",
						},
						onClick :() => WS.send(constructMessage("profile", [this.props.user.name])),
					}, this.props.user.name)
				),

				this.props.user.power > 0  ?
				React.createElement("div", {
					style: {
						display: "flex",
						flexDirection: "row",
						borderRadius : "0.6vmin",
						alignItems: "center",
					}
				},
					React.createElement("img", {
						src: this.props.options.uiTheme === "light" ? "https://nodge.s3.eu-central-1.amazonaws.com/logout_svg.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/logout_white.svg.svg",
						onClick: e => {
							if(confirm("Are you sure you want to logout?")) {
								document.cookie = "password=" + "" + ";"
								document.cookie = "userid=" + "" + ";"
								location.reload()
							}
						},
						style: {
							cursor: "pointer",
							width: "2.5vmin",
							height: "2.5vmin",
						}
					}, ),
				) : null,

			),

			this.props.user.power === 0  ?
			React.createElement(menubar_element, {
				name : "login",
				content : this.props.content,
				clickEvent : () => this.props.stateChange("content", "login"),
				options : this.props.options
			}):"" ,

			this.props.user.power === 0  ?
			React.createElement(menubar_element, {
				name : "register",
				content : this.props.content,
				clickEvent : () => this.props.stateChange("content", "register"),
				options : this.props.options
			}):"" ,

			
			React.createElement("div", {
				style: {
					display: "flex",
					flexDirection: "row",
					gap : "2vmin"
				}
			},
				React.createElement("div", {
					style: {
						display: "flex",
						flexDirection: "row",
						backgroundColor : !this.props.options.hideNotifications ? "#b3b3b3" : "",
						borderRadius : "0.6vmin",
						outline : !this.props.options.hideNotifications ? "solid 1px" : "",
						alignItems: "center",
					}
				},
					React.createElement("img", {
						src: this.props.options.uiTheme === "light" ? "https://nodge.s3.eu-central-1.amazonaws.com/bell_b.png" : "https://nodge.s3.eu-central-1.amazonaws.com/bell_w.png",
						onClick: () => {
							this.props.setOption("hideNotifications", !this.props.options.hideNotifications)
						},
						style: {
							cursor: "pointer",
							width: "2.5vmin",
							height: "2.5vmin",
						}
					}, ),
				) ,		
				React.createElement("div", {
					style: {
						display: "flex",
						flexDirection: "row",
						backgroundColor : !this.props.options.hideCommunity ? "#b3b3b3" : "",
						borderRadius : "0.6vmin",
						outline : !this.props.options.hideCommunity ? "solid 1px" : "",
						alignItems: "center",
					}
				},
					React.createElement("img", {
						src: this.props.options.uiTheme === "light" ? "https://nodge.s3.eu-central-1.amazonaws.com/com-black.png" : "https://nodge.s3.eu-central-1.amazonaws.com/com-white.png",
						onClick: () => {
							this.props.setOption("hideCommunity", !this.props.options.hideCommunity)
						},
						style: {
							cursor: "pointer",
							width: "2.5vmin",
							height: "2.5vmin",
						}
					}, ),
				) ,		
			),

			React.createElement("div", {
				style: {
					display: "flex",
					flexDirection: "row",
					gap : "2vmin"
				}
			},
							
				React.createElement("div", {
					style: {
						display: "flex",
						flexDirection: "row",
						backgroundColor : this.props.options.uiCommunity ? "#b3b3b3" : "",
						borderRadius : "0.6vmin",
						outline : this.props.options.uiCommunity ? "solid 1px" : "",
						alignItems: "center",
					}
				},
					React.createElement("img", {
						src: this.props.options.uiTheme === "light" ? "https://nodge.s3.eu-central-1.amazonaws.com/sun-b.png" : "https://nodge.s3.eu-central-1.amazonaws.com/sun-w.png",
						onClick: () => {
							this.props.setOption("uiTheme", this.props.options.uiTheme === "light" ? "dark" : "light")
						},
						style: {
				
							cursor: "pointer",
							width: "2.5vmin",
							height: "2.5vmin",
						}
					}, ),
				) ,
				React.createElement("a", {
					href: "https://discord.gg/tghbWmdtgB"
				},
					React.createElement("div", {
						style : {
							display  : "flex",
							cursor: "pointer",
							width: "2.4vmin",
							height: "2.4vmin",
							marginRight : "1vmin",
							paddingTop : "0.25vmin",
						}
					},
						React.createElement("img", {
							style: {
							},
							src: "https://img.icons8.com/fluency/344/discord-logo.png"
						}, ),
					)
				),
			)
		)
	}
}