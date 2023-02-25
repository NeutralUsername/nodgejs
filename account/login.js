import {
	WS,
	constructMessage
} from "../index.js"
import {
	SHA256
} from "./SHA256.js"
import {
	inputWithLabel
} from "./inputWithLabel.js"

export class login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
		}
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	login_click = () => {
		if (this.username_check() && this.password_check())
			WS.send(constructMessage("login", [this.state.username, SHA256(this.state.password)]))
	}
	username_check = () => {
		return (this.state.username.length > 4 && this.state.username.length <= 20) && /^[A-Za-z0-9]*$/.test(this.state.username)
	}

	password_check = () => {
		return (this.state.password.length > 7 && this.state.password.length <= 30) && /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(this.state.password)
	}


	render() {
		return React.createElement("div", {
				onKeyDown: e => {
					if (e.key === "Enter")
						this.login_click()
				},
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
			}, "login"),
			React.createElement(inputWithLabel, {
				label : this.state.username.length === 0 || this.username_check() ? "" : "5-20 characters, a-z,0-9",
				changeEvent : (input) => this.setState({username: input}),
				value : this.state.username,
				placeholder : "username"
			}),


			React.createElement(inputWithLabel, {
				label :  this.state.password.length === 0 || this.password_check() ? "" : "8-30 characters, a-z, 0-9, " + '!@#$%^&*()_+\-=\[\]{};' + "'" + ':"\\|,.<>\/?]*$',
				changeEvent : (input) => this.setState({password: input}),
				value : this.state.password,
				placeholder : "password",
				password : true
			}),

			React.createElement("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginTop: "1.5vmin",
						flexDirection: "column"
					}
				},
				React.createElement("input", {
					disabled: (!this.username_check() || !this.password_check()),
					onClick: e => this.login_click(),
					onMouseDown: e => this.setState({
						status_message: ""
					}),
					style: {
						display: "flex",
						fontSize: "4vmin",
					},
					type: "button",
					value: "login",
				}, ),
				React.createElement("label", {
					style: {
						display: "flex",
						marginTop: ".6vmin",
					}
				}, this.state.status_message)
			)
		)
	}
}