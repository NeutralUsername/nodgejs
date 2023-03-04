import {
	constructMessage,
	WS
} from "../index.js"
import {
	board
} from "./board.js"
import {
	status
} from "./status.js"
import {
	replay
} from "./replay.js"
import {
	players
} from "./players.js"
export class game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.keydownHandler = this.keydownHandler.bind(this)
	}

	componentDidMount() {
		document.addEventListener("keydown", this.keydownHandler, false)
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.keydownHandler, false)
	}

	keydownHandler = (e) => {
		if (this.props.messageInputSelected) return
		switch (e.key) {
			case "Escape":
				e.preventDefault()
				this.emitLeave()
				break
			case " ":
				e.preventDefault()
				this.emitReady()
				break
			case "r":
				this.emitTakeback(this.props.previousCommand)
				break
			case "R":
				this.emitReset()
				break
			case "o":
				this.props.PlayTurnSteps()
				break
			case "p":
				this.props.stopAnimation()
				break
			case "ArrowLeft":
				e.preventDefault()
				if (this.props.loadedStepIndex > -1) {
					this.props.stateChange("loadedStepIndex", this.props.loadedStepIndex-1)
				} else if (this.props.loadedTurnIndex > 0) {
					this.props.stateChange("loadedTurnIndex", this.props.loadedTurnIndex-1)
					this.props.stateChange("loadedStepIndex", Object.keys(this.props.game.turns[this.props.loadedTurnIndex].stepChanges).length-2)
				}
				break
			case "ArrowRight":
				e.preventDefault()
				if (this.props.loadedStepIndex < this.props.lastTurnStep()) {
					this.props.stateChange("loadedStepIndex", this.props.loadedStepIndex+1)
				} else if (this.props.loadedTurnIndex < this.props.lastTurn()) {
					this.props.stateChange("loadedTurnIndex", this.props.loadedTurnIndex+1)
					this.props.stateChange("loadedStepIndex", -1)
				}
				break
			case "1": case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":
				this.props.stateChange("commandCount", Number(e.key))
				break
			case "w" :  this.emitCommand(this.topLeft(this.props.previousCommand)); break;
			case "e" :  this.emitCommand(this.topRight(this.props.previousCommand)); break;
			case "a" :  this.emitCommand(this.left(this.props.previousCommand)); break;
			case "d" :  this.emitCommand(this.right(this.props.previousCommand)); break;
			case "z" :
			case "y" :  this.emitCommand(this.bottomLeft(this.props.previousCommand)); break;
			case "x" :  this.emitCommand(this.bottomRight(this.props.previousCommand)); break;
			case "s" :  this.emitCommand(this.props.previousCommand); break;
			case "W" :  this.props.stateChange("previousCommand", this.topLeft(this.props.previousCommand) ); break;
			case "E" :  this.props.stateChange("previousCommand",  this.topRight(this.props.previousCommand)); break;
			case "A" :  this.props.stateChange("previousCommand",  this.left(this.props.previousCommand)); break;
			case "D" :  this.props.stateChange("previousCommand",  this.right(this.props.previousCommand)); break;
			case "Z" :
			case "Y" :  this.props.stateChange("previousCommand",  this.bottomLeft(this.props.previousCommand)); break;
			case "X" :  this.props.stateChange("previousCommand",  this.bottomRight(this.props.previousCommand)); break;
		}
	}


	nodes = (boardString) => {
		let nodeKeys = boardString.split(" ")
		let nodes = {}
		for(let i = 0; i < nodeKeys.length; i++) {
			let nodeKey = nodeKeys[i]
			nodes[nodeKey] = this.node(nodeKey)
		}
		nodeKeys.forEach((nodeKey) => {
			let node = nodes[nodeKey]
			node.edges.topLeft = nodes[this.bottomLeft(nodeKey)] 
			node.edges.topRight = nodes[this.left(nodeKey)]
			node.edges.left = nodes[this.bottomRight(nodeKey)]
			node.edges.right = nodes[this.topLeft(nodeKey)]
			node.edges.bottomLeft = nodes[this.right(nodeKey)]
			node.edges.bottomRight = nodes[this.topRight(nodeKey)]
		})
		this.props.game.turns.forEach((turn,i) =>{
			if( (i <= this.props.loadedTurnIndex) ) {
				let steps = Object.keys(turn.stepChanges)
				steps.forEach(step => {
					if(i < this.props.loadedTurnIndex || step <= this.props.loadedStepIndex) {
						let nodeKeys = Object.keys(turn.stepChanges[step])
						nodeKeys.forEach(nodeKey => {
							let nodeChange = turn.stepChanges[step][nodeKey]
							nodes[nodeKey].ownerUserId = nodeChange.owner
							nodes[nodeKey].supply = nodeChange.supply
						})
					}
				})
			}
		})
		if(this.props.loadedTurnIndex == this.props.game.turns.length && this.props.game.activeTurn) {
			let userIds = Object.keys(this.props.game.activeTurn.userCommands)
			userIds.forEach(userId => {
				let commands = Object.keys( this.props.game.activeTurn.userCommands[userId])
				commands.forEach(nodeKey => {
					nodes[nodeKey].commanderUserId = userId
					nodes[nodeKey].commandedPoints = this.props.game.activeTurn.userCommands[userId][nodeKey].points
				})
			})
		}
		return nodes
	}

	node = (nodeKey) => {
		let cords = nodeKey.split(",")
		let node = {
			q : parseInt(cords[0]),
			r : parseInt(cords[1]),
			s : parseInt(cords[2]),
			supply : 0,
			commandedPoints : 0,
			commanderUserId : "",
			ownerUserId : "",
			key : nodeKey,
			edges : {}
		}
		return node
	}

	bottomLeft = (nodeKey) => {
		let cords = nodeKey.split(",")
		let q = parseInt(cords[0])
		let r = parseInt(cords[1])
		let s = parseInt(cords[2])
		return (q - 1) + "," + (r + 1) + "," + s
	}
	bottomRight = (nodeKey) => {
		let cords = nodeKey.split(",")
		let q = parseInt(cords[0])
		let r = parseInt(cords[1])
		let s = parseInt(cords[2])
		return q + "," + (r + 1) + "," + (s - 1)
	}
	right = (nodeKey) => {
		let cords = nodeKey.split(",")
		let q = parseInt(cords[0])
		let r = parseInt(cords[1])
		let s = parseInt(cords[2])
		return (q + 1) + "," + r + "," + (s - 1)
	}
	topRight = (nodeKey) => {
		let cords = nodeKey.split(",")
		let q = parseInt(cords[0])
		let r = parseInt(cords[1])
		let s = parseInt(cords[2])
		return (q + 1) + "," + (r - 1) + "," + s
	}
	topLeft = (nodeKey) => {
		let cords = nodeKey.split(",")
		let q = parseInt(cords[0])
		let r = parseInt(cords[1])
		let s = parseInt(cords[2])
		return q + "," + (r - 1) + "," + (s + 1)
	}
	left = (nodeKey) => {
		let cords = nodeKey.split(",")
		let q = parseInt(cords[0])
		let r = parseInt(cords[1])
		let s = parseInt(cords[2])
		return (q - 1) + "," + r + "," + (s + 1)
	}
	minRow = (nodes) => {
		let min = 0
		Object.keys(nodes).forEach((key) => {
			if(nodes[key].r < min) min = nodes[key].r
		})
		return min
	}
	maxRow = (nodes) => {
		let max = 0
		Object.keys(nodes).forEach((key) => {
			if(nodes[key].r > max) max = nodes[key].r
		})
		return max
	}
	minCol = (nodes) => {
		let min = 0
		Object.keys(nodes).forEach((key) => {
			if(nodes[key].q < min) min = nodes[key].q
		})
		return min
	}
	maxCol = (nodes) => {
		let max = 0
		Object.keys(nodes).forEach((key) => {
			if(nodes[key].q > max) max = nodes[key].q
		})
		return max
	}

	player = (userId) => {
		return  this.props.game.players.find(user => user.userId  === userId)
	}

	userPlayer = () => {
		if (!this.props.user.ingame) return undefined
		return this.props.game.players.find(user => user.userId == this.props.user.id)
	}

	pointsAvailable = () => {
		if(this.props.game.activeTurn && this.userPlayer()) {
			let turnPoints = this.props.game.activeTurn.points
			let pointsSpent = 0
			let commands = this.props.game.activeTurn.userCommands[this.userPlayer().userId]
			if(commands) {
				Object.keys(commands).forEach(nodeKey => {
					pointsSpent += commands[nodeKey].points
				})
			}
			return turnPoints - pointsSpent
		}
		else return 0
	}

	getTimer = () => {
		var activeTurn = this.props.game.activeTurn
		if(activeTurn) {
			let startedAt = new Date(activeTurn.started)
			let endingAt = new Date(startedAt.valueOf()+activeTurn.timeLimit*1000)
			return Math.max(endingAt - new Date(), 0)
		}
		else return 0
	}

	validEmit = () => {
		if (this.isReplaying()) return false
		if (this.isSpectator()) return false
		if(this.props.game.ended) return false
		if(!this.props.game.activeTurn) return false
		if (!this.userPlayer()) return false
		return true
	}

	emitTakeback = (nodeKey) => {
		if(!this.validEmit()) return false
		if(this.pointsAvailable() == this.props.game.activeTurn.points) return false
		if(!this.nodes(this.props.game.boardString)[nodeKey]) return false
		if(!this.props.game.activeTurn.userCommands[this.userPlayer().userId] || !this.props.game.activeTurn.userCommands[this.userPlayer().userId][nodeKey]) return false
		WS.send(constructMessage("takeback", [nodeKey]))
	}

	emitReady = () => {
		if(!this.validEmit()) return false
		WS.send("ready")
	}

	validCommand = (key) => {
		if(!this.validEmit()) return false
		let nodes = this.nodes(this.props.game.boardString)
		let node = nodes[key]
		if(!node) return false
		let edges = Object.values(node.edges)

		let turn = this.props.game.activeTurn
		if(node.ownerUserId != "" && node.ownerUserId != this.userPlayer().userId && this.player(node.ownerUserId).team == this.userPlayer().team) return false
		for(let i= 0; i < this.props.game.players.length; i++) {
			let player = this.props.game.players[i]
			if(player.userId == this.userPlayer().userId) continue
			if(turn.userCommands[player.userId] && turn.userCommands[player.userId][key])
				return false
		}

		let controlledNeighbor = false 
		let commands = turn.userCommands[this.userPlayer().userId]
		for(let i = 0; i < edges.length; i++) {
			if(!edges[i])
				continue
			let nodeKey = edges[i].key
			let node = nodes[nodeKey]
			if(node.ownerUserId == this.userPlayer().userId) {
				controlledNeighbor = true
				break
			}
			if(commands && commands[nodeKey] && commands[nodeKey].points > node.supply)
				controlledNeighbor = true
		}
		if(!(controlledNeighbor || node.ownerUserId == this.userPlayer().userId || this.props.game.turns.length == 0)) return false
		if(this.props.game.turns.length == 0 && key == "0,0,0") return false
		if(this.pointsAvailable() < 1) return false
		if(!this.props.commandCount) return false
		return true
	}

	emitCommand = (nodeKey) => {
		if(!this.validCommand(nodeKey)) return false
		WS.send(constructMessage("command", [nodeKey, this.props.commandCount]))
	}

	emitReset = () => {
		if(!this.validEmit()) return false
		if(this.pointsAvailable() == this.props.game.activeTurn.points) return false
		WS.send("reset")
	}

	emitLeave = () => {
		if(!this.userPlayer() || (this.props.game.players.filter(player => player.placement > -1).length == this.props.game.players.length)) {
			if(this.props.game.activeTurn) {
				WS.send("leaveSpectate")
			}
			this.props.stateChange("content", "lobby")
		} 
		else if(confirm("leave game?") )
			WS.send("leaveGame")
	}

	isSpectator = () => {
		if (!this.userPlayer() && ! this.props.game.ended) return true
	}

	isReplaying = () => {
		if ( (this.props.loadedTurnIndex == this.props.game.turns.length && this.props.loadedStepIndex == -1) ) return false
		return true
	}

	statusMsg = () => {
		if (!this.props.options.showTutorial) return String.fromCharCode(160)
		if ( this.props.game.ended) return "game ended"
		if (this.isSpectator()) return "spectating"
		if(!this.props.game.activeTurn) return "turn ending"
		if(this.isReplaying()) return "replaying..."
		if (this.props.game.turns.length == 0) {
			if (this.pointsAvailable() == 0) {
				if (this.props.game.activeTurn.readys[this.userPlayer().userId]) return "wait for turn end"
				return "click the timer or press \'space\' to signal you're ready"
			}
			else return "click any node to place your point"
		} else {
			if (this.pointsAvailable() > 0) return "click any node connected to your color. use all of your points"
			else if (this.pointsAvailable() == 0){ 
				if (this.props.game.activeTurn.readys[this.userPlayer().userId]) return "wait for turn end"
				return "click the timer or press \'space\' to signal you're ready"
			}
		}
	}

	render() {
		let nodes = this.nodes(this.props.game.boardString)
		return React.createElement("div", {
			style: {
				marginTop : "1vmin",
				display: "flex",
				flexDirection : "column",
				alignItems : "center",
				justifyContent : "center",
				touchAction : "none"
			}
		},
			React.createElement("div", {
				style : {
					display : "flex",
					marginBottom : "2vmin",
					fontSize : "3vmin",
				
				},
			},this.statusMsg()),
			React.createElement(status, {
				loadedTurnIndex: this.props.loadedTurnIndex,
				loadedStepIndex: this.props.loadedStepIndex,
				game: this.props.game,
				userPlayer : this.userPlayer(),
				pointsAvailable : this.pointsAvailable(),
				spectatingFlag : this.props.spectatingFlag,
				emitReady: this.emitReady,
				emitReset : this.emitReset,
				validReady : this.validEmit,
				getTimer : this.getTimer,
				options: this.props.options,
				latestTurn : this.props.game.turns[this.props.game.turns.length-1],
				commandCount : this.props.commandCount,
			}),
			React.createElement(board, {
				nodes : nodes,
				game : this.props.game,
				options : this.props.options,
				minRow : this.minRow(nodes),
				maxRow : this.maxRow(nodes),
				minCol : this.minCol(nodes),
				maxCol : this.maxCol(nodes),
				previousCommand : this.props.previousCommand,
				loadedTurnIndex : this.props.loadedTurnIndex,
				loadedStepIndex : this.props.loadedStepIndex,
				selectedReplayNode : this.props.selectedReplayNode,
				selectedPlayer : this.props.selectedPlayer,
				stateChange : this.props.stateChange,
				nodeLeftclickEvent : this.emitCommand,
				nodeRightclickEvent : this.emitTakeback,
				validCommand : this.validCommand,
				isReplaying : this.isReplaying,
			}, ),
			React.createElement(replay, {
				options : this.props.options,
				game : this.props.game,
				loadedTurnIndex : this.props.loadedTurnIndex,
				loadedStepIndex : this.props.loadedStepIndex,
				stateChange : this.props.stateChange,
				lastTurn : this.props.lastTurn,
				lastTurnStep : this.props.lastTurnStep,
				/* playTurnSteps : this.props.playTurnSteps, */
			}),
			React.createElement("div", {
				style : {
					display : "flex",
					alignItems : "start",
					justifyContent : "start",
					marginTop : "4vmin",
				}
			},
				React.createElement(players, {
					game : this.props.game,
					user : this.props.user,
					options : this.props.options,
					selectedPlayer : this.props.selectedPlayer,
					nodes : nodes,
					stateChange : this.props.stateChange,
				}),
			),
			React.createElement("div", {
				style : {
					marginTop : "2vmin",
				}
			},
				React.createElement("button", {
					onClick : () => this.emitLeave(),
				}, "Leave Game")
			)
		)
	}
}



