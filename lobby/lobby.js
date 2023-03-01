import {
    users
} from "./users.js"
import {
    chat
} from "./chat.js"
import {
    menu
} from "./menu.js"
import {
    play
} from "../play/play.js"
export class lobby extends React.Component {
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
                    flexDirection : "column",
                    alignItems : "center",
                    gap : "2vmin",
                    marginTop : "5vmin",
                }
            },
            React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    gap : "2vmin",
                    marginBottom : "3vmin"
                }
            },
                React.createElement(play, {
                    options : this.props.options,
                    user: this.props.user,
                    lobby : this.props.lobby,
                    lobbyMessages : this.props.lobbyMessages,
                    stateChange : this.props.stateChange,
                    setOption : this.props.setOption,
                    queue : this.props.queue,
                })
            ),

            React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    gap : "2vmin",
                }
            },
                React.createElement(users, {
                    options : this.props.options,
                    user: this.props.user,
                    lobby : this.props.lobby,
                    lobbyMessages : this.props.lobbyMessages,
                    stateChange : this.props.stateChange,
                    setOption : this.props.setOption,
                },),
                React.createElement(chat, {
                    options : this.props.options,
                    user: this.props.user,
                    lobby : this.props.lobby,
                    lobbyMessages : this.props.lobbyMessages,
                    stateChange : this.props.stateChange,
                    setOption : this.props.setOption,
                }),
                React.createElement(menu, {
                    options : this.props.options,
                    user: this.props.user,
                    lobby : this.props.lobby,
                    lobbyMessages : this.props.lobbyMessages,
                    stateChange : this.props.stateChange,
                    setOption : this.props.setOption,
                })
            ),
        )
	}
}