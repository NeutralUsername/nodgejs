import {
	tabs
} from "./tabs.js"
import {
	entries
} from "./entries.js"
import {
	label
} from "./label.js"
import {
	input
} from "./input.js"
import {
	chat
} from "./chat.js"
export class communicator extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return React.createElement("div", { 
				style: {
					display: "flex",
					flexDirection: "row",
				}
			},
			React.createElement(tabs, {
				options : this.props.options,				
				user : this.props.user,
				setOption : this.props.setOption,
			},),
			React.createElement("div", {
				style: {
					alignItems: "center",
					backgroundColor : this.props.options.uiTheme === "light" ? "white" : "#222426",
					justifyContent: "center",				
				}
			},
				React.createElement(label, {
					options : this.props.options,
				},),
				React.createElement(entries, {
					options : this.props.options,
					user : this.props.user,
					privateMessages : this.props.privateMessages,
					friends : this.props.friends,
					blocks : this.props.blocks,
					stateChange : this.props.stateChange,
					setOption : this.props.setOption,
					selectedChat : this.props.selectedChat,
				}), 
				this.props.options.comContent == "chats" ?
				React.createElement(chat, {
					options : this.props.options,
					user : this.props.user,
					privateMessages : this.props.privateMessages,
					friends : this.props.friends,
					blocks : this.props.blocks,
					messageInputSelected : this.props.messageInputSelected,
					stateChange : this.props.stateChange,
					setOption : this.props.setOption,
					selectedChat : this.props.selectedChat,
				}) : null, 
				React.createElement(input, {
					options : this.props.options,
					messageInputSelected : this.props.messageInputSelected,
					stateChange : this.props.stateChange,
					user : this.props.user,
				},) 
			)
		)
	}
}