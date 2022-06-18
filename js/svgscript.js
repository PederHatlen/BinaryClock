let settingsEl = document.getElementById("settings");
let scEl = document.getElementById("settingsContent");
let toggleSettingsEl = document.getElementById("toggleSettings");
let modeSelectEl = document.getElementById("mode");
let downloadbtnEl = document.getElementById("downloadbtn");
let manualTimeEl = document.getElementById("manualtime");
let doManualTimeEl = document.getElementById("domanualtime");


let smallClockEl = document.getElementById("smallClock");
let bigClockEl = document.getElementById("bigClock");

let bigColumns = Array.from(bigClockEl.children);
let smallColumns = Array.from(smallClockEl.children);
let columns;

let mode;

let stopped = false;
let rawtime;

function setup(){
    mode = modeSelectEl.value;
    switch (mode) {
        case "1":
            smallClockEl.style.display = "";
            bigClockEl.style.display = "none";

            columns = smallColumns;
            break;
        case "2":
            smallClockEl.style.display = "none";
            bigClockEl.style.display = "";

            columns = bigColumns;
            break;
    }

	render();
}
function render(){
    if (manualTimeEl.value != "") {rawtime = new Date(manualTimeEl.valueAsNumber-(36*10**5));}else{rawtime = new Date();}
	let binarytime;
	switch (mode){
		case "1":
			binarytime = [("00000"+rawtime.getHours().toString(2)).slice(-5), ("000000"+rawtime.getMinutes().toString(2)).slice(-6), ("000000"+rawtime.getSeconds().toString(2)).slice(-6)];
			break;
		case "2":
			let rawsec = [Math.floor(rawtime.getSeconds()/10), rawtime.getSeconds()%10];
			let rawmin = [Math.floor(rawtime.getMinutes()/10), rawtime.getMinutes()%10];
			let rawhou = [Math.floor(rawtime.getHours()/10), rawtime.getHours()%10];

			binarytime = [("000"+rawhou[0].toString(2)).slice(-3)+("0000"+rawhou[1].toString(2)).slice(-4), 
			("000"+rawmin[0].toString(2)).slice(-3)+("0000"+rawmin[1].toString(2)).slice(-4), 
			("000"+rawsec[0].toString(2)).slice(-3)+("0000"+rawsec[1].toString(2)).slice(-4)];
	}

	for (let i = 0; i < 3; i++){
		for (let j = 0; j < columns[i].childNodes.length; j++){
			// columns[i].childNodes[j].classList = (binarytime[i][j] == "1"? "one":"zero");
			columns[i].childNodes[j].style.fill = (binarytime[i][j] == "1"? "#fff":"#222");
		}
	}
	if(!stopped){window.requestAnimationFrame(render);}
}

function togglesettings(){
	console.log("toggled");
	if (scEl.style.display == "none"){
		scEl.style.display = "";
		settingsEl.style.backgroundColor = "#ffffff44";
    }else{
		scEl.style.display = "none";
		settingsEl.style.backgroundColor = "";
	}
}

// Modification of https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download() {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`<?xml version="1.0" encoding="utf-8"?>`+Array.from([smallClockEl.outerHTML, bigClockEl.outerHTML])[mode-1]));
	element.setAttribute('download', `binaryClock_${("00"+rawtime.getHours()).slice(-2)}-${("00"+rawtime.getMinutes()).slice(-2)}-${("00"+rawtime.getSeconds()).slice(-2)}.svg`);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
downloadbtnEl.addEventListener("click", download);

modeSelectEl.addEventListener("input", setup);
window.addEventListener("resize", setup);
window.addEventListener("click", (e)=>{if ((scEl.style.display == "" && !settingsEl.contains(e.target)) || toggleSettingsEl.contains(e.target)) togglesettings();});
setup();

// 23:59:59
// 10111, 111011, 111011
// [01, 1001], [101, 1001], [101, 1001]