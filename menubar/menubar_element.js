import {
	WS
} from "../index.js"
export class menubar_element extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

    contentButtonBackgroundColor  = (name) => {
		if(this.props.content === name) {
			if(this.props.options.uiTheme === "light") 
				return "#5d5d5d"
			else	
				return "lightGrey"
		}
		else {
			return ""
		}
	}

	contentButtonColor  = (name) => {
		if(!this.props.disabled) {
			if(this.props.content === name) {
				if(this.props.options.uiTheme === "light") 
					return "white"
				else	
					return "black"
			}
			else {
				if(this.props.options.uiTheme === "light") 
					return "black"
				else	
					return "white"
			}
		}
		else {
			if(this.props.options.uiTheme === "light") 
					return "lightGrey"
				else	
					return "grey"
		}
	}

	render() {
		return 	React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "center",
                marginLeft : "1vmin",
            }
        },
            React.createElement("a", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    fontSize : "1.7vmin",
                    textDecoration : "none",
                    paddingLeft : ".8vmin",
                    paddingRight : ".8vmin",
                    paddingTop : ".5vmin",
                    paddingBottom: ".5vmin",
                    borderRadius : ".5vmin",
                    backgroundColor : this.contentButtonBackgroundColor(this.props.name),
                    color: this.contentButtonColor(this.props.name)
                },
                href: "",
                onClick: e => {
                    e.preventDefault()
					if(!this.props.disabled)
                    	this.props.clickEvent()
                }
            }, React.createElement("b", {}, this.props.name)) ,
        )
	}
}