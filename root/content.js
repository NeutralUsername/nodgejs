import {
	game,
} from "../game/game.js"
import {
	register
} from "../account/register.js";
import {
	login
} from "../account/login.js";
import {
	profile
} from "../profile/profile.js";
import {
	lobby
} from "../lobby/lobby.js"
import {
	feedback,
} from "../feedback/feedback.js"
import {
	editor
} from "../editor/editor.js"
import{
	leaderboard
} from "../leaderboard/leaderboard.js"
import {
	browser
} from "../browser/browser.js"
export class content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {
        var content 
		if (this.props.content === "lobby") 
			content = React.createElement(lobby, {
				user : this.props.user,
				options : this.props.options,
				lobby : this.props.lobby,
				lobbyMessages : this.props.lobbyMessages,
				lobbyUsers : this.props.lobbyUsers,
				outgoingInvites : this.props.outgoingInvites,
				stateChange: this.props.stateChange,
				setOption : this.props.setOption,
				queue : this.props.queue,
			})
		if (this.props.content === "game" || this.props.content === "historyGame" || this.props.content === "spectateGame") {
			content = React.createElement(game, {
				game : this.props.game,
				loadedTurnIndex : this.props.loadedTurnIndex,
				loadedStepIndex : this.props.loadedStepIndex,
				commandCount : this.props.commandCount,
				previousCommand : this.props.previousCommand,
				content : this.props.content,
				user : this.props.user,
				options : this.props.options,
				stateChange: this.props.stateChange,
				setOption : this.props.setOption,
				lastTurn : this.props.lastTurn,
				lastTurnStep: this.props.lastTurnStep,
				selectedReplayNode : this.props.selectedReplayNode,
				selectedPlayer : this.props.selectedPlayer,
				playTurnSteps : this.props.playTurnSteps,
				messageInputSelected : this.props.messageInputSelected,
			})
		}	
		if(this.props.content == "browser") {
			content = React.createElement(browser, {
				user : this.props.user,
				options : this.props.options,
				browser : this.props.browser,
				stateChange: this.props.stateChange,
				setOption : this.props.setOption,
				lastBrowserUpdate : this.props.lastBrowserUpdate,
			})
		}
		if (this.props.content === "register") 
			content = React.createElement(register, {
				user : this.props.user,
				options : this.props.options,
				stateChange: this.props.stateChange,
				setOption : this.props.setOption,
			})
		if (this.props.content === "login") 
			content = React.createElement(login, {
				user : this.props.user,
				options : this.props.options,
				stateChange: this.props.stateChange,
				setOption : this.props.setOption,
			})
		if (this.props.content === "profile") 
			content = React.createElement(profile, {
				user : this.props.user,
				profile : this.props.profile,
				profileInput : this.props.profileInput,
				options : this.props.options,
				stateChange: this.props.stateChange,
				setOption : this.props.setOption,
			})
		if (this.props.content === "tutorial") 
			content = React.createElement(tutorial, {
				user : this.props.user,
				options : this.props.options,
				stateChange: this.props.stateChange,
				setOption : this.props.setOption,
			})
		if(this.props.content === "leaderboard") {
			content = React.createElement(leaderboard, {
				leaderboard : this.props.leaderboard,
				user : this.props.user,
				options : this.props.options,
				stateChange : this.props.stateChange,
			})
		}
		if(this.props.content === "editor") {
			content = React.createElement(editor, {
				editor : this.props.editor,
				options : this.props.options,
				user : this.props.user,
				boardString : this.props.boardString,
				stateChange: this.props.stateChange,
			})
		}
		if(this.props.content === "feedback") {
			content = React.createElement(feedback, {
				user : this.props.user,
				options : this.props.options,
				stateChange: this.props.stateChange,
				setOption : this.props.setOption,
			})
		}
		return React.createElement("div", {

				style: {
					display: "flex",
				}
			},
			content
		)
	}
}