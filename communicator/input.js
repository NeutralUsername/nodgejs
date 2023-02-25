import {
	WS,
    constructMessage
} from "../index.js"
export class input extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            input : ""
        }
	}

	componentWillUnmount() {

	}

    clickEvent = () => {
        if(this.props.options.comContent === "friends")
            WS.send(constructMessage("request_friend", [this.state.input]))
        if(this.props.options.comContent === "blocks")
            WS.send(constructMessage("block_user", [this.state.input]))
    }

    changeEvent = (val) => {
        this.setState({input : val})
    }

	render() {
		return React.createElement("div", {
            key : 1,
            style: {
                visibility :this.props.options.comContent === "friends" || this.props.options.comContent === "blocks" ? "visible" :  "hidden",
                display: "flex",
                outline: "solid " + (this.props.options.uiTheme === "light" ? "black" : "white") + " 1px",
                height : "5vmin",
                gap :".5vmin",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: ".4vmin", 
                backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
            }
        },
            React.createElement("input", {
                key : 0,
                type: "text",
                placeholder: "name",
                value : this.state.input,
                onFocus : (e) => this.props.stateChange("messageInputSelected", true),
                onBlur : (e) => this.props.stateChange("messageInputSelected", false),
                onKeyPress : (e) => {
                    if(e.key === "Enter")
                        this.clickEvent()
                },
                onChange : (e) => this.changeEvent(e.target.value),
                style: {
                    borderRadius  : ".4vmin",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2vmin",
                    width :"33vmin"
                }
            }, ),
            React.createElement("button", {
                onClick : (e) => this.clickEvent(),
                key : 1,
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2vmin",
                    width : "7vmin",
                    cursor: "pointer",
                }
            }, "add")
        )
	}
}