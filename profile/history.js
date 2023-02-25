import {
	WS,
    COLORS
} from "../index.js"
export class history extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

    replayClick = () => {
        this.props.stateChange("game", this.props.game)
        this.props.stateChange("loadedStepIndex", Object.keys(this.props.game.turns[this.props.game.turns.length-1].stepChanges).length -2)
        this.props.stateChange("loadedTurnIndex", this.props.game.turns.length-1)
        this.props.stateChange("content", "game")
    }

	render() {
        let profileUser = this.props.game.players.find(player => player.userId == this.props.profileUserId)
        let ratingChange = profileUser.newRating - profileUser.oldRating
        let lastTurn = this.props.game.turns[this.props.game.turns.length-1]
		return React.createElement("div", {
                onClick : () => this .replayClick(),
                style: {
                    display: "flex",
                    flexDirection: "row",
                    gap: "1vmin",
                    alignItems : "center",
                    justifyContent : "center",
                    height : "5vmin",
                    cursor : "pointer",
                    backgroundColor : this.props.options.uiTheme == "dark" ? "#313538" : "#e6e6e6",
                    borderRadius : ".5vmin",
                    paddingLeft : "1vmin",
                    paddingRight : "1vmin"
                }
            },
                React.createElement("div", {
                style : {
                    display : "flex",
                    width : "6vmin",
                    color : ratingChange > 0 ? "green" : ratingChange < 0 ? "red" : "grey",
                    justifyContent :    "flex-start",
                }
                },
                    Number(ratingChange) ?( ratingChange > 0 ? ("+"+ ratingChange.toFixed(1)) : (ratingChange.toFixed(1))) : "0",
                ),
                React.createElement("div", {
                    style : {
                        width : "6vmin",
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
                            backgroundColor: COLORS[profileUser.team][profileUser.color][0],
                            color : COLORS[profileUser.team][profileUser.color][1],
                            width: "3vmin",
                            height: "3vmin",
                            marginTop : ".25vmin",
                            fontSize : "1.5vmin"
                        }
                    },  
                        React.createElement("b", {},profileUser.placement), 
                    ),
   
                ),

                React.createElement("div", {
                    style : {
                        width : "18vmin"
                    }
                },
                new Date(lastTurn.ended).getHours() +":"+ (new Date(lastTurn.ended).getMinutes() < 10 ? "0"+ new Date(lastTurn.ended).getMinutes() : new Date(lastTurn.ended).getMinutes()) +" "+ new Date(lastTurn.ended).toLocaleDateString()
            ), 
        )
	}
}