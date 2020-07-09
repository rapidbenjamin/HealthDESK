var video = document.querySelector("#videoElement");
var faceTouch = true;
var slouch = true;
var getUp = true;
var close = true;
var water = true;

var numFaceTouches;
var numSlouch;
var numClose;
var timeSinceStart;
var timeSinceDrink;
var timeSinceUp;

var timer;

function start() {
    var stopBtn = document.getElementById("stop");
    stopBtn.hidden = false;
    var startBtn = document.getElementById("start");
    startBtn.hidden = true;

    var toggleSection = document.getElementById("togglesection");
    toggleSection.hidden = false;
    var cameraSection = document.getElementById("camerasection");
    cameraSection.hidden = false;
    var statsSection = document.getElementById("statssection");
    statsSection.hidden = false;

    numFaceTouches = 0;
    numSlouch = 0;
    numClose = 0
    timeSinceStart = 0;
    timeSinceDrink = 0;
    timeSinceUp = 0;

    timer = setInterval(increaseTime, 1000);

    updateStats();
    startVideo();
}

function stop(){
    var stopBtn = document.getElementById("stop");
    stopBtn.hidden = true;
    var startBtn = document.getElementById("start");
    startBtn.hidden = false;

    var toggleSection = document.getElementById("togglesection");
    toggleSection.hidden = true;
    var cameraSection = document.getElementById("camerasection");
    cameraSection.hidden = true;
    var statsSection = document.getElementById("statssection");
    statsSection.hidden = true;

    clearInterval(timer);

    stopVideo();
}

function startVideo() {

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
}

function stopVideo(e) {
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }

    video.srcObject = null;
}

function toggleFaceTouch(){
    faceTouch = !faceTouch
}
function toggleSlouch() {
    slouch = !slouch
}
function toggleGetUp() {
    getUp = !getUp
}
function toggleClose() {
    close = !close
}
function toggleWater() {
    water = !water
}

function increaseTime(){
    timeSinceUp += 1;
    timeSinceDrink += 1;
    timeSinceStart += 1

    updateStats();
    checkSendTimeBasedNotifications();
}

function updateStats(){
    var faceTouchText = document.getElementById("faceTouchStat");
    faceTouchText.innerHTML = "Touched Your Face: " + numFaceTouches;
    var slouchText = document.getElementById("slouchStat");
    slouchText.innerHTML = "Slouched: " + numSlouch;
    var getUpText = document.getElementById("getUpStat");
    getUpText.innerHTML = "Since You Got Up: " + timeSinceUp;
    var closeText = document.getElementById("closeStat");
    closeText.innerHTML = "Got Close to the Screen: " + numClose;
    var waterText = document.getElementById("waterStat");
    waterText.innerHTML = "Since you drank water: " + timeSinceDrink;
    var startText = document.getElementById("startStat");
    startText.innerHTML = "Since start: " + timeSinceStart;
}

function checkSendTimeBasedNotifications(){
    if (timeSinceUp >= 900 && timeSinceUp%300 === 0){
        timeSinceUp = 0;
    //    send push notification telling user to get up
    }
    if (timeSinceDrink >= 600 && timeSinceDrink%300 === 0){
        timeSinceDrink = 0;
    //    send push notification telling user to drink water
    }
}

function resetUpTimer() {
    timeSinceUp = 0;
}
function resetDrinkTimer() {
    timeSinceDrink = 0;
}
function resetStartTimer() {
    timeSinceStart = 0;
}
