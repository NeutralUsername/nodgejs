import {
    COLORS
} from "../index.js"

export class    player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

    backgroundColorCSS = () => {
        if (this.props.selectedPlayer == this.props.player.userId) {
            return this.props.options.uiTheme == "dark"?  "#505559" : "gainboro"
        } else {
            return this.props.options.uiTheme == "dark" ? "#313538" : "#e6e6e6"
        }
    }

	render() {
        let supply = 0
        let nodeKeys = Object.keys(this.props.nodes)
        for (let i = 0; i < nodeKeys.length; i++) {
            let node = this.props.nodes[nodeKeys[i]]
            if (node.ownerUserId === this.props.player.userId) {
                supply += node.supply
            }
        }
		return React.createElement("div", {
            onClick : () => {
                if (this.props.selectedPlayer == this.props.player.userId) {
                    this.props.stateChange("selectedPlayer", false)
                } else {
                    this.props.stateChange("selectedPlayer", this.props.player.userId)
                }
            },
            style: {
                cursor : "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent : "start",
                /*  backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555", */
                backgroundColor :  this.backgroundColorCSS(),
                borderRadius : ".5vmin",
                padding : ".5vmin",
                gap : ".5vmin",
                width : "100%"
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
                    marginLeft : ".5vmin"
                }
            },  
                React.createElement("b",{},this.props.player.placement != -1 ? this.props.player.placement : "-"), 
            ),
            React.createElement("div", {
                style: {
                    display: "flex",
                    width : "4vmin",
                    marginLeft:  "2vmin"
                }
            }, supply),
           React.createElement("img", {
				src: this.props.options.uiTheme === "dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/check_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/check_b.png",
				style: {
					cursor : "pointer",
					width : "2vmin",
                    marginTop : ".4vmin",
                    visibility :  this.props.game.activeTurn && this.props.game.activeTurn.readys[this.props.player.userId]  ? "visible" : "hidden"
				},
			},) ,
            React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                }
            }, 
                this.props.player.userId == this.props.user.id? React.createElement("img", {
                    src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/user_w.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/user_b.svg",
                    style: {
                        width : "1.8vmin",
                        marginTop : ".4vmin",
                    },
                },) : null,
                this.props.player.userName,
            ),
        )
	}
}