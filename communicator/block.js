import {
	WS,
	constructMessage
} from "../index.js"
export class block extends React.Component {
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
					src: this.props.options.uiTheme ==="dark" ? this.props.options.comContent == "chats" ? "https://nodge.s3.eu-central-1.amazonaws.com/x_b.png" : "https://nodge.s3.eu-central-1.amazonaws.com/x_w.png" : this.props.options.comContent == "chats" ? "https://nodge.s3.eu-central-1.amazonaws.com/x_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/x_b.png",
					style: {
						cursor : "pointer",
						width : "2.2vmin"
					},
					onClick : () => confirm("unblock?") ? WS.send(constructMessage("unblock_user", [this.props.blockData.block.name])) : null,
				},),
                React.createElement("b", {
                    onClick :() => WS.send(constructMessage("profile", [this.props.blockData.block.name])),
                    style : {
                        cursor : "pointer",
                        fontSize : "1.7vmin"
                    }
                }, this.props.blockData.block.name),

			)
	}
}
function getFormattedDate(date) {
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');

	return day + '/' + month + '/' + year;
}