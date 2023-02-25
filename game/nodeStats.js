import {
    COLORS
} from "../index.js"
export class nodeStats extends React.Component {
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
            }
        },
            React.createElement("div", {
                style: {
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    width : "8vmin",
                    border: "1px solid",
                    borderRadius: "100vmin",
                    backgroundColor: COLORS[this.props.player.team][this.props.player.color][0],
                    color : COLORS[this.props.player.team][this.props.player.color][1],
                    width: "3vmin",
                    height: "3vmin",
                    marginTop : ".25vmin",
                    fontSize : "1.5vmin",
                }
            },  
                React.createElement("div", {}, this.props.game.turns[this.props.loadedTurnIndex].userCommands[this.props.player.userId][this.props.nodeKey].points), 
            ),
        )
	}
} 