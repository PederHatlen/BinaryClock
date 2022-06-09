let settingsEl = document.getElementById("settings");
let scEl = document.getElementById("settingsContent");
let toggleSettingsEl = document.getElementById("toggleSettings");
let modeSelectEl = document.getElementById("mode");
// let canvasEL = document.getElementById("canvas");
// let ctx = canvasEL.getContext("2d");

let hoursEl = document.getElementById("hours");
let secondsEl = document.getElementById("seconds");
let minutesEl = document.getElementById("minutes");

let columns = [hoursEl, minutesEl, secondsEl];

let vw;
let vh;
let mode;

let rCount;
let cCount;

let stopped = false;

function setup(){
	vw = window.innerWidth;
	vh = window.innerHeight;

	mode = modeSelectEl.value;
	rCount = (mode == 1? 6:4);
	cCount = mode;
	document.documentElement.style.setProperty('--row-count', rCount);
	document.documentElement.style.setProperty('--column-count', cCount);

	for (let i = 0; i < 3; i++){
		columns[i].innerHTML = "";
		for (let j = 0; j < rCount*cCount; j++){
			columns[i].innerHTML += "<img src=\"images/null.svg\" class=\"dot\">";
		}
	}

	render();
}
function render(){
	let rawtime = new Date();
	let t;
	switch (mode){
		case "1":
			t = [("000000"+rawtime.getHours().toString(2)).slice(-rCount), ("000000"+rawtime.getMinutes().toString(2)).slice(-rCount), ("000000"+rawtime.getSeconds().toString(2)).slice(-rCount)];
			break;
		case "2":
			let rawsec = [Math.floor(rawtime.getSeconds()/10), rawtime.getSeconds()%10];
			let rawmin = [("0"+rawtime.getMinutes()).slice(1), rawtime.getMinutes()%10];
			let rawhou = [("0"+rawtime.getHours()).slice(1), rawtime.getHours()%10];

			t = [("0000"+rawhou[0].toString(2)).slice(-rCount)+("0000"+rawhou[1].toString(2)).slice(-rCount), 
			("0000"+rawmin[0].toString(2)).slice(-rCount)+("0000"+rawmin[1].toString(2)).slice(-rCount), 
			("0000"+rawsec[0].toString(2)).slice(-rCount)+("0000"+rawsec[1].toString(2)).slice(-rCount)];
	}
	
	for (let i = 0; i < 3; i++){
		for (let j = t[i].length-1; j >= 0-(1-mode); j--){
			columns[i].childNodes[j].src = "images/"+(t[i][j] == "1"? "one":"zero")+".svg";
		}
	}
	if(!stopped){window.requestAnimationFrame(render);}
}

function togglesettings(){
	console.log("toggled");
	if (scEl.style.display == "none"){
		scEl.style.display = "";
		settingsEl.style.backgroundColor = "#ffffff44";}
	else{
		scEl.style.display = "none";
		settingsEl.style.backgroundColor = "";
	}
}

modeSelectEl.addEventListener("input", setup);
window.addEventListener("resize", setup);
window.addEventListener("click", (e)=>{if ((scEl.style.display == "" && !settingsEl.contains(e.target)) || toggleSettingsEl.contains(e.target)) togglesettings();});
setup();

// 23:59:59
// 10111, 111011, 111011
// [01, 1001], [101, 1001], [101, 1001]