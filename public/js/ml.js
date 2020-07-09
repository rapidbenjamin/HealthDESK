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
    return net;
  });
}

loadPoseNet();

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

  if(loaded1 == false || loaded2 == false || loaded3 === false) {
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
  console.log(distance);
  return distance <= 40;

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
            intersecting = intersecting || rectanglesIntersect(face[0], face[1], face[2], face[3], hands[i][0], hands[i][1], hands[i][2], hands[i][3])
          }
          faceNotDetected = 0;
        } else {
          faceNotDetected += 1;
        }

        if (faceNotDetected === 8 && drinkingWater === 0) {
          alert("got up!")
        }

        //figure out area

        area = face[2] * face[3];

        if (area > 6500) {
          console.log("too close to the screen")
        }

        //try posenet

        var imageElement = document.getElementById('video');

        net.estimateSinglePose(imageElement, {
          flipHorizontal: true
        }).then(pose => {

          var keypoints = pose.keypoints;
          var leftArm = [keypoints[5].position, keypoints[7].position, keypoints[9].position] //shoulder, elbow, wrist
          var rightArm = [keypoints[6].position, keypoints[8].position, keypoints[10].position]

          var leftShoulder = keypoints[5].position;
          var rightShoulder = keypoints[6].position;
          var nose = keypoints[0].position;

          if(detectSlouching(leftShoulder, rightShoulder, nose)) {
            slouching += 1;
          } else {
            slouching = 0;
          }

          if (slouching >= 3) {
            console.log("stop slouching");
          }


          if(calculateBelow(rightArm) && calculateAngle(rightArm) <= 18) {
            //make sure that elbow is below arms
            drinkingWater += 1;
          } else if (calculateBelow(leftArm) && calculateAngle(leftArm) <= 18) {
            drinkingWater += 1;
          } else {
            drinkingWater = 0;
          }
        })

        if(drinkingWater >= 2) {
          console.log("drinking Water")
        }

        // if(intersecting) {
        //   console.log("touching")
        // } else {
        //   console.log("safe")
        // }

        //send notification for not touching face
        if(last == false && intersecting == true && drinkingWater == 0) {
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
