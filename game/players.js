import{
    player
} from "./player.js"
export class players extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {
        let playerComps = []
        for (let i = 0; i < this.props.game.players.length; i++) {
            playerComps.push(React.createElement(player, {
                player : this.props.game.players[i],
                game : this.props.game,
                options : this.props.options,
                user : this.props.user,
                nodes : this.props.nodes,
                selectedPlayer : this.props.selectedPlayer,
                stateChange : this.props.stateChange,
            }))
        }
		return React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent : "start",
                    gap : ".5vmin",
                    width : "max-content",
                }
        },
            playerComps
        )
	}
}