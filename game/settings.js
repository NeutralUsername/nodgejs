import {
	WS
} from "../index.js"
export class settings extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {
		return React.createElement("div", {
				style: {
					fontSize : "2vmin",
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					borderRadius: ".4vmin",
					border: "solid " + (this.props.options.uiTheme  === "light" ? "black " : "white ") + "1px",
					padding: "1.5vmin",
					gap: "1vmin",
					backgroundColor: this.props.options.uiTheme  === "light" ? "gainsboro" : "#555555",
					width : "max-content"
				}
			},
			React.createElement("b", {
				style: {
					alignItems: "center",
					display: "flex",
					marginBottom: "1vmin"
				}
			}, "settings"),
			React.createElement("input", {
				style: {
					display: "flex",
					width : "20vmin"
				},
				type: "range",
				min: 10,
				max: 150,
				value: Math.round((this.props.options.nodeScale * 100)),
				className: "slider2",
				id: "myRange2",
				onChange: (e) => {
					this.props.setOption("nodeScale", parseInt(e.target.value) / 100)
				}
			}),
			React.createElement("div", {
					style: {
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						borderRadius: ".4vmin",
						border: "solid " + (this.props.options.uiTheme  === "light"? "black " : "white ") + "1px",
						padding: "1.5vmin",
						gap: "1vmin",
						backgroundColor: this.props.options.uiTheme  === "light"? "gainsboro" : "#555555",
						width : "max-content"
					}
				},

				React.createElement("div", {
						style: {
							display: "flex",
							flexDirection: "row",
						}
					},
					React.createElement("div", {}, "muted"),
					React.createElement("input", {
						style : {
							width : "1.7vmin",
							height : "1.7vmin"
						},
						type: "checkbox",
						checked: this.props.options.muted,
						onChange: () => {
							this.props.setOption("muted", !this.props.options.muted)

						}
					}, ),
				),

				React.createElement("div", {
						style: {
							display: "flex",
							flexDirection: "row",
						}
					},
					React.createElement("div", {}, "disable animation"),
					React.createElement("input", {
						style : {
							width : "1.7vmin",
							height : "1.7vmin"
						},
						type: "checkbox",
						checked: this.props.options.disableAnimation,
						onChange: () => {
							this.props.setOption("disableAnimation", !this.props.options.disableAnimation)
						}
					}, ),
				),

			),
			React.createElement("div", {
					style: {
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						borderRadius: ".4vmin",
						border: "solid " + (this.props.options.uiTheme  === "light" ? "black " : "white ") + "1px",
						padding: "1.5vmin",
						gap: "1vmin",
						backgroundColor: this.props.options.uiTheme  === "light" ? "gainsboro" : "#555555",
						width : "max-content"
					}
				},

				React.createElement("div", {
					style: {
						display: "flex",
						flexDirection: "row",
					}
				},
					React.createElement("div", {}, "hide turn end"),
					React.createElement("input", {
						style : {
							width : "1.7vmin",
							height : "1.7vmin"
						},
						type: "checkbox",
						checked: this.props.options.hideGameTimer,
						onChange: () => {
							this.props.setOption("hideGameTimer", !this.props.options.hideGameTimer)
						}
					},),
				),	

				React.createElement("div", {
					style: {
						display: "flex",
						flexDirection: "row",
					}
				},
					React.createElement("div", {}, "hide supply"),
					React.createElement("input", {
						style : {
							width : "1.7vmin",
							height : "1.7vmin"
						},
						type: "checkbox",
						checked: this.props.options.hideGameSupply,
						onChange: () => {
							this.props.setOption("hideGameSupply", !this.props.options.hideGameSupply)
						}
					},),
				),	

				React.createElement("div", {
					style: {
						display: "flex",
						flexDirection: "row",
					}
				},
					React.createElement("div", {}, "hide replay"),
					React.createElement("input", {
						style : {
							width : "1.7vmin",
							height : "1.7vmin"
						},
						type: "checkbox",
						checked: this.props.options.hideGameReplay,
						onChange: () => {
							this.props.setOption("hideGameReplay", !this.props.options.hideGameReplay)
						}
					},),
				),	

				React.createElement("div", {
						style: {
							display: "flex",
							flexDirection: "row",
						}
					},
					React.createElement("div", {}, "hide messages"),
					React.createElement("input", {
						style : {
							width : "1.7vmin",
							height : "1.7vmin"
						},
						type: "checkbox",
						checked: this.props.options.hideGameChat,
						onChange: () => {
							this.props.setOption("hideGameChat", !this.props.options.hideGameChat)
						}
					}, ),
				),

				React.createElement("div", {
						style: {
							display: "flex",
							flexDirection: "row",
						}
					},
					React.createElement("div", {}, "hide leaderboard"),
					React.createElement("input", {
						style : {
							width : "1.7vmin",
							height : "1.7vmin"
						},
						type: "checkbox",
						checked: this.props.options.hideGameStandings,
						onChange: () => {
							this.props.setOption("hideGameStandings", !this.props.options.hideGameStandings)
						}
					}, ),
				),
			)
		)
	}
}