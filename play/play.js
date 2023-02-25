import {
    custom
} from "./custom.js"
import {
    queue
} from "./queue.js"
export class play extends React.Component {
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
					gap : "1vmin",
					borderRadius: ".4vmin",
					border: "solid " + (this.props.options.uiTheme === "light" ? "black " : "white ") + "1px",
					alignItems: "center",
					display: "flex",
					padding: "1vmin",
					flexDirection: "column",
					backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
					height : "22vmin",
					width : "25vmin"
				}
			},
			React.createElement("b", {
				style: {
					alignItems: "center",
					display: "flex",
					fontSize : "2vmin",
					flexDirection: "row",
					marginBottom: "1vmin",
				}
			}, "PLAY"),
			this.props.options.playMode == "custom" ? React.createElement(custom, {
				options : this.props.options,
				user: this.props.user,
				lobbyUsers : this.props.lobbyUsers,
			}, ) :
			React.createElement(queue, {
                options : this.props.options,
                user: this.props.user,
				lobbyUsers : this.props.lobbyUsers,
				queue : this.props.queue,
            }, )
		)
	}
}