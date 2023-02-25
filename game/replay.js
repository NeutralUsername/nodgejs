
export class    replay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    marginTop : "3vmin",
                    alignItems: "center",
                    gap : "2vmin"
                }
        },
            React.createElement("img", {
                src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/leftArrow_w.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/leftArrow_b.svg",
                style: {
                    width : "3.5vmin",
                    marginTop : "2.5vmin",
                    cursor : "pointer",
                    visibility : (this.props.loadedTurnIndex == 0 && this.props.loadedStepIndex == -1)  || (!this.props.game.activeTurn && !this.props.game.ended) ? "hidden" : "visible",
                },
                onClick : () => {
                    if (this.props.loadedStepIndex > -1) {
                        this.props.stateChange("loadedStepIndex", this.props.loadedStepIndex-1)
                    } else if (this.props.loadedTurnIndex > 0) {
                        this.props.stateChange("loadedTurnIndex", this.props.loadedTurnIndex-1)
                        this.props.stateChange("loadedStepIndex", Object.keys(this.props.game.turns[this.props.loadedTurnIndex-1].stepChanges).length-2)
                    }
                },
            },),
            React.createElement("div", {
                style: {
                    flexDirection : "column",
                    display: "flex",
                    alignItems: "center",
                    marginTop : "1vmin",
                    touchAction : "auto",
                    gap : "1vmin",
                }
            },
                React.createElement("input", {
                    type : "range",
                    max : this.props.lastTurn(),
                    min : 0,
                    value : this.props.loadedTurnIndex,
                    disabled : !this.props.game.activeTurn && !this.props.game.ended,
                    onChange : (e) => {
                        this.props.stateChange("loadedTurnIndex", parseInt(e.target.value))
                        this.props.stateChange("loadedStepIndex", this.props.lastTurnStep())
                    },
                    style : {
                        visibility : this.props.game.turns.length == 0 ? "hidden" : "visible",
                        width : "40vmin",
                        height : "3vmin",
                        accentColor : this.props.options.uiTheme === "light" ? "black" : "white",
                        opacity : ".5",
                        marginBottom : "1vmin",
                    }
                }, ),
                React.createElement("input", {
                    type : "range",
                    max : this.props.lastTurnStep(),
                    min : -1,
                    value : this.props.loadedStepIndex,
                    disabled : !this.props.game.activeTurn && !this.props.game.ended,
                    onChange : (e) => {
                        this.props.stateChange("loadedStepIndex", parseInt(e.target.value))
                    },
                    style : {
                        width : "25vmin",
                        height : "2vmin",
                        opacity : ".5",
                        accentColor : this.props.options.uiTheme === "light" ? "black" : "white",
                        visibility : this.props.loadedTurnIndex < this.props.game.turns.length ? "visible" : "hidden",
                    }
                }, ) ,
            ),
            React.createElement("img", {
                src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/leftArrow_w.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/leftArrow_b.svg",
                style: {
                    width : "3.5vmin",
                    marginTop : "2.5vmin",
                    cursor : "pointer",
                    transform : "rotate(180deg)",
                    visibility : (this.props.loadedTurnIndex == this.props.lastTurn() && this.props.loadedStepIndex == this.props.lastTurnStep()) ||  (!this.props.game.activeTurn && !this.props.game.ended) ? "hidden" : "visible",
                },
                onClick : () => {
                    if (this.props.loadedStepIndex < this.props.lastTurnStep()) {
                        this.props.stateChange("loadedStepIndex", this.props.loadedStepIndex+1)
                    } else if (this.props.loadedTurnIndex < this.props.lastTurn()) {
                        this.props.stateChange("loadedTurnIndex", this.props.loadedTurnIndex+1)
                        this.props.stateChange("loadedStepIndex", -1)
                    }
                }
            },),
        )
	}
}