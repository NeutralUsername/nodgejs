import {
	WS,
	constructMessage,
} from "../index.js"
export class friend extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}


	render() {
		let block = this.props.blocks.find(b => b.blockeeId == this.props.friendData.friend.id)
		let accepted = this.props.friendData.acceptedAt != null
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
			 	accepted ? React.createElement("img", {
					src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/chat_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/chat_b.png",
					style: {
						cursor : "pointer",
						width : "2.2vmin"
					},
				onClick : () =>{
						this.props.stateChange("selectedChat", this.props.friendData.friend.id)
						this.props.setOption("comContent", "chats")
					},
				},) : null,
				accepted ? React.createElement("img", {
					src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/plus_w.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/plus_b.svg",
					style: {
						cursor : "pointer",
						width : "2.2vmin"
					},
				onClick : () =>{
					WS.send(constructMessage("invite", [this.props.friendData.friend.name]))
					},
				},) : null,
				accepted ? React.createElement("img", {
					src: this.props.options.uiTheme === "dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/block_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/block_b.png",
					style: {
						cursor : "pointer",
						width : "2.2vmin"
					},
					onClick : () => ! block ? confirm("block "+ (this.props.friendData.friend.name)+"?") ? WS.send(constructMessage("block_user", [this.props.friendData.friend.name])) : null :  confirm("unblock "+ this.props.friendData.friend.name+"?") ? WS.send(constructMessage("unblock_user", [this.props.friendData.friend.name])) : null,
				},) : null,
				React.createElement("img", {
					src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/x_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/x_b.png",
					style: {
						cursor : "pointer",
						width : "2.2vmin"
					},
					onClick : () => confirm("delete "+ this.props.friendData.friend.name +"?") ? WS.send(constructMessage("delete_friend", [this.props.friendData.friend.name])) : null,
				},),
				!accepted ? React.createElement("img", {
					src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/hg_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/hg_b.png",
					style: {
						width : "2.2vmin"
					},
				},) : null,
                React.createElement("b", {
                    onClick :() => WS.send(constructMessage("profile", [this.props.friendData.friend.name])),
                    style : {
                        cursor : "pointer",
                        fontSize : "1.7vmin"
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