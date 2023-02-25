import {
	constructMessage,
	WS
} from "../index.js"
export class friendEntry extends React.Component {
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
				onClick : () => confirm("accept "+ (this.props.entry.friend.name)+"?") ? WS.send(constructMessage("accept_friend", [this.props.entry.friend.name])) : null,
			},),
			React.createElement("img", {
				src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/x_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/x_b.png",
				style: {
					cursor : "pointer",
					width : "2.2vmin"
				},
				onClick : () => confirm("delete "+ this.props.entry.friend.name +"?") ? WS.send(constructMessage("delete_friend", [this.props.entry.friend.name])) : null,
			},),
			React.createElement("b", {
				onClick :() => WS.send(constructMessage("profile", [this.props.entry.friend.name])),
				style : {
					cursor : "pointer",
					fontSize : "1.7vmin",
					whiteSpace : "nowrap",
					overflow : "hidden",
				}
			}, this.props.entry.friend.name),
		)
	}
} 