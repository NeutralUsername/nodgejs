import {
    constructMessage,
    WS
}   from '../index.js'
export class placement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return React.createElement("div", {
                onClick : () => {
                    WS.send(constructMessage("profile", [this.props.placement.name]))
                },
				style: {
                    display: "flex",
                    flexDirection: "row",
                    gap: "1vmin",
                    alignItems : "center",
                    justifyContent : "space-between",
                    height : "4vmin",
                    width : "58vmin",
                    fontSize : "2vmin",
                    cursor : "pointer",
                    backgroundColor : this.props.options.uiTheme == "dark" ? "#313538" : "#e6e6e6",
                    borderRadius : ".5vmin",
                    paddingLeft : "1vmin",
                    paddingRight : "1vmin",
                    margin : "0.25vmin",
				}
			},
            React.createElement("b", {
                style : {
                    display : "flex",
                    marginRight : "3vmin",
                    fontSize : "2.5vmin",
                }
			}, 
                this.props.position+".",
            ),
			React.createElement("b", {
                style : {
                    display : "flex",
                    marginRight : "3vmin"
                }
			}, 
                this.props.placement.name,
            ),
            React.createElement("b", {
                style : {
                    display : "flex",
                }
			}, 
                this.props.placement.rating.toFixed(0)
            ),
		)
	}
}