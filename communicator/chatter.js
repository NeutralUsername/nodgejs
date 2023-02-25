import {
	WS,
	constructMessage
} from "../index.js"
export class chatter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}


	render() { 
		let block = this.props.blocks.find(b => b.blockeeId == this.props.friendData.friend.id)
		return React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "row",
					padding : ".7vmin",
					alignItems : "center",
					borderRadius : "1vmin",
					margin : ".5vmin",
					backgroundColor : this.props.selectedChat === this.props.friendData.friend.id ? this.props.options.uiTheme == "light" ? "lightgrey" : "#222426" : "",
                    gap :".5vmin"
				}
			}, 

				React.createElement("img", {
					src: this.props.options.uiTheme === "dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/block_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/block_b.png",
					style: {
						cursor : "pointer",
						width : "2.2vmin"
					},
					onClick : () => ! block ? confirm("block "+ (this.props.friendData.friend.name)+"?") ? WS.send(constructMessage("block_user", [this.props.friendData.friend.name])) : null :  confirm("unblock "+ this.props.friendData.friend.name+"?") ? WS.send(constructMessage("unblock_user", [this.props.friendData.friend.name])) : null,
				},),
                React.createElement("b", {
                    onClick : () => this.props.selectedChat != this.props.friendData.friend.id ?  this.props.stateChange("selectedChat", this.props.friendData.friend.id) : this.props.stateChange("selectedChat", false),
                    style : {
                        cursor : "pointer",
                        fontSize : "1.7vmin",
                    }
                }, this.props.friendData.friend.name),
			)
	}
}
function getFormattedDate(date) {
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');

	return day + '/' + month + '/' + year;
}