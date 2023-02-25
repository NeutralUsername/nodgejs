import {
	WS
} from "../index.js"
export class map extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentWillUnmount() {

	}

	size = () => {
		return 19
	}

	render() {
		var row_components = []
		for(var i = -1*Math.floor(this.size()/2); i < Math.ceil(this.size()/2); i++){
			row_components.push(React.createElement(row, {
				key: i,
				row : i,
				size : this.size(),
				options : this.props.options,
				nodes : this.props.nodes,
				nodeClickEvent : this.props.nodeClickEvent,
			}))
		}
		return React.createElement("div", {

				style: {
					flexDirection : "column",
					display: "flex",
					gap : "0vmin"
				}
			},
			row_components
		)
	}
}
class row extends React.Component {
	constructor(props) {
		super(props)
	}

	getQRS = (row, col) => {
		if(row % 2) 
			var q = col - (row + (row&1)) / 2
		else 
			var q = col - (row - (row&1)) / 2
		var r = row
		var s = -q - r
		return {
			q : q,
			r : r,
			s : s
		}
	}


	getNeighbors = (q, r, s) => {
		return [
			{q : q+1, r : r-1, s : s},
			{q : q-1, r : r+1, s : s},
			{q : q+1, r : r, s : s-1},
			{q : q-1, r : r, s : s+1},
			{q : q, r : r+1, s : s-1},
			{q : q, r : r-1, s : s+1},
		]
	}
	render() {
		var node_components = []
		for(var col = -1*Math.floor(this.props.size/2); col < Math.ceil(this.props.size/2); col++){
			let cords = this.getQRS(this.props.row, col)
			node_components.push(React.createElement(node, {
				key: col,	
				options : this.props.options,
				q : cords.q,
				r : cords.r,
				s : cords.s,
				nodes : this.props.nodes,
				selected : this.props.nodes.find(node => cords.q == node.q && cords.r == node.r && cords.s == node.s),
				neighborSelected : this.props.nodes.find(node => this.getNeighbors(cords.q, cords.r, cords.s).find(neighbor => neighbor.q == node.q && neighbor.r == node.r && neighbor.s == node.s)),
				nodeClickEvent : this.props.nodeClickEvent,
			}))
		}
		return React.createElement("div", {
				style: {
					display: "flex",
					justifyContent: "center",
					marginRight : this.props.row % 2 ? "4.8vmin" : "",
					gap : ".5vmin"
				}
			},
			node_components
		)
	}
}

class node extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	leftClick = () => {
		if(this.props.q === 0 && this.props.r === 0 && this.props.s === 0) return
		if(! (this.props.selected || this.props.neighborSelected)) return
		if(this.props.selected)
			this.props.nodeClickEvent(this.props.nodes.filter(node => !(node.q == this.props.q && node.r == this.props.r && node.s == this.props.s)))
		else this.props.nodeClickEvent(this.props.nodes.concat([{q : this.props.q, r : this.props.r, s : this.props.s}]))
	}

	borderCSS = () => {
		if(this.props.options.uiTheme == "dark") {
			if(!this.props.selected && this.props.neighborSelected) 
				return "solid white .1vmin"
			else return "solid #222426 .1vmin"
		}
		else {
			if(!this.props.selected && this.props.neighborSelected) 
				return "solid #222426 .1vmin"
			else return "solid white .1vmin"
		}
	}

	backgroundColorCSS = () => {
		if(this.props.q === 0 && this.props.r === 0 && this.props.s === 0) return "grey"
		if(this.props.options.uiTheme == "dark") {
			if(this.props.selected) 
				return "white"
			else return "#222426"
		}
		else {
			if(this.props.selected) 
				return "#222426"
			else return "white"
		}
	}

	cursorCSS = () => {
		if(!(this.props.q === 0 && this.props.r === 0 && this.props.s === 0) && (this.props.selected || this.props.neighborSelected)) return "pointer"
		else return "default"
	}

	render() {
		return   React.createElement("div", {
			onClick : () => this.leftClick(),
			style : {
				border : this.borderCSS(),
				width : "4.3vmin",
				height : "4.3vmin",
				backgroundColor : this.backgroundColorCSS(),
				borderRadius : "10vmin",
				cursor : this.cursorCSS(),
			}
		})
	}
}