import {
	constructMessage,
	WS
} from "../index.js"
import {
	history
} from "./history.js"
import {
	profile_element
} from "./profile_element.js"
export class profile extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
	}
	
	render() {
		let gameHistory = []
		let historySorted = []
		if (this.props.profile && this.props.profile.gameHistory.length > 0)
			historySorted = this.props.profile.gameHistory.sort((a, b) => new Date(b.turns[b.turns.length-1].ended).valueOf() - new Date(a.turns[a.turns.length-1].ended.valueOf()))
		if(this.props.profile) {
			historySorted.forEach(historyGame => {
				let profileUserId = this.props.profile.id
				if (historyGame.players.find(player => player.userId == profileUserId))
					gameHistory.push(React.createElement(history, {
						key : historyGame.id,
						stateChange : this.props.stateChange,
						user : this.props.user,
						options: this.props.options,
						profileUserId : profileUserId,
						game : historyGame
					}))
			})
		}
		return React.createElement("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					justifyContent : "center",
					alignItems: "center",
					marginTop: "5vmin",
					marginBottom: "1vmin",
				},
				onKeyDown : (e) => {
					if(e.key === "Enter")
						WS.send(constructMessage("profile", [this.props.profileInput]))
				},
			},
			React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "row",
					gap : "1vmin",
					marginBottom : "3vmin"
				}
			},
				React.createElement("input", {
					type: this.props.password ? "password" : "input",
					placeholder: "username",
					value : this.props.profileInput ,
					onChange : (e) =>  e.target.value.length <= 20? this.props.stateChange("profileInput", e.target.value) : null,
					style: {
						display: "flex",
						fontSize: "2vmin",
						width : "30vmin"
					},
				}, ),
				React.createElement("button", {
					onClick : () => WS.send(constructMessage("profile", [this.props.profileInput]))
				}, "search"),
			),
			this.props.profile ? React.createElement("div", {
			},this.props.profile.online ? "🟢": ("🔴")) : "",
			this.props.profile ? React.createElement("div", {
				style : {
					height : "3.5vmin"
				}
			}, !this.props.profile.online? ("last online: "+ (new Date(this.props.profile.lastActiveAt).toLocaleDateString()+" "+new Date(this.props.profile.lastActiveAt).getHours() +":"+ (new Date(this.props.profile.lastActiveAt).getMinutes() < 10 ? "0"+new Date(this.props.profile.lastActiveAt).getMinutes() : new Date(this.props.profile.lastActiveAt).getMinutes()) )) : "online") : "",
			this.props.profile ? React.createElement("div", {
				style : {
					fontSize : "2vmin",
					display : "flex",
					flexDirection : "column",
					gap : "1vmin",
					alignItems : "start",
					marginBottom : "1.5vmin"
				}
			},
				React.createElement(profile_element, {
					subject : "name:",
					value : this.props.profile.name
				}),
				React.createElement(profile_element, {
					subject : "rating:",
					value : this.props.profile.rating.toFixed(0)
				}),
				React.createElement(profile_element, {
					subject : "games:",
					value : this.props.profile.gameHistory.length
				}),
				React.createElement(profile_element, {
					subject : "wins:",
					value : this.props.profile.gameHistory.reduce((winsCount,game) => {
						if(game.players.find(player => player.userId == this.props.profile.id).placement == 1)
							return winsCount+1
						else return winsCount
					},0)
				}),
			) : "",
			 this.props.profile.ingame  ? React.createElement("button", {
				style : {
					height : "3.5vmin",
				},
				onClick : () => WS.send(constructMessage("spectate",[ this.props.profile.id]))
			}, 
				"live game"
			) : "",
			React.createElement("div", {
				style: {
					marginTop: "4vmin",
					display: "flex",
					gap: ".4vmin",
					fontSize: "2.2vmin",
					flexDirection: "column",
				}
			},
				gameHistory
			)
		)
	}
}