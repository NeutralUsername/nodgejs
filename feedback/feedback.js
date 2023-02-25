import {
	WS
} from "../index.js"
export class feedback extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text : "",
			status : "",
		}
	}

	componentDidMount() {
	}
	
	emitFeedback = () => {
		if( this.state.text.length < 1000 && this.state.text.length > 0) {
			WS.emit("feedback", this.state.text)
			this.setState({
				text : "",
				status : "sent"
			})
		}
	}

	render() {
		return React.createElement("div", {
				style: {
					gap : "1vmin",
					borderRadius: ".4vmin",
					border: "solid " + (this.props.options.uiTheme === "light" ? "black " : "white ") + "1px",
					alignItems: "center",
					display: "flex",
					padding: "1vmin",
					flexDirection: "column",
					backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
					marginTop : "5vmin"
				}
			},
			React.createElement("b", {
				style: {
					alignItems: "center",
					display: "flex",
					fontSize : "2vmin",
					flexDirection: "row",
					marginBottom: "1vmin",
				}
			}, "feedback"),
			React.createElement("div", {
				style: {
					display: "flex",
					flexDirection: "row",
					gap : "1vmin",
				}
			},
				React.createElement("div", {
					style : {
						display : "flex",
						flexDirection : "column",
						gap : "1vmin",
						alignItems : "center"
					}
				},
					React.createElement("textarea", {
						onChange : (e) => this.setState({text : e.target.value}),
						value : this.state.text,
						style : {
							display : "flex",
							alignItems : "start",
							justifyContent : "start",
							width : "30vmin",
							height : "20vmin"
						}
					}),
					React.createElement("div", {
						style : {
							gap : "1vmin",
							display : "flex",
							flexDirection : "row",
							position : "relative"
						}
					}, 
						React.createElement("button", {
							style : {
								width : "13vmin",
								height : "3vmin",
							},
							onClick : () =>  this.emitFeedback() 
						}, "submit\xa0feedback"),
						React.createElement("div", {
							style : {
								position : "absolute",
								left : "15vmin"
					
							}
						}, this.state.status)
					)
				),
			)
		)
	}
}



function getFormattedDate(date) {
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');

	return day + '/' + month + '/' + year;
}