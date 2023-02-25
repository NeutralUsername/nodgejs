import {
	WS
} from "../index.js"
export class queue extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.reRenderLoop()
	}

	componentWillUnmount() {
		clearTimeout(this.state.timeout)
	}

	reRenderLoop = () => {
		this.state.timeout = setTimeout( () =>  {
			this.forceUpdate()
			this.reRenderLoop()
		}, 33)
	}


	render() {

		return React.createElement("div", {
			style: {
				display: "flex",
				flexDirection: "row",
				gap : "1vmin",
			}
		},
			React.createElement("button", {
				onClick : () => {
					this.props.queue == false ? WS.send("joinMatchmaking") : WS.send("leaveMatchmaking")
				},
				disabled : this.props.lobbyUsers.findIndex(user => user.ingame) > -1 ? true : false,
				style : {
					height : "17vmin",
					width : "24.3vmin",
					fontSize : "3vmin",
				}
			}, this.props.queue == false ? "QUEUE MATCHMAKING" : ((new Date().valueOf() - new Date(this.props.queue).valueOf())/1000).toFixed(0) ),
		)
	}
}