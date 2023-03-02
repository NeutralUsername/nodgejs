import {
	COLORS
} from "../index.js"
export class status extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.reRenderLoop()
	}

	componentWillUnmount() {
		clearTimeout(this.state.timeout)
	}

	reRenderLoop = () => {
		this.state.timeout = setTimeout( () =>  {
			this.forceUpdate()
			this.reRenderLoop()
		}, 33)
	}

	borderColorCSS = () => {
		return "solid " + (this.props.options.uiTheme === "dark" ? "white " : this.props.options.uiTheme === "light" ? "black " : "") + " 2px"
	}

	backgroundColorCSS = () => {
		if(this.props.userPlayer && this.props.game.activeTurn && this.props.game.activeTurn.readys[this.props.userPlayer.userId])
			return "grey"
		else return this.props.options.uiTheme === "dark" ? "#222426" : this.props.options.uiTheme === "light" ? "white" : ""
	}

	cursorCSS = () => {
		if(this.props.validReady()) return "pointer"
		else return "default"
	}

	render() {
		return React.createElement("div", {
			style: {
				flexDirection : "row",
				display: "flex",
				position :"relative",
				marginBottom : "1vmin",
			}
		},
			this.props.userPlayer && this.props.game.activeTurn?	React.createElement("div", {
				style : {
					position : "absolute",
					right : "10.5vmin",
					top : "1.5vmin",
					visibility : this.props.game.activeTurn ? "visible" : "hidden",
				}
			},	
				React.createElement("div", {
					onClick : () => this.props.emitReset(),
					style: {
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						border : "solid " + (this.props.options.uiTheme === "dark" ? "white " : this.props.options.uiTheme === "light" ? "black " : "") + " 2px",
						fontSize: "2.5vmin",
						width : "5vmin",
						height : "3.5vmin",
						backgroundColor : COLORS[this.props.userPlayer.team][this.props.userPlayer.color][0],
						color : COLORS[this.props.userPlayer.team][this.props.userPlayer.color][1],
					}
				}, this.props.pointsAvailable) ,
			) : "",
		
			this.props.userPlayer ?	 React.createElement("div", {
				style : {
					position : "absolute",
					left : "10.5vmin",
					top : "1.5vmin",
					visibility : this.props.game.activeTurn ? "visible" : "hidden",
				}
			},	
				React.createElement("input", {
					type : "text",
					value : this.props.commandCount,
					onChange : () => {},
					style: {
						display: "flex",
						
						textAlign : "center",
						border : "solid " + (this.props.options.uiTheme === "dark" ? "white " : this.props.options.uiTheme === "light" ? "black " : "") + " 2px",
						fontSize: "2.5vmin",
						width : "3vmin",
						height : "3.5vmin",
					}
				}, ) ,
			) : "",

			React.createElement("div", {
				onClick: () => this.props.emitReady(),
				style: {
					cursor : this.cursorCSS(),
					position :"relative",
					display: "flex",
					fontSize: "3vmin",
					border: this.borderColorCSS(),
					backgroundColor : this.backgroundColorCSS(),
					width: "8vmin",
					height: "6vmin",
					justifyContent: "center",
					alignItems: "center",
				}
			},
				this.props.game.activeTurn? 
				React.createElement("i", {},this.props.getTimer() > 0 ?  (this.props.getTimer() / 1000).toFixed(1) : 0) : 
				React.createElement("b", {
					style : {
						fontSize : "4vmin",
					}
				}, this.props.loadedTurnIndex+1)
			)
		)
	}
}