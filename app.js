const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express()
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const dotenv = require('dotenv');
dotenv.config();

const webpush = require('web-push');

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

// Replace with your email
webpush.setVapidDetails('mailto:val@karpov.io', publicVapidKey, privateVapidKey);

app.post('/faceAlert', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'HealthDESK', body: "Stop Touching Your Face!", image: "https://images.homedepot-static.com/productImages/a94ca394-40a5-47ae-973c-8c76b9d4dcb3/svn/lynch-sign-stock-signs-stop-64_1000.jpg"});

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.post('/postureAlert', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'HealthDESK', body: "Please fix your posture!", image: "https://www.spineuniverse.com/sites/default/files/imagecache/gallery-large/wysiwyg_imageupload/3998/2018/02/01/13328067_ML_edited.jpg"});

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.post('/upAlert', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'HealthDESK', body: "Please stand up!", image: "https://images.squarespace-cdn.com/content/v1/5b41e4c4a9e02869d4a2e96e/1532504966405-5M2TQXBKS2VLAG0SVZFF/ke17ZwdGBToddI8pDm48kHNsYJ2aGQ3XIxrXja_sDipZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVHLF8TrPI__-UWdxnQYjiP3_IyQ-9zyhB88gXnGMdfWm5u3E9Ef3XsXP1C_826c-iU/stand+up.jpg"});

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.post('/closeAlert', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'HealthDESK', body: "You are too close to the screen!", image: "https://www.ourchurch.com/blog/wp-content/uploads/2014/04/too-close-to-screen.jpg"});

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.post('/waterAlert', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'HealthDESK', body: "Remember to stay hydrated!", image: "https://d2ebzu6go672f3.cloudfront.net/media/content/images/cr/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg"});

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.get('/', function (req, res) { //handles get request
  res.render('index');
})

app.get('/ml', function (req, res) { //handles get request
  res.render('ml');
})

app.listen(PORT, function () {
  console.log('go to http://localhost:3000/')
})
