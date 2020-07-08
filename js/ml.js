const modelParams = {
    flipHorizontal: false,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

var handModel;

let faceCascade = new cv.CascadeClassifier();  // initialize classifier

let utils = new Utils('errorMessage'); //use utils class

let faceCascadeFile = 'haarcascade_frontalface_default.xml'; // path to xml

let detectionInterval = 500

var loaded1 = false;
var loaded2 = false;

// use createFileFromUrl to "pre-build" the xml
utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
    faceCascade.load(faceCascadeFile); // in the callback, load the cascade from file
    console.log("loaded cascade")
    loaded1 = true
});

function loadHandTrack() {
  // Load the model.
  // load pre-trained classifiers
  handTrack.load(modelParams).then(model => {
    // detect objects in the image.
    console.log("loaded handtrack")
    handModel = model
    document.getElementById('tryitout').value = "Try It Out!"
    loaded2 = true
    alert("done loading!")
  });
}


var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iOS) { //ios device
    alert("iOS device, cant't use")
} else { //not an ios device
  loadHandTrack()
}

function startVideo() {

  if(loaded1 == false || loaded2 == false) {
    playing = false
    return;
  }

  playing = true;

  const video = document.getElementById('video')

  video.style.visibility = "visible";
  video.style.display = "inline"

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

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}}).then(function (stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
        console.log("playing video")
    });
  }
}

var playing = false;

function pauseVideo() {
  playing = !playing;
  const video = document.getElementById('video')

  if(playing) {
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
    document.getElementById("pause").value = "Pause Video";
  } else {
    video.pause()
    video.currentTime = 0;
    video.srcObject.getTracks()[0].stop();
    clearTimeout(timer);
    document.getElementById("pause").value = "Play Video";
  }

}

var timer;

video.addEventListener('playing', () => {
  timer = setTimeout(detect, detectionInterval);
})

var last = false

var times = 0;

function detect() {
    var video = document.getElementById('video');
    handModel.detect(video).then(predictions => {
        var hands = []
        for(var i = 0; i < predictions.length; i++) {
          hands.push(predictions[i].bbox)
        }
        var face = detectFace()

        var intersecting = false

        if(face != []) {
          for(var i = 0; i < hands.length; i++) {
            intersecting = intersecting || rectanglesIntersect(face[0], face[1], face[2], face[3], hands[i][0], hands[i][1], hands[i][2], hands[i][3])
          }
        }


        if(intersecting) {
          console.log("touching")
        } else {
          console.log("safe")
        }

        //send notification for not touching face
        if(last == false && intersecting == true) {
          times += 1;

          console.log("touched face")


        }

        last = intersecting

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
        timer = setTimeout(detect, detectionInterval);

    });
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
  ctx.drawImage(video, 0, 0, 400, 200);
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
