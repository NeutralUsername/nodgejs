import {
	lobby,
} from "./lobby.js"
import {
	WS,
	constructMessage,
	shuffle
} from "../index.js"
export class browser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {
		let lobbies = []
		this.props.browser.forEach(l => {
			if(l.lobbyId != this.props.lobby.id)
				lobbies.push(React.createElement(lobby, {
					key : l.LobbyId,
					lobby: l,
					options: this.props.options,
					user : this.props.user,
				}))
		})
		lobbies = shuffle(lobbies)
		return React.createElement("div", {
				style: {
					gap : "1vmin",
					borderRadius: ".4vmin",
					border: "solid " + (this.props.options.uiTheme === "light" ? "black " : "white ") + "1px",
					alignItems: "center",
					display: "flex",
					width : "100%",
					padding: "1vmin",
					flexDirection: "column",
					marginTop : "5vmin",
					backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
				}
			},
			React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "row",
					marginBottom: "1vmin",
					alignItems: "center",
					gap : "1vmin"
				}
			},
				React.createElement("b", {
					style: {

						display: "flex",
						fontSize : "2vmin",
						flexDirection: "row",
					}
				}, "lobby browser"),
				React.createElement("img", {
					onClick : () => {
						WS.send(constructMessage("browser", []))
					},
					style : {
						height : "2vmin",
						width : "2vmin",
						cursor : "pointer"
					},
					src : this.props.options.uiTheme == "dark"? "https://nodge.s3.eu-central-1.amazonaws.com/refresh_w.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/refresh_b.svg",
				},)
			),
			React.createElement("div", {
				style : {
					display : "flex",
					marginTop :"-2vmin",
					fontSize : "1.5vmin",
				}
			}, "last update: "+ this.props.lastBrowserUpdate.toLocaleTimeString()),
			React.createElement("div", {

			},
				lobbies
			),
		)
	}
} 