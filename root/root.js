import {
    WS,
    cookie,
    PLOPSOUND,
	constructMessage,
	MSG_DELIMITER,
} from "../index.js"
import {
	menubar,
} from "../menubar/menubar.js"
import {
	communicator
} from "../communicator/communicator.js"
import {
	content
} from "./content.js"
import { 
	notifications 
} from "../notifications/notifications.js"

export class root extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user : false,
			profile : false,
			leaderboard : false,
			selectedChat : false,
			selectedReplayNode : false,
			selectedPlayer : false,
			editor : "",
			profileInput : "",
			options : this.props.options,
			content : "",
			queue : false,
			loadedTurnIndex : 0,
			loadedStepIndex : 0,
			commandCount : 1,
			previousCommand : "0,0,0",
			messageInputSelected : false,
		}
		document.body.style.backgroundColor = this.state.options.uiTheme === "light" ? 'white' : "#222426"
		document.body.style.color = this.state.options.uiTheme === "light" ? 'black' : "white"
        this.messageHandler = this.messageHandler.bind(this)
        WS.onmessage = (event) => {
            this.messageHandler(event.data)
        };
	}
	componentWillUnmount() {

	}
	componentDidMount() {
		this.state.mounted = true
	
	}
    messageHandler(message) {
		console.log(message)
        let data = message.split(MSG_DELIMITER);
        let type = data[0]
		switch (type) {
		case "request_credentials":
			WS.send(constructMessage("login", [cookie("name"), cookie("password")]));
			break;
		case "login":
			let userData = JSON.parse(data[1])
			userData.registeredAt = new Date(userData.registeredAt)
			userData.lastActiveAt = new Date(userData.lastActiveAt)
			userData.createdAt = new Date(userData.createdAt)
			var a = new Date(new Date().valueOf() + 10 * (1000 * 60 * 60 * 24 * 365));
			document.cookie = "name="+userData.name + "; expires=" + a.toUTCString()  + ';';
			document.cookie = "password="+userData.password + "; expires=" + a.toUTCString()  + ';';
			this.state.friends = JSON.parse(data[2])
			this.state.blocks = JSON.parse(data[3])
			this.state.privateMessages = JSON.parse(data[4]).reverse()
			this.state.boardString = data[5]
			this.state.lobby = JSON.parse(data[6])
			this.state.lobbyMessages = JSON.parse(data[7])
			this.state.incomingInvites = JSON.parse(data[8])
			this.state.game = JSON.parse(data[9])
			this.state.queue = JSON.parse(data[10]) ? new Date() : false
			if(this.state.game) {
				this.state.loadedTurnIndex = this.state.game.turns.length
				this.state.loadedStepIndex = -1
			}
			this.setState({
				user : userData,
				friends : this.state.friends,
				blocks : this.state.blocks,
				privateMessages : this.state.privateMessages,
				boardString : this.state.boardString,
				lobby : this.state.lobby,
				lobbyMessages : this.state.lobbyMessages,
				incomingInvites : this.state.incomingInvites,
				game : this.state.game,
				queue : this.state.queue,
				loadedTurnIndex : this.state.loadedTurnIndex,
				loadedStepIndex : this.state.loadedStepIndex,
				content : "lobby",
			})
			break;
		case "editor":
			this.state.boardString = data[1]
			this.state.user.boardId = parseInt(data[2])
			this.setState({
				boardString : this.state.boardString,
				user : this.state.user,
			})
			break;
		case "user_friends":
			this.state.friends = JSON.parse(data[1])
			this.setState({user : this.state.user})
			break;
		case "user_blocks":
			this.state.blocks = JSON.parse(data[1])
			this.setState({user : this.state.user})
			break;
		case "PM":
			this.state.privateMessages.push(JSON.parse(data[1]))
			this.setState({privateMessages : this.state.privateMessages})
			break;
		case "LM":
			this.state.lobbyMessages.unshift(JSON.parse(data[1]))
			this.setState({lobbyMessages : this.state.lobbyMessages})
			break;
		case "profile":
			this.state.profile = JSON.parse(data[1])
			this.state.profile.lastActiveAt = new Date(this.state.profile.lastActiveAt)
			this.state.profile.createdAt = new Date(this.state.profile.createdAt)
			this.state.profile.registeredAt = new Date(this.state.profile.registeredAt)
			this.setState({
				profile : this.state.profile,
				content : "profile"
			})
			break;
		case "leaderboard":
			this.state.leaderboard = JSON.parse(data[1])
			this.setState({
				leaderboard : this.state.leaderboard,
				content : "leaderboard"
			})
			break;
		case "browser":
			this.state.content = "browser"
			this.state.browser = JSON.parse(data[1])	
			this.state.lastBrowserUpdate = new Date()
			this.setState({
				content : this.state.content,
				browser : this.state.browser,
				lastBrowserUpdate : this.state.lastBrowserUpdate,
			})
			break;
		case "joinMatchmaking":
			this.state.queue = new Date()
			this.setState({
				queue : this.state.queue,
			})
			break;
		case "leaveMatchmaking":
			this.state.queue = false
			this.setState({
				queue : this.state.queue,
			})
			break;
		case "join_lobby":
			this.state.lobby.members = []
			this.state.lobby.currentInvites = []
			this.setState({lobby : this.state.lobby}, () => {
				let lobby = JSON.parse(data[1])
				let messages = JSON.parse(data[2])
				this.state.user.lobbyId = lobby.Id
				if(this.state.incomingInvites.findIndex(invite => invite.lobbyId ) > -1){
					this.state.incomingInvites.splice(this.state.incomingInvites.findIndex(invite => invite.lobbyId == lobby.Id), 1)
				}
				this.setState({
					lobby : lobby,
					lobbyMessages : messages,
					incomingInvites : this.state.incomingInvites,
					user : this.state.user,
					content : "lobby"
				})
			})
			break;
		case "lobby_joiner" :
			let newUser = JSON.parse(data[1])
			this.state.lobby.members.push(newUser)
			if(this.state.lobby.currentInvites.findIndex(invite => invite.id == newUser.id) > -1)
				this.state.lobby.currentInvites.splice(this.state.lobby.currentInvites.findIndex(invite => invite.id == newUser.id), 1)
			this.setState({
				lobby : this.state.lobby,
			})
			break;
		case "lobby_leaver": 
			this.state.lobby.members.splice(this.state.lobby.members.findIndex(user => user.id == data[1]), 1)
			if(this.state.lobby.leaderId != data[2]) {
				this.state.lobby.public = false
				this.state.lobby.leaderId = data[2]
			}
			this.setState({
				lobby : this.state.lobby,
			})
			break;
		case "lobby_promote":
			this.state.lobby.leaderId = data[1]
			this.setState({lobby : this.state.lobby})
		case "lobby_name":
			this.state.lobby.name = data[1]
			this.setState({lobby : this.state.lobby})
			break;
		case "lobby_password":
			this.state.lobby.password = data[1]
			this.setState({lobby : this.state.lobby})
			break;
		case "lobby_public":
			this.state.lobby.public = data[1] == "true" ? true : false
			this.setState({lobby : this.state.lobby})
			break;
		case "lobby_protected":
			this.state.lobby.passwordProtected = data[1] == "true" ? true : false
			this.setState({lobby : this.state.lobby})
			break;
		case "lobby_invites":
			this.state.lobby.invites = data[1] == "true" ? true : false
			this.setState({lobby : this.state.lobby})
			break;
		case "lobby_cancels":
			this.state.lobby.cancels = data[1] == "true" ? true : false
			this.setState({lobby : this.state.lobby})
			break;
		case "add_inc_invite":
			this.state.incomingInvites.push(JSON.parse(data[1]))
			this.setState({incomingInvites : this.state.incomingInvites})
			break;
		case "add_out_invite":
			this.state.lobby.currentInvites.push(JSON.parse(data[1]))
			this.setState({lobby : this.state.lobby})
			break;
		case "del_out_invite" : 
			this.state.lobby.currentInvites.splice(this.state.lobby.currentInvites.findIndex(invite => invite.id == data[1]), 1)
			this.setState({lobby : this.state.lobby})
			break;
		case "del_inc_invite":
			this.state.incomingInvites.splice(this.state.incomingInvites.findIndex(invite => invite.lobbyId == data[1]), 1)
			this.setState({incomingInvites : this.state.incomingInvites})
			break;
		case "team":
			if(data[2] == this.state.user.id) 
				this.state.user.team = parseInt(data[1])
			this.state.lobby.members[this.state.lobby.members.findIndex(user => user.id == data[2])].team = parseInt(data[1])
			this.setState({
				lobby : this.state.lobby,
				user : this.state.user
			})
			break
		case "spectate":
			this.state.game = JSON.parse(data[1])
			this.state.content = "game"
			this.state.loadedTurnIndex = this.state.game.turns.length
			this.state.loadedStepIndex = -1
			this.setState({
				game : this.state.game,
				content : this.state.content,
				loadedTurnIndex : this.state.loadedTurnIndex,
				loadedStepIndex : this.state.loadedStepIndex,
			})
			break;
		case "spectateLeave":
			if(this.state.user.ingame == false) {
				this.state.content = "lobby"
				this.state.game = null
				this.setState({
					content : this.state.content,
					game : this.state.game
				})
			}
			break;
		case "gameStart":
			this.state.game = JSON.parse(data[1])
			this.state.content = "game"
			this.state.user.ingame = true
			this.state.lobby.members.forEach(lobbyUser => lobbyUser.ingame = true)
			this.state.loadedTurnIndex = 0
			this.state.loadedStepIndex = -1
			this.state.previousCommand = "0,0,0"
			PLOPSOUND.play()
			this.setState({
				game : this.state.game,
				content : this.state.content,
				user : this.state.user,
				lobby : this.state.lobby,
				loadedTurnIndex : this.state.loadedTurnIndex,
				loadedStepIndex : this.state.loadedStepIndex,
				previousCommand : this.state.previousCommand,
			})
			break;
		case "gameEnd":
			this.state.user.ingame = false
			this.state.game.ended = true
			this.state.lobby.members.forEach(lobbyUser => lobbyUser.ingame = false)
			PLOPSOUND.play()
			this.setState({
				user : this.state.user,
				lobby : this.state.lobby,
				game : this.state.game,
			})
			break;
		case "gameLeave":
			if (data[1] == this.state.user.id) {
				this.state.user.ingame = false
				this.state.lobby.members.find(user => user.id == data[1]).ingame = false
				this.state.content = "lobby"
			}
			else this.state.lobby.members.find(user => user.id == data[1]).ingame = false
			this.setState({
				user : this.state.user,
				content : this.state.content,
				lobby : this.state.lobby,
			})
			break;
		case "turnStart":
			this.state.game.activeTurn = JSON.parse(data[1])
			this.state.loadedTurnIndex = this.state.game.turns.length
			this.state.loadedStepIndex = -1
			PLOPSOUND.play()
			this.setState({
				game : this.state.game,
				loadedTurnIndex : this.state.loadedTurnIndex,
				loadedStepIndex : this.state.loadedStepIndex,
			})
			break;
		case "turnEnd":
			this.state.game.activeTurn = null
			this.state.game.turns.push(JSON.parse(data[1]))
			PLOPSOUND.play()
			this.setState({
				loadedTurnIndex : this.state.game.turns.length-1,
				loadedStepIndex : -1,
			}, () => this.playTurnSteps())
			
			this.setState({
				game : this.state.game,
			})
			break;
		case "command":
			let commands = this.state.game.activeTurn.userCommands
			if(!commands[data[1]])
				commands[data[1]] = {}
			if(!commands[data[1]][data[2]])
				commands[data[1]][data[2]] = {
					points : 0,
					stepUsed : -1,
				}
			if(data[1] == this.state.user.id)
				this.state.previousCommand = data[2]
			commands[data[1]][data[2]].points += parseInt(data[3])
			this.setState({
				game : this.state.game,
			})
			break;
		case "takeback":
			let takebackCommands = this.state.game.activeTurn.userCommands[data[1]]
			JSON.parse(data[2]).forEach(command => {
				delete takebackCommands[command]
			})
			this.setState({
				game : this.state.game,
			})
			break;
		case "ready":
			this.state.game.activeTurn.readys[data[1]] = data[2] == "true" ? true : false
			this.setState({	
				game : this.state.game,
			})
			break;
		case "placement":
			this.state.game.players.find(player => player.userId == data[1]).placement = Number(data[2])
			this.setState({
				game : this.state.game,
			})
			break;
		}
    }
	setOption = (option, value) => {
		var a = new Date();
		a = new Date(a.getTime() + 10 * (1000 * 60 * 60 * 24 * 365));
		document.cookie =option+ "=" + value + "; expires=" +a.toUTCString()+ ';';
		this.state.options[option] = value
		this.setState({options : this.state.options})
		if(option === "uiTheme") {
			document.body.style.backgroundColor = (value === "light" ? 'white' : "#222426")
			document.body.style.color = ( value === "light" ? 'black' : "white")
		}
	}
	stateChange = (key, value) => {
		if(this.state.user) {
			this.state[key] = value
			this.setState({ [key] : value })
		}
	}
	lastTurn = () => {
		if(!this.state.game || (this.state.game.turns.length == 0 && !this.state.game.activeTurn)) return 0
		return this.state.game.turns.length-1 + (this.state.game.activeTurn ? 1 : 0)
	}
	lastTurnStep = () => {
		if(!this.state.game || (this.state.game.turns.length == 0 && !this.state.game.activeTurn)) return -1
		if(this.state.loadedTurnIndex == this.state.game.turns.length) return -1
		return Object.keys(this.state.game.turns[this.state.loadedTurnIndex].stepChanges).length-2
	}
	playTurnSteps = () => { //play till the last step
		this.state.animationTimeout = setTimeout( () => {
			if(this.state.loadedStepIndex < this.lastTurnStep()){
				this.setState({
					loadedStepIndex : this.state.loadedStepIndex+1,
				})
				this.playTurnSteps()
			} else {
				if (this.state.loadedTurnIndex < this.lastTurn()) {
					this.setState({
						loadedTurnIndex : this.state.loadedTurnIndex+1,
						loadedStepIndex : -1,
					})
					this.playTurnSteps()
				}
			} 
		}, 1000, this.state)
	}
	stopAnimation = () => {
		if (this.state.user.ingame) return
		clearTimeout(this.state.animationTimeout)
	}
	render() {
		return	React.createElement('div', {
			onContextMenu: e => {
				e.preventDefault()
			},
			className : "app",
			style : {
				fontFamily: "Segoe UI", 
				display : "flex",
				flexDirection : "column",
				justifyContent : "center",
				alignItems : "center",
			}
		},
			this.state.user ? React.createElement(menubar, {
				user: this.state.user,
				game : this.state.activeGame,
				editor : this.state.editor,
				boardString : this.state.boardString,
				options : this.state.options,
				content : this.state.content ,
				setOption : this.setOption,
				stateChange: this.stateChange,
			}) : "",
			this.state.user ? React.createElement(content , {
				options : this.state.options,
				content : this.state.content,
				user : this.state.user,
				lobby : this.state.lobby,
				lobbyMessages : this.state.lobbyMessages,
				boardString : this.state.boardString,
				editor : this.state.editor,
				stateChange : this.stateChange,
				setOption : this.setOption,
				profile : this.state.profile,
				leaderboard : this.state.leaderboard,
				browser : this.state.browser,
				lastBrowserUpdate : this.state.lastBrowserUpdate,
				profileInput : this.state.profileInput,
				loadedTurnIndex : this.state.loadedTurnIndex,
				loadedStepIndex : this.state.loadedStepIndex,
				commandCount : this.state.commandCount,
				previousCommand : this.state.previousCommand,
				selectedReplayNode : this.state.selectedReplayNode,
				selectedPlayer : this.state.selectedPlayer,
				game : this.state.game,
				messageInputSelected : this.state.messageInputSelected,
				queue : this.state.queue,
				lastTurn : this.lastTurn,
				lastTurnStep : this.lastTurnStep,
				playTurnSteps : this.playTurnSteps,
				stopAnimation : this.stopAnimation,
			}) : "",
			React.createElement("div", {
				style : {
					display : "flex",
					position : "fixed",
					right : "1vmin",
					top : "7.1vmin",
					zIndex : "100",
					gap : "1vmin",
				}
			},
				!this.state.options.hideNotifications && this.state.user ? React.createElement(notifications, {
					user : this.state.user,
					privateMessages : this.state.privateMessages,
					friends : this.state.friends,
					blocks : this.state.blocks,
					options : this.state.options,
					selectedChat : this.state.selectedChat,
					lobby : this.state.lobby,
					lobbyMessages : this.state.lobbyMessages,
					incomingInvites : this.state.incomingInvites,
					setOption : this.setOption,
					stateChange: this.stateChange,
				}) :"",
				!this.state.options.hideCommunity && this.state.user ? React.createElement(communicator, {
					user : this.state.user,
					privateMessages : this.state.privateMessages,
					friends : this.state.friends,
					blocks : this.state.blocks,
					options : this.state.options,
					selectedChat : this.state.selectedChat,
					lobby : this.state.lobby,
					lobbyMessages : this.state.lobbyMessages,
					messageInputSelected : this.state.messageInputSelected,
					setOption : this.setOption,
					stateChange: this.stateChange,
				}) :""
			),
		
		)
	}
}