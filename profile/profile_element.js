import {
	WS
} from "../index.js"
export class profile_element extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return 	React.createElement("div", {
            style : {
                display :"flex"
            }
        }, 
            React.createElement("div", {
                style : {
                    width : "15vmin"
                }
            },
                this.props.subject
            ),
            React.createElement("b", {

            }, 
                this.props.value
            )
        )
	}
}