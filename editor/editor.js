import {
	constructMessage,
	WS
} from "../index.js"
import {
	map
} from "./map.js"
export class editor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentWillUnmount() {

	}

	nodes = (string) => {
		return string.split(" ").map(node => {
			let cords = node.split(",")
			return {
				q : parseInt(cords[0]),
				r : parseInt(cords[1]),
				s : parseInt(cords[2]),
			}
		})
	}
		
	validBoard = (nodes) => {
		var visited = {
			"0,0,0" : true
		}
		function chain (q,r,s) {
			let neighbors =	[
				{q : q + 1, r : r - 1, s : s},
				{q : q + 1, r : r, s : s - 1},
				{q : q, r : r + 1, s : s - 1},
				{q : q - 1, r : r + 1, s : s},
				{q : q - 1, r : r, s : s + 1},
				{q : q, r : r - 1, s : s + 1},
			]
			for (let i = 0; i < neighbors.length; i++) {
				let neighbor = neighbors[i]
				let key = neighbor.q + "," + neighbor.r + "," + neighbor.s
				if (!visited[key] && nodes.find(node => node.q == neighbor.q && node.r == neighbor.r && node.s == neighbor.s)) {
					visited[key] = true
					chain(neighbor.q, neighbor.r, neighbor.s)
				}
			}
		}
		chain(0,0,0)
		return Object.keys(visited).length === nodes.length
	}

	sortedBoardString = (nodes) => {
		return nodes.sort((a,b) => {
			if(a.q == b.q) {
				if(a.r == b.r) {
					return a.s - b.s
				}
				return a.r - b.r
			}
			return a.q - b.q
		}).map(node => node.q + "," + node.r + "," + node.s).join(" ")
	}

	render() {
		return  React.createElement("div", {
			style: {
				display: "flex",
				alignItems : "center",
				justifyContent :"center",
				flexDirection : "column",
			}
		},

			React.createElement("div", {
				style : {
					display : "flex",
					flexDirection : "column",
					alignItems : "center",
					marginBottom : "-.5vmin"
				}
			},
				React.createElement("div", {}, this.props.editor.name),
				!this.validBoard(this.nodes(this.props.editor)) ? React.createElement("b", {},"invalid") : React.createElement("b", {}, "\u00A0"),
				React.createElement("button", {
					disabled : !this.validBoard(this.nodes(this.props.editor)),
					onClick : () => {
						WS.send(constructMessage("editor", [this.sortedBoardString(this.nodes(this.props.editor))]))
					}
				},"save"),
				React.createElement("b", {},this.sortedBoardString( this.nodes(this.props.boardString)) != this.sortedBoardString( this.nodes(this.props.editor)) ? "unsaved changes": "\u00A0")
			),
		
		
			React.createElement("div", {

				style: {
					display: "flex",
					alignItems : "center",
					justifyContent :"center",
				}
			},
				React.createElement("div", {
					style : {
						marginTop : "1vmin"
					}
				},
					React.createElement(map, {
						nodes : this.nodes(this.props.editor),
						options : this.props.options,
						nodeClickEvent : (nodes) => this.props.stateChange("editor", this.sortedBoardString(nodes)),
					}),
				)
			)
		)
	}
}
