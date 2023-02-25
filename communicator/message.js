import {
	WS
} from "../index.js"
export class message extends React.Component {
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
				width : "41vmin",
				justifyContent : "flex-" + (this.props.message.senderId == this.props.user.id ? "end" : "start"),
			}
		},
			React.createElement("div", {
				style: {
					maxWidth : "35vmin",
					gap : "2vmin",
					display : "flex",
					flexDirection : "row",
					padding : ".25vmin",
					alignItems : "start",
					paddingLeft : "1vmin",
					paddingRight : "1vmin",
					marginTop : ".5vmin",
					justifyContent : "flex-" + (this.props.message.senderId == this.props.user.id ? "end" : "start"),
					borderRadius : "1vmin",
					border : "1px solid "+(this.props.options.uiTheme == "light" ? "black": "gainsboro"),
					backgroundColor : this.props.options.uiTheme == "light" ? "gainsboro" : ""
				}
			},
				React.createElement("b", {
					style : {
						fontSize : "1.7vmin",
					}
				},this.props.message.content)
			)
		)
	}
}