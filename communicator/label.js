
export class label extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return	React.createElement("div", {
                    style: {
                        display: "flex",
                        flexDirection: "row",
                        height: "6vmin",
                        width : "43vmin",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3vmin",
                        outline : "solid  1px",
                        borderRadius: ".4vmin",
                        backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
                    }
                },
                    this.props.options.comContent 
        )
    }
}