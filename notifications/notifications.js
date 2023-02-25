import {
    friendEntry
} from "./friendEntry.js"
import {
    lobbyEntry
} from "./lobbyEntry.js"
export class notifications extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {
        let requests = []
        for(let i= 0; i < this.props.incomingInvites.length; i++){
            let entry = this.props.incomingInvites[i]
            requests.push(React.createElement(lobbyEntry, {
                key : i,
                entry : entry,
                options : this.props.options,
                user: this.props.user,
                lobby : this.props.lobby,
                incomingInvites : this.props.incomingInvites,
                stateChange : this.props.stateChange,
                setOption : this.props.setOption,
            }))
        }
        for(let i= 0; i < this.props.friends.length; i++){
            let entry = this.props.friends[i]
            if(entry.acceptedAt == null)
                requests.push(React.createElement(friendEntry, {
                    key : i+this.props.incomingInvites.length,
                    entry : entry,
                    options : this.props.options,
                    user: this.props.user,
                    lobby : this.props.lobby,
                    friends : this.props.friends,
                    stateChange : this.props.stateChange,
                    setOption : this.props.setOption,
                }))
        }
        requests.sort((a,b) => {
            let aTime = a.props.entry.invitedAt ? a.props.entry.invitedAt : a.props.entry.requestedAt
            let bTime = b.props.entry.invitedAt ? b.props.entry.invitedAt : b.props.entry.requestedAt
            return new Date(bTime).valueOf() - new Date(aTime).valueOf()
        })
		return React.createElement("div", {
				style: {
					display: "flex",
                    flexDirection: "column",
				}
			},
			React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    height: "6vmin",
                    width : "35vmin",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3vmin",
                    outline : "solid  1px",
                    borderRadius: ".4vmin",
                    backgroundColor: this.props.options.uiTheme === "light" ? "gainsboro" : "#555555",
                    borderRadius : ".5vmin"
                }
            },
                "notifications"
            ),
            React.createElement("div", {
                style: {
                    overflow: "scroll",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    width : "35vmin",
                    height : "50vmin",
                    border : "1px solid  ",
                    borderRadius : ".5vmin",
                    backgroundColor : this.props.options.uiTheme === "light" ? "white" : "#2e3033",
         
                }
            }, 
                requests
            )
		)
	}
} 