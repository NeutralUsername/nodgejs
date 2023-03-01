import {
	constructMessage,
	WS
} from "../index.js"
export class custom extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			board : "editor",
			timeLimit : "30",
			turnLimit : "50"
		}
	}

	componentWillUnmount() {

	}

	render() {

		return React.createElement("div", {
			style: {
				gap : "1vmin",
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
			}
		},
			React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "row",
					gap : ".5vmin",
					fontSize : "1.8vmin",
				}
			}, 
				React.createElement("b", {
					
				}, "board: "),
				React.createElement("select", {
					onChange : (e) => {
						this.setState({
							board : e.target.value
						})
					},
					style : {
						display : "flex",
						fontSize : "1.8vmin",
						width : "15vmin",
						height : "2.8vmin"
					},
					value : this.state.board,
				},
					React.createElement("option", {}, "editor"),
					React.createElement("option", {}, "hex_small"),
					React.createElement("option", {}, "hex_medium"),
					React.createElement("option", {}, "hex_large"),
				)
			),
			React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "row",
					gap : ".5vmin",
					fontSize : "1.8vmin",
				}
			}, 
				React.createElement("b", {}, "turn limit: "),
				React.createElement("select", {
					style : {
						display : "flex",
						fontSize : "1.8vmin",
						width : "10vmin",
						height : "2.8vmin"
					},
					value : this.state.turnLimit,
					onChange : (e) => {
						this.setState({
							turnLimit : e.target.value
						})
					}
				},
					React.createElement("option", {}, "2"),
					React.createElement("option", {}, "20"),
					React.createElement("option", {}, "25"),
					React.createElement("option", {}, "30"),
					React.createElement("option", {}, "40"),
					React.createElement("option", {}, "50"),
					React.createElement("option", {}, "75"),
					React.createElement("option", {}, "100"),
					React.createElement("option", {}, "150"),
				)
			),
			React.createElement("div", {
				style: {
					display: "flex",
					flexDirection: "row",
					gap : "1vmin",
		
					height : "9.5vmin",
					width : "15vmin",
				}
			},
				React.createElement("button", {
					disabled : this.props.lobby.members.findIndex(user => user.ingame) > -1 ? true : false,
					style : {
						fontSize : "2.8vmin",
					},
					onClick : () => {
						WS.send(constructMessage("custom", [this.state.board, this.state.turnLimit]))
					}
				}, "start custom"),
			),
		)
	}
} 