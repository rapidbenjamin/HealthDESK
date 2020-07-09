//ml code --------------------------------------------------------

const modelParams = {
    flipHorizontal: false,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

var handModel;

var faceNotDetected = 0;

let faceCascade = new cv.CascadeClassifier();  // initialize classifier

let utils = new Utils('errorMessage'); //use utils class

let faceCascadeFile = 'haarcascade_frontalface_default.xml'; // path to xml

let detectionInterval = 500

var loaded1 = false;
var loaded2 = false;
var loaded3 = false;

// use createFileFromUrl to "pre-build" the xml
utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
    faceCascade.load(faceCascadeFile); // in the callback, load the cascade from file
    console.log("loaded cascade")
    loaded1 = true
});

var net;

async function loadPoseNet() {
   net = await posenet.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: { width: 640, height: 480 },
    multiplier: 0.75
  }).then(net => {
    loaded3 = true;
    console.log("loaded posenet")
    return net;
  });
}

function loadHandTrack() {
  // Load the model.
  // load pre-trained classifiers
  handTrack.load(modelParams).then(model => {
    // detect objects in the image.
    console.log("loaded handtrack")
    handModel = model
    loaded2 = true
    start()
  });
}



function loadModels() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS) { //ios device
      alert("iOS device, cant't use")
  } else { //not an ios device
    loadHandTrack()
  }
  loadPoseNet();
  var startBtn = document.getElementById("start");
  startBtn.innerHTML = "Loading Models🧠";

}

function startVideo() {

  if(loaded1 == false || loaded2 == false || loaded3 === false) {
    playing = false
    return;
  }

  playing = true;

  const video = document.getElementById('video')

  video.style.visibility = "visible";
  video.style.display = "inline";

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}}).then(function (stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
        console.log("playing video")
    });
  } else {
    alert("couldn't start camera, please reload");
  }

  video.addEventListener('playing', () => {
    timer = setTimeout(detect, detectionInterval);
  })

    // List cameras and microphones.

//   navigator.mediaDevices.enumerateDevices()
//   .then(function(devices) {
//     devices.forEach(function(device) {
//     alert(device.kind + ": " + device.label +
//                 " id = " + device.deviceId);
//   });
// })
// .catch(function(err) {
//   alert(err.name + ": " + err.message);
// });
}

var playing = false;

function pauseVideo() {
  playing = !playing;
  const video = document.getElementById('video')

  console.log(playing)

  if(playing) {

    console.log("playing")
    var pauseBtn = document.getElementById("pause");
    pauseBtn.style.backgroundColor = "#FFFFFF";
    pauseBtn.style.color = "#000000";

    timer = setTimeout(detect, detectionInterval);
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
          console.log("playing video")
      });
    }
  } else {
    console.log("paused")
    var pauseBtn = document.getElementById("pause");
    pauseBtn.style.backgroundColor = "#000000";
    pauseBtn.style.color = "#FFFFFF";

    video.pause()
    video.currentTime = 0;
    video.srcObject.getTracks()[0].stop();
    clearTimeout(timer);
    // document.getElementById("pause").value = "Play Video";
  }

}

var timer;


var last = false

var times = 0;

var drinkingWater = 0;
var slouching = 0;


function calculateAngle(points) {

  var a = points[0];
  a.x = 500 - a.x;
  a.y = 300 - a.y;
  var b = points[1];
  b.x = 500 - b.x;
  b.y = 300 - b.y;
  var c = points[2];
  c.x = 500 - c.x;
  c.y = 300 - c.y;

  var a_vector = {x: a.x - b.x, y: a.y - b.y};
  var b_vector = {x: c.x - b.x, y: c.y - b.y};

  var dotProduct = a_vector.x * b_vector.x + a_vector.y * b_vector.y;
  var a_mag = Math.sqrt(Math.pow(a_vector.x, 2) + Math.pow(a_vector.y, 2));
  var b_mag = Math.sqrt(Math.pow(b_vector.x, 2) + Math.pow(b_vector.y, 2));

  var angle = Math.acos(dotProduct / (a_mag * b_mag));

  return angle * (180 / Math.PI);

}

function calculateBelow(points) {
  var a = points[0];
  a.x = 500 - a.x;
  a.y = 300 - a.y;
  var b = points[1];
  b.x = 500 - b.x;
  b.y = 300 - b.y;
  var c = points[2];
  c.x = 500 - c.x;
  c.y = 300 - c.y;

  return c.y > b.y;
}

function detectSlouching(leftShoulder, rightShoulder, nose) {
  leftShoulder.x = 500 - leftShoulder.x;
  leftShoulder.y = 300 - leftShoulder.y;
  rightShoulder.x = 500 - rightShoulder.x;
  rightShoulder.y = 300 - rightShoulder.y;
  nose.x = 500 - nose.x;
  nose.y = 300 - nose.y;

  midpoint = {x: (leftShoulder.x + rightShoulder.x) / 2, y: (leftShoulder.y + rightShoulder.y) / 2};

  var distance = Math.sqrt(Math.pow(midpoint.x - nose.x, 2) + Math.pow(midpoint.y - nose.y, 2));
  // console.log("distance: " + distance);
  return distance <= 100;

}




function detect() {


  if (!playing) {
    return;
  }

    var video = document.getElementById('video');
    handModel.detect(video).then(predictions => {
        var hands = []
        for(var i = 0; i < predictions.length; i++) {
          hands.push(predictions[i].bbox)
        }
        var face = detectFace()

        var intersecting = false

        if(face.length != 0) {
          for(var i = 0; i < hands.length; i++) {
            var faceArea = (face[2] * face[3])
            var handArea = (hands[i][2] * hands[i][3])
            var dif = handArea - faceArea;
            var newIntersect = rectanglesIntersect(face[0], face[1], face[2], face[3], hands[i][0], hands[i][1], hands[i][2], hands[i][3])
            intersecting = intersecting || (newIntersect && (dif <= 60000));
          }
          faceNotDetected = 0;
        } else {
          faceNotDetected += 1;
        }


        //DETECT IF YOU GOT UP
        if (faceNotDetected === 8 && drinkingWater === 0) {
          if(getUp) {
            timeSinceUp = 0;
          }
        }

        //DETECT IF YOU ARE TOO CLOSE
        area = face[2] * face[3];
        // console.log("area: " + area);
        if (area > 40000) {
          if(close) {
            numClose += 1;
            console.log("too close to the screen")
          }
        }

        var imageElement = document.getElementById('video');

        net.estimateSinglePose(imageElement, {
          flipHorizontal: true
        }).then(pose => {

          var keypoints = pose.keypoints;
          var leftArm = [keypoints[5].position, keypoints[7].position, keypoints[9].position] //shoulder, elbow, wrist
          var rightArm = [keypoints[6].position, keypoints[8].position, keypoints[10].position]

          // console.log(leftArm[2].y)
          // console.log(face[1])

          // console.log(leftArm);

          var leftShoulder = keypoints[5].position;
          var rightShoulder = keypoints[6].position;
          var nose = keypoints[0].position;

          //console.log(rightArm[2].y);
          //console.log(leftArm[2].y);

          //DETECT LAST TIME DRANK WATER
          if(rightArm[2].y <= 290 && calculateBelow(rightArm) && calculateAngle(rightArm) <= 18) {
            //make sure that elbow is below arms
            drinkingWater += 1;
          } else if (leftArm[2].y <= 290 && calculateBelow(leftArm) && calculateAngle(leftArm) <= 18) {
            drinkingWater += 1;
          } else {
            drinkingWater = 0;
          }

          if(drinkingWater >= 2) {

            if(water) {
              timeSinceDrink = 0;
              console.log("drinking Water")
            }
          }

          //DETECT SLOUCHING
          if(detectSlouching(leftShoulder, rightShoulder, nose)) {
            slouching += 1;
          } else {
            slouching = 0;
          }

          if (slouching >= 3) {

            if(slouch) {
              numSlouch += 1;
              console.log("stop slouching");
            }
          }

        })


        //DETECT TOUCH FACE
        //send notification for not touching face
        if(last == false && intersecting == true) {

          if(faceTouch) {
            numFaceTouches += 1;
            console.log("touched face")
            run("/faceAlert")
          }
        }
        last = intersecting

        // drawBoundaries();

        timer = setTimeout(detect, detectionInterval);

    });
}

function drawBoundaries() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.strokeStyle = "#0000ff";

  for(var i = 0; i < hands.length; i++) {
    ctx.beginPath();
    ctx.rect(hands[i][0], hands[i][1], hands[i][2], hands[i][3]);
    ctx.stroke();
  }

  ctx.strokeStyle = "#00ff00";
  ctx.beginPath();
  ctx.rect(face[0], face[1], face[2], face[3]);
  ctx.stroke();
}

function rectanglesIntersect(x1,  y1,  w1,  h1, x2,  y2,  w2,  h2) {

  var b1 = x1 < x2 + w2
  var b2 = x1 + w1 > x2
  var b3 = y1 < y2 + h2
  var b4 = y1 + h1 > y2

  return b1 && b2 && b3 && b4

}

function detectFace() {
  var ctx = document.getElementById("canvas").getContext('2d');
  var video = document.getElementById('video');
  ctx.drawImage(video, 0, 0, 800, 400);
  let src = cv.imread('canvas');
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
  let faces = new cv.RectVector();
  // detect faces
  faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0);

  let largest = 0
  let chosen = []

  for (let i = 0; i < faces.size(); ++i) {
    let x = faces.get(i).x
    let y = faces.get(i).y
    let w = faces.get(i).width
    let h = faces.get(i).height
    if (w > largest) {
      chosen = [x, y, w, h];
      largest = w
    }
  }

  return chosen
}

//code for sending a push notification



function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}








//rest of the code -----------------------------------------------------------------------
var video = document.querySelector("#video");
var faceTouch = false;
var slouch = false;
var getUp = false;
var close = false;
var water = false;

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
    var pauseBtn = document.getElementById("pause");
    pauseBtn.hidden = false;
    var resetBtn = document.getElementById("reset");
    resetBtn.hidden = false;
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

var stopped = false;

function stop(){

    stopped = !stopped;

    if(stopped) {
      playing = false;
      video.pause()
      video.currentTime = 0;
      video.srcObject.getTracks()[0].stop();
      clearTimeout(timer);

      var pauseBtn = document.getElementById("pause");
      pauseBtn.hidden = true;
      pauseBtn.style.backgroundColor = "#FFFFFF";
      pauseBtn.style.color = "#000000";

      var resetBtn = document.getElementById("reset");
      resetBtn.hidden = true;

      var stopBtn = document.getElementById("stop");
      stopBtn.innerHTML = "Start✅";

      var toggleSection = document.getElementById("togglesection");
      toggleSection.hidden = true;
      var cameraSection = document.getElementById("camerasection");
      cameraSection.hidden = true;
      var statsSection = document.getElementById("statssection");
      statsSection.hidden = true;

      clearInterval(timer);

    } else {
      playing = true;
      var pauseBtn = document.getElementById("pause");
      pauseBtn.hidden = false;
      pauseBtn.style.backgroundColor = "#FFFFFF";
      pauseBtn.style.color = "#000000";

      var resetBtn = document.getElementById("reset");
      resetBtn.hidden = false;

      var stopBtn = document.getElementById("stop");
      stopBtn.innerHTML = "Stop🛑";

      resetAll();

      var toggleSection = document.getElementById("togglesection");
      toggleSection.hidden = false;
      var cameraSection = document.getElementById("camerasection");
      cameraSection.hidden = false;
      var statsSection = document.getElementById("statssection");
      statsSection.hidden = false;

      timer = setTimeout(detect, detectionInterval);
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
            console.log("playing video")
        });
      }

    }





}

// function startVideo() {
//
//     if (navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then(function (stream) {
//                 video.srcObject = stream;
//             })
//             .catch(function (err0r) {
//                 console.log("Something went wrong!");
//             });
//     }
// }
//
// function stopVideo(e) {
//     var stream = video.srcObject;
//     var tracks = stream.getTracks();
//
//     for (var i = 0; i < tracks.length; i++) {
//         var track = tracks[i];
//         track.stop();
//     }
//
//     video.srcObject = null;
// }

function toggleFaceTouch(){
    faceTouch = !faceTouch;
    if(faceTouch) {
      var name = document.getElementById("facetouch");
      name.style.backgroundColor = "#000000";
      name.style.color = "#FFFFFF";
    } else {
      var name = document.getElementById("facetouch");
      name.style.backgroundColor = "#FFFFFF";
      name.style.color = "#000000";
    }
}
function toggleSlouch() {
    slouch = !slouch
    if(slouch) {
      var name = document.getElementById("slouch");
      name.style.backgroundColor = "#000000";
      name.style.color = "#FFFFFF";
    } else {
      var name = document.getElementById("slouch");
      name.style.backgroundColor = "#FFFFFF";
      name.style.color = "#000000";
    }
}
function toggleGetUp() {
    getUp = !getUp
    if(getUp) {
      var name = document.getElementById("getup");
      name.style.backgroundColor = "#000000";
      name.style.color = "#FFFFFF";
    } else {
      var name = document.getElementById("getup");
      name.style.backgroundColor = "#FFFFFF";
      name.style.color = "#000000";
    }
}
function toggleClose() {
    close = !close
    if(close) {
      var name = document.getElementById("close");
      name.style.backgroundColor = "#000000";
      name.style.color = "#FFFFFF";
    } else {
      var name = document.getElementById("close");
      name.style.backgroundColor = "#FFFFFF";
      name.style.color = "#000000";
    }
}
function toggleWater() {
    water = !water
    if(water) {
      var name = document.getElementById("water");
      name.style.backgroundColor = "#000000";
      name.style.color = "#FFFFFF";
    } else {
      var name = document.getElementById("water");
      name.style.backgroundColor = "#FFFFFF";
      name.style.color = "#000000";
    }
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
  faceTouchText.innerHTML = "Touched Your Face😀: " + numFaceTouches + " times";
  var slouchText = document.getElementById("slouchStat");
  slouchText.innerHTML = "Bad Posture🪑: " + numSlouch + " times";
  var getUpText = document.getElementById("getUpStat");
  getUpText.innerHTML = "Since Last You Got Up🧍: " + Math.floor(timeSinceUp / 60) + " minutes";
  var closeText = document.getElementById("closeStat");
  closeText.innerHTML = "Got Close to the Screen👀: " + numClose + " times";
  var waterText = document.getElementById("waterStat");
  waterText.innerHTML = "Since You Last Drank Water🥤: " + Math.floor(timeSinceDrink / 60) + " minutes";
  var startText = document.getElementById("startStat");
  startText.innerHTML = "Since Start🕒: " + Math.floor(timeSinceStart / 60) + " minutes";
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

function resetAll() {
  numFaceTouches = 0;
  numSlouch = 0;
  numClose = 0
  timeSinceStart = 0;
  timeSinceDrink = 0;
  timeSinceUp = 0;

  faceTouch = false;
  slouch = false;
  getUp = false;
  close = false;
  water = false;
  updateStats();
}

var mode = 0;

function changeMode() {
  mode += 1;
  if (mode % 2 == 0) {
    darkMode();
  } else {
    lightMode();
  }
}

function lightMode(){
    var modeBtn = document.getElementById("modeBtn");
    modeBtn.innerHTML = 'Light☀️';

    var body = document.getElementById("body");
    body.style.background = "#222222"
    var name = document.getElementById("nameheader");
    name.style.color = "#FFFFFF"
    var about = document.getElementById("about");
    about.style.color = "#FFFFFF"
    var footer = document.getElementById("footer");
    footer.style.color = "#FFFFFF"
    var webcam = document.getElementById("video");
    webcam.style.borderColor = "#FFFFFF"

}

function darkMode() {
    var modeBtn = document.getElementById("modeBtn");
    modeBtn.innerHTML = 'Dark🌑';

    var body = document.getElementById("body");
    body.style.background = "#FFFFFF"
    var name = document.getElementById("nameheader");
    name.style.color = "#222222"
    var about = document.getElementById("about");
    about.style.color = "#222222"
    var footer = document.getElementById("footer");
    footer.style.color = "#222222"
    var webcam = document.getElementById("video");
    webcam.style.borderColor = "#222222"
}


//code for sending a push notification

// Hard-coded, replace with your public key
const publicVapidKey = 'BDm5c3wc5O_dCtsQJg2qzZ8FNXYNHQrvUwO_dabEMYOlt_X_bOOX8ejxY0hczQ-bL4MaWW4CNQ0-a6Su2VOMrdk';

var registration;

async function registerPush() {

    if ('serviceWorker' in navigator) {

        console.log('Registering service worker');
        registration = await navigator.serviceWorker.register('/js/worker.js');
        console.log('Registered service worker');
    } else {
        alert("improper device!")
    }
}

registerPush()


async function run(url) {

  const subscription = await registration.pushManager.
    subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

  console.log(subscription)
  console.log('Registered push');

  var sub_json = JSON.stringify(subscription)

  console.log(sub_json)

  console.log('Sending push');
  await fetch(url, {
    method: 'POST',
    body: sub_json,
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Sent push');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//keeping track

//cases: haven't set, new day

if(getCookie("last_time") == "") {
  setCookie("last_time", "0");
}
