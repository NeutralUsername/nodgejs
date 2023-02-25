
export class tab extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return React.createElement("button", {
			onClick: () => {
				this.props.setOption("comContent", this.props.name)
			},
			style: {
				padding :"2vmin",
				backgroundColor : this.props.options.uiTheme =="dark" ? this.props.options.comContent === this.props.name ? "lightGrey" : "#555555" : this.props.options.comContent === this.props.name ? "#5d5d5d" : "gainsboro",
				display: "flex",
				border : "solid 1px 	#282828",
				cursor: "pointer",
				width: "4vmin",
				height: "4vmin",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				marginBottom : "2vmin",
				marginRight :".2vmin"
			}
		},
			React.createElement("div", {
				style: {
					display: "flex",
					fontSize: "3vmin",
					alignItems: "center",
					justifyContent: "center",
				}
			},
				this.props.img ? React.createElement("img", {
					src: this.props.img,
					style: {
						width : "3vmin"
					}
				},) : this.props.emoji,
			),
		)
	}
}