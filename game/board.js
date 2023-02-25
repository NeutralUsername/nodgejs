import {
	COLORS
} from '../index.js'
import {
	nodeStats
} from './nodeStats.js'
export class board extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	
	componentWillUnmount() {

	}

	render() {
		var row_components = []
 		for(var i = this.props.minRow; i <= this.props.maxRow; i++){
			row_components.push(React.createElement(row, {
				key: i,
				row : i,
				game : this.props.game,
				nodes : this.props.nodes,
				minRow : this.props.minRow,
				maxRow : this.props.maxRow,
				minCol : this.props.minCol,
				maxCol : this.props.maxCol,
				options : this.props.options,
				loadedTurnIndex : this.props.loadedTurnIndex,
				loadedStepIndex : this.props.loadedStepIndex,
				nodeLeftclickEvent : this.props.nodeLeftclickEvent,
				nodeRightclickEvent : this.props.nodeRightclickEvent,
				validCommand : this.props.validCommand,
				previousCommand : this.props.previousCommand,
				isReplaying : this.props.isReplaying,
				selectedReplayNode : this.props.selectedReplayNode,
				selectedPlayer : this.props.selectedPlayer,
				stateChange : this.props.stateChange,
			}))
		} 
		return React.createElement("div", {
				style: {
					flexDirection : "column",
					display: "flex",
					gap : "0vmin",
				}
			},
			row_components
		)
	}
}

class row extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentWillUnmount() {

	}

	getKey = (row, col) => {
		if(row % 2) 
			var q = col - (row + (row&1)) / 2
		else 
			var q = col - (row - (row&1)) / 2
		var r = row
		var s = -q - r
		return q+","+r+","+s
	}

	render() {
		var node_components = []

		for(var i = this.props.minCol; i <= this.props.maxCol; i++){
			let key = this.getKey(this.props.row, i)
			let nodeStats = this.props.nodes[key]
			if(!this.props.nodes[key])
				nodeStats = {}
			node_components.push(React.createElement(node, {
				key: key,	
				nodeKey : key,
				stats : nodeStats,
				game : this.props.game,
				options : this.props.options,
				loadedTurnIndex : this.props.loadedTurnIndex,
				loadedStepIndex : this.props.loadedStepIndex,
				nodeLeftclickEvent : this.props.nodeLeftclickEvent,
				nodeRightclickEvent : this.props.nodeRightclickEvent,
				validCommand : this.props.validCommand,
				previousCommand : this.props.previousCommand,
				isReplaying : this.props.isReplaying,
				selectedReplayNode : this.props.selectedReplayNode,
				selectedPlayer : this.props.selectedPlayer,
				stateChange : this.props.stateChange,
			}))
		}
		return React.createElement("div", {
				style: {
					display: "flex",
					justifyContent: "center",
					marginRight : this.props.row % 2 ? "4.8vmin" : "",
					gap : ".55vmin"
				}
			},
			node_components
		)
	}
}

class node extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.state.drag_over_cooldown = false
		this.state.mouse_down_cooldown = false
	}

	mousedown_timeout = () => {
		this.state.mouse_down_cooldown = setTimeout(() => {
			this.props.nodeLeftclickEvent(this.props.nodeKey)
			this.mousedown_timeout()
		}, 333, )
	}

	borderCSS = () => {
		if(this.props.options.uiTheme == "dark") {
			if(Number.isInteger(this.props.stats.supply)) 
				return "solid white .1vmin"
			else return "solid #222426 .1vmin"
		}
		else {
			if(Number.isInteger(this.props.stats.supply)) 
				return "solid #222426 .1vmin"
			else return "solid white .1vmin"
		}
	}

	backgroundColorCSS = () => {
		if(!this.owner())
			return ""
		return COLORS[this.props.game.players.find(player => player.userId == this.owner()).team][this.props.game.players.find(player => player.userId == this.owner()).color][0]
	}

	supplyTextCSS = () => {
		if(!this.owner())
			if(this.props.options.uiTheme === "light")
				return "white"
			else return "#222426"
		return COLORS[this.props.game.players.find(player => player.userId == this.owner()).team][this.props.game.players.find(player => player.userId == this.owner()).color][1]

	}

	commandTextCSS = () => {
		if(!this.command())
			if(this.props.options.uiTheme === "light")
				return "white"
			else return "#222426"
		if(this.owner())
			return this.supplyTextCSS()
		else {
			if(this.props.options.uiTheme === "light")
				return "#222426"
			else return "white"
		}
	}

	cursorCSS = () => {
		if(this.props.validCommand(this.props.nodeKey))
			return "pointer"
	}

	outlineCSS = () => {
		if (this.props.loadedTurnIndex == this.props.game.turns.length)
			return this.props.previousCommand == this.props.nodeKey ? "solid .4vmin" : ""
		else {
			if(this.props.game.turns[this.props.loadedTurnIndex].stepChanges[this.props.loadedStepIndex] && this.props.game.turns[this.props.loadedTurnIndex].stepChanges[this.props.loadedStepIndex][this.props.nodeKey])
				return "solid .4vmin"
			else return ""
		}
	}

	supply = () => {
		if(this.props.stats.commandedPoints == 0) {
			return this.props.stats.supply
		}
		else {
			if (this.props.stats.supply == 0 || this.props.stats.ownerUserId == this.props.stats.commanderUserId) {
				return this.props.stats.commandedPoints + this.props.stats.supply
			}
			else {
				return Math.max(this.props.stats.commandedPoints - this.props.stats.supply, this.props.stats.supply - this.props.stats.commandedPoints)
			}
		}
	}

	owner = () => {
		if(this.props.stats.commandedPoints == 0) {
			return this.props.stats.ownerUserId
		}
		else {
			if(this.props.stats.commanderUserId == this.props.stats.ownerUserId) {
				return this.props.stats.ownerUserId
			}
			else {
				if(this.props.stats.commandedPoints == this.props.stats.supply)
					return ""
				else {
					if(this.props.stats.commandedPoints > this.props.stats.supply)
						return this.props.stats.commanderUserId
					else return this.props.stats.ownerUserId
				}
			}
		}
	}

	command = () => {
		if (this.props.loadedTurnIndex == this.props.game.turns.length ) {
			if (this.props.stats.commandedPoints == 0)
				return ""
			else return this.props.stats.commandedPoints	
		} else {
			let selectedPlayerCommands = this.props.game.turns[this.props.loadedTurnIndex].userCommands[this.props.selectedPlayer]
			if (selectedPlayerCommands && selectedPlayerCommands[this.props.nodeKey] && (selectedPlayerCommands[this.props.nodeKey].stepUsed > this.props.loadedStepIndex || selectedPlayerCommands[this.props.nodeKey].stepUsed == -1))
				return selectedPlayerCommands[this.props.nodeKey].points
			else return ""
		}
	}

	render() {
		let commands = []
		if (this.props.loadedTurnIndex < this.props.game.turns.length) {
			let userCommands = this.props.game.turns[this.props.loadedTurnIndex].userCommands
			Object.keys(userCommands).forEach(userId => {
				let player = this.props.game.players.find(player => player.userId == userId)
				if (userCommands[userId][this.props.nodeKey] && userCommands[userId][this.props.nodeKey].stepUsed  != -1 && userCommands[userId][this.props.nodeKey].stepUsed == this.props.loadedStepIndex ) {
					commands.push(React.createElement(nodeStats, {
						player : player,
						nodeKey : this.props.nodeKey,
						stats : this.props.stats,
						game : this.props.game,
						options : this.props.options,
						loadedTurnIndex : this.props.loadedTurnIndex,
						loadedStepIndex : this.props.loadedStepIndex,
						nodeLeftclickEvent : this.props.nodeLeftclickEvent,
						nodeRightclickEvent : this.props.nodeRightclickEvent,
						validCommand : this.props.validCommand,
						previousCommand : this.props.previousCommand,
						isReplaying : this.props.isReplaying,
						selectedReplayNode : this.props.selectedReplayNode,
						stateChange : this.props.stateChange,
					}))
				}
			})
		}
		return   React.createElement("div", {
			className : "node",
			id : this.props.nodeKey,
			onContextMenu: (e) => {
				this.props.nodeRightclickEvent(this.props.nodeKey)
			},
			onMouseDown: e => {
				if (e.buttons != 1) return
				if (this.props.isReplaying() || this.props.game.ended) {
					if(this.props.selectedReplayNode != this.props.nodeKey)
						this.props.stateChange("selectedReplayNode", this.props.nodeKey)
					else this.props.stateChange("selectedReplayNode", false)
					return
				}
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
					return
				if (this.state.mouse_down_cooldown)
					return
				this.props.nodeLeftclickEvent(this.props.nodeKey)
				this.mousedown_timeout()
			},
			onMouseUp: e => {
				clearTimeout(this.state.mouse_down_cooldown)
				this.state.mouse_down_cooldown = false
			},
			onMouseLeave: e => {
				clearTimeout(this.state.drag_over_cooldown)
				clearTimeout(this.state.mouse_down_cooldown)
				this.state.mouse_down_cooldown = false
				this.state.drag_over_cooldown = false
			},
			onMouseOver: (e) => {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
					return
				if (e.buttons === 1 && !this.state.drag_over_cooldown && !this.state.mouse_down_cooldown) {
					this.props.nodeLeftclickEvent(this.props.nodeKey)
					this.state.drag_over_cooldown = true
					this.mousedown_timeout()
					setTimeout(() => {
						this.state.drag_over_cooldown = false
					}, 333, this.state.drag_over_cooldown)
				}
			},
			onTouchStart: e => {
				this.props.nodeLeftclickEvent(this.props.nodeKey)
			},
			style : {
				outline : this.outlineCSS(),
				display : "flex",
				alignItems : "center",
				justifyContent : "center",
				width : "4.3vmin",
				height : "4.3vmin",
				flexDirection : "column",
				borderRadius : "10vmin",
				cursor : this.cursorCSS(),
				backgroundColor : this.backgroundColorCSS (),
				border : this.borderCSS(),
				position : "relative",
			}
		}, 
			React.createElement("b", {
				style : {
					color : this.supplyTextCSS(),
					marginTop : "-0.5vmin",
					fontSize : "2.5vmin",
				}
			}, this.supply()),
			React.createElement("div", {
				style : {
					color : this.commandTextCSS(),
					marginTop : "-.7vmin" ,
					fontSize : "1.5vmin",
				}
			},  this.command() ),
			this.props.nodeKey == this.props.selectedReplayNode && (this.props.isReplaying() || this.props.game.ended)  ?  React.createElement("div", {
                style : {
                    position : "absolute",
                    padding : ".5vmin",
                    border : "solid 2px",
                    visibility : commands.length > 0 ? "visible" : "hidden",
                    display : "flex",
                    flexDirection : "column",
                    left : "2vmin",
                    bottom : "4vmin",
                    backgroundColor : this.props.options.uiTheme == "dark" ? "#313538" : "#e6e6e6",
                    zIndex : 10,
                }
            },
                commands
        	)	 :null
		) 
	}
}