import {
	placement
} from "./placement.js"
export class leaderboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {
		let placements = []
		this.props.leaderboard.forEach((p, i )=> {
			placements.push(
				React.createElement(placement, {
					key : i,
					position : i+1,
					placement : p,
					stateChange : this.props.stateChange,
					options : this.props.options,
				})
			)
		})
		return React.createElement("div", {

				style: {
					display: "flex",
					marginTop: "5vmin",
				}
			},
			React.createElement("div", {
					style: {
						display: "flex",
						flexDirection: "column",
					}
			}, 
				placements
			),
		)
	}
}