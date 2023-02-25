import {
    constructMessage,
    WS
} from "../index.js"
export class lobbyEntry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return React.createElement("div", {
			style : {
				display : "flex",
				flexDirection : "row",
				padding : ".7vmin",
				alignItems : "center",
				borderRadius : "1vmin",
				gap :".5vmin"
			}
		}, 
			React.createElement("img", {
				src: this.props.options.uiTheme === "dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/check_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/check_b.png",
				style: {
					cursor : "pointer",
					width : "2.2vmin"
				},
				onClick : () =>  {
					if(confirm("accept "+ (this.props.entry.lobbyName)+"?")) {
						WS.send(constructMessage("accept_invite", [this.props.entry.lobbyId]))
					}
				}
			},),
			React.createElement("img", {
				src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/x_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/x_b.png",
				style: {
					cursor : "pointer",
					width : "2.2vmin"
				},
				onClick : () => {
					if(confirm("decline "+ this.props.entry.lobbyName +"?")) {
						WS.send(constructMessage("decline_invite", [this.props.entry.lobbyId]))
					}
				},
			},),
			React.createElement("div", {
				style : {
					fontSize : "1.7vmin",
					whiteSpace : "nowrap",
					overflow : "hidden",
				}
			}, this.props.entry.lobbyName),
		)
	}
} 