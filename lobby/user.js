import {
    WS,
    constructMessage,
} from "../index.js"

export class user extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

    emitTimeout(msg) {
        clearTimeout(this.state.timeout)
        this.setState({
            timeout : setTimeout(() => {
                WS.send(msg)
            },333)
        })

    }

	render() {

		return React.createElement("div", {
            style : {
                display : "flex",
                flexDirection : "row",
                alignItems : "center",
                borderRadius : "1vmin",
                paddingLeft : ".7vmin",
                gap :".7vmin",
            }
        }, 
            this.props.lobbyUser.id == this.props.user.id? React.createElement("img", {
                src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/user_w.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/user_b.svg",
                style: {
                    width : "1.8vmin",
                    marginTop : ".4vmin",
                },
            },) : null,
            (this.props.lobby.leaderId == this.props.user.id && (this.props.lobbyMessages.length > 0 || this.props.lobby.members.length > 1))|| (this.props.lobby.leaderId != this.props.user.id && this.props.lobbyUser.id == this.props.user.id)? React.createElement("img", {
                src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/x_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/x_b.png",
                style: {
                    cursor : "pointer",
                    width : "1.8vmin",
                    marginTop : ".4vmin"
                },
                onClick : () => {
                    if(this.props.lobbyUser.id == this.props.user.id) {
                        if(confirm("Leave lobby?"))
                            WS.send(constructMessage("lobby_leave", []))
                    }
                    else if(confirm("Kick "+this.props.lobbyUser.name+"?"))
                        WS.send(constructMessage("lobby_kick", [this.props.lobbyUser.id]))                  
                },
            },) : null,
            this.props.lobby.leaderId == this.props.user.id && this.props.lobbyUser.id != this.props.user.id ? React.createElement("img", {
                src: this.props.options.uiTheme === "dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/promote_white.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/promote_black.svg",
                style: {
                    cursor : "pointer",
                    width : "2.2vmin",
                    marginTop : ".4vmin"
                },
                onClick : () => {
                    if(confirm("Promote "+this.props.lobbyUser.name+" to leader?"))
                        WS.send(constructMessage("lobby_promote", [this.props.lobbyUser.id]))
                }
            },) : null,
            this.props.lobby.leaderId == this.props.lobbyUser.id ? React.createElement("img", {
                src: this.props.options.uiTheme === "dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/crown_white.svg" : "https://nodge.s3.eu-central-1.amazonaws.com/crown_black.svg",
                style: {
                    width : "2.2vmin"
                },
            },) : null,
            React.createElement("select", {
                style : {
                    fontSize : "2vmin",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                },
                disabled : this.props.user.id != this.props.lobbyUser.id,
                value : this.props.lobbyUser.team,
                onChange : (e) => {
                    this.emitTimeout(constructMessage("team", [e.target.value]))
                }
            }, 
                React.createElement("option", {

                },0),
                React.createElement("option", {

                },1),
                React.createElement("option", {

                },2),
                React.createElement("option", {

                },3),
                React.createElement("option", {

                },4),
                React.createElement("option", {

                },5),
            ),
            React.createElement("b", {
                onClick :() => WS.send(constructMessage("profile", [this.props.lobbyUser.name])),
                style : {
                    cursor : "pointer",
                    fontSize : "2vmin",
                    paddingRight : ".5vmin",
                    whiteSpace: "nowrap",
                }
            }, this.props.lobbyUser.name),
        )
	}
} 
