import {
	tab
} from "./tab.js"
export class tabs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return React.createElement("div", {
            style : {
                display: "flex",
                flexDirection : "column",
                marginTop : "13vmin"
            }
        }, 
            React.createElement(tab, {
                name : "friends",
                options : this.props.options,
                img : this.props.options.uiTheme ==="dark" ? this.props.options.comContent == "friends" ? "https://nodge.s3.eu-central-1.amazonaws.com/sil_black.png" : "https://nodge.s3.eu-central-1.amazonaws.com/sil_white.png" : this.props.options.comContent == "friends" ? "https://nodge.s3.eu-central-1.amazonaws.com/sil_white.png" : "https://nodge.s3.eu-central-1.amazonaws.com/sil_black.png",
                setOption : this.props.setOption,
            }),
            React.createElement(tab, {
                name : "chats",
                options : this.props.options,
                img : this.props.options.uiTheme ==="dark" ? this.props.options.comContent == "chats" ? "https://nodge.s3.eu-central-1.amazonaws.com/chat_b.png" : "https://nodge.s3.eu-central-1.amazonaws.com/chat_w.png" : this.props.options.comContent == "chats" ? "https://nodge.s3.eu-central-1.amazonaws.com/chat_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/chat_b.png",
                setOption : this.props.setOption,
            }),
            React.createElement(tab, {
                name : "blocks",
                options : this.props.options,
                img : this.props.options.uiTheme === "dark" ? this.props.options.comContent == "blocks" ? "https://nodge.s3.eu-central-1.amazonaws.com/block_b.png" : "https://nodge.s3.eu-central-1.amazonaws.com/block_w.png" : this.props.options.comContent == "blocks" ? "https://nodge.s3.eu-central-1.amazonaws.com/block_w.png" : "https://nodge.s3.eu-central-1.amazonaws.com/block_b.png",
                setOption : this.props.setOption,
            }),
        )
	}
}