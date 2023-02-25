import {
    friend
} from "./friend.js"
import {
    block
} from "./block.js"
import {
    chatter
} from "./chatter.js"

export class entries extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

    contentHeight = () => {
        let comContent = this.props.options.comContent
        if(comContent == "friends"  || comContent === "blocks")
            return "80vmin"
        else if(comContent == "chats")
            return "45vmin"
        else return "85vmin"
    }

	render() {
        let entries = []
        if(this.props.options.comContent === "chats") {
            this.props.friends.forEach((f, ei) => {
                if(f.acceptedAt != null && (this.props.privateMessages.filter(PM => PM.senderId == f.friend.id || PM.targetId == f.friend.id).length > 0 || this.props.selectedChat === f.friend.id)) {
                    entries.push(React.createElement(chatter, {
                        key : ei,
                        friendData : f,
                        user : this.props.user,
                        messages : this.props.privateMessages,
                        friends : this.props.friends,
                        blocks : this.props.blocks,
                        options : this.props.options,
                        stateChange : this.props.stateChange,
                        setOption : this.props.setOption,
                        selectedChat : this.props.selectedChat,
                    }))
                }
            })
        }
        if(this.props.options.comContent == "friends") {
            this.props.friends.forEach((f, ei) => {
                if(f.acceptedAt == null && f.requesterId != this.props.user.id)
                    return
                entries.push(React.createElement(friend, {
                    key : ei,
                    friendData : f,
                    user : this.props.user,
                    messages : this.props.privateMessages,
                    friends : this.props.friends,
                    blocks : this.props.blocks,
                    options : this.props.options,
                    stateChange : this.props.stateChange,
                    setOption : this.props.setOption,
                }))
            })
        }

        if(this.props.options.comContent === "blocks")
            this.props.blocks.forEach((b, ei) => {
                entries.push(React.createElement(block, {
                    key : ei,
                    blockData : b,
                    user : this.props.user,
                    messages : this.props.privateMessages,
					friends : this.props.friends,
					blocks : this.props.blocks,
                    options : this.props.options,
                }))
            })
		return React.createElement("div", {
            key : 0,
            style  : {
                display : "flex",
                height : this.contentHeight(),
                alignItems : "flex-start",
                flexDirection : "column",
                outline : "solid 1px",
                overflow: "scroll",
            
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                backgroundColor : this.props.options.uiTheme === "light" ? "white" : "#2e3033",
                borderRadius: ".4vmin",
            }
        },
            entries
        )
	}
}