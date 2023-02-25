import {
    WS,
    constructMessage,
} from "../index.js"

export class invite extends React.Component {
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
                alignItems : "center",
                borderRadius : "1vmin",
                paddingLeft : ".7vmin",
                gap :".7vmin",
            }
        }, 
             React.createElement("img", {
                src: this.props.options.uiTheme ==="dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/x_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/x_b.png",
                style: {
                    cursor : "pointer",
                    width : "1.8vmin",
                    marginTop : ".4vmin"
                },
                onClick : () => {
                    if(confirm("Cancel invite to "+this.props.invite.name+"?"))
                        WS.send(constructMessage("invite_cancel", [this.props.invite.id]))
                }
            },) ,
            React.createElement("img", {
                src: this.props.options.uiTheme === "dark" ? "https://nodge.s3.eu-central-1.amazonaws.com/hg_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/hg_w.png",
                style: {
                    width : "2vmin",
                    marginTop : ".4vmin"
                },
            },) ,
            React.createElement("b", {
                onClick :() => WS.send(constructMessage("profile", [this.props.invite.name])),
                style : {
                    cursor : "pointer",
                    fontSize : "2vmin",
                    paddingRight : ".5vmin",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }
            }, this.props.invite.name),
        )
	}
} 
