import {
	root,
} from "./root/root.js"
document.onselectstart = new Function("return false")
document.getElementById("root").style.width  = "max-content"
document.getElementById("root").style.height = "max-content"
export const WS = new WebSocket("wss://playnodge.com:443/ws")
export const MSG_DELIMITER = "<;>"
export const PLOPSOUND = new Audio('https://patienceonlinecards.s3.eu-central-1.amazonaws.com/mixkit-game-ball-tap-2073.wav')
export const COLORS = {
    0 : { //5 shades of red
        0 : ["#FF0000", "#ffffff"],
        1 : ["#db4f4f", "#000000"],
        2 : ["#d90237", "#000000"],
        3 : ["#b80226", "#ffffff"],
        4 : ["#850319", "#ffffff"],
    },
    1 : { //5 shades of blue
        0 : ["#446be3", "#000000"],
        1 : ["#2c54d1", "#000000"],
        2 : ["#1b40b5", "#ffffff"],
        3 : ["#0b298a", "#ffffff"],
        4 : ["#021963", "#ffffff"],
    },
    2 : { //5 shades of green
        0 : ["#00ff00", "#000000"],
        1 : ["#00d902", "#000000"],
        2 : ["#00b802", "#000000"],
        3 : ["#008502", "#000000"],
        4 : ["#005002", "#000000"],
    }, 
    3 : { //5 shades of purple
        0 : ["#a800ff", "#000000"],
        1 : ["#8a00d9", "#000000"],
        2 : ["#6b00b8", "#000000"],
        3 : ["#4c0085", "#000000"],
        4 : ["#2d0050", "#000000"],
    },
    4 : { //5 shades of turquoise
        0 : ["#00ffff", "#000000"],
        1 : ["#00d9d9", "#000000"],
        2 : ["#00b8b8", "#000000"],
        3 : ["#008585", "#000000"],
        4 : ["#005050", "#000000"],
    },
    5 : { //5 shades of olive
        0 : ["#b8b800", "#000000"],
        1 : ["#a8a800", "#000000"],
        2 : ["#989800", "#000000"],
        3 : ["#878700", "#000000"],
        4 : ["#767600", "#000000"],
    }
}

export function cookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

export function constructMessage(type, data) {
    return type + MSG_DELIMITER + data.join(MSG_DELIMITER)
}

export function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

ReactDOM.render(
    React.createElement(root, {
        options :  {
            hideCommunity: cookie("hideCommunity") && cookie("hideCommunity") == "false" ? false : true,
            hideNotifications: cookie("hideNotifications") && cookie("hideNotifications") == "false" ? false : true,
            comContent: cookie("comContent") ? cookie("comContent") : "friends",
            playMode: cookie("playMode") && cookie("playMode") == "custom" ? "custom" : "matchmaking",
            uiTheme: cookie("uiTheme") ? cookie("uiTheme") : "dark",
            showTutorial: cookie("showTutorial") && cookie("showTutorial") == "false" ? false : true,
        }
    }), document.getElementById('root')
)



/* 

export class comp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillUnmount() {

	}

	render() {

		return React.createElement("div", {

				style: {
					display: "flex",
				}
			},
			React.createElement("div", {

			}, )
		)
	}
} 

*/