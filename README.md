# HealthDESK - Using AI to ensure you are staying healthy at your desk

#### Greetings judges, thank you for judging this event and please feel free to go through our README or code for more details!

### Project Details

In order to help prevent the adverse effects of office work to people’s health, we created HealthDESK, a website that uses AI technologies and webcam data to determine and notify you when you have poor posture, and also, remind you to maintain healthy habits while sitting at your desk.

### Hackathon

This project was submitted to [HackTheLib](http://www.hackthelib.com/) in July 2020. 
The project is applying for:
* Best Overall - This project encompasses all of the criteria (Impact, Design, Practicality) of an overall winning project.
* Most Practical/Scalable - This project has the potential to grow in size, users, and resources while maintining the same functionality.
* Best Impact - This project has the potential to impact millions of people who sit at desks, such as office workers, students, and children.
* Best Original - This project has a "one of a kind" goal and implementation - this is the first time that AI is used to monitor healthy desk habits.
* Best Design - This project utilizes a simple yet powerful design with light/dark mode, responsiveness, and emojis!

## Links

* [Check out the site in action](https://blooming-chamber-19753.herokuapp.com/)
* [Watch the demonstration video](https://youtu.be/EqEYL4vCNPE)
* [See the project submission on Devpost](https://devpost.com/software/healthdesk-mfj2hr)

## Technologies

* HTML/CSS
* JavaScript
* Tensorflow
* OpenCV
* Node.js
* Express
* Heroku

## How We Built It

Using TensorFlow and OpenCV, we created an AI algorithm that can detect unhealthy habits that occur while sitting at your desk.  The AI implements a variety of Computer Vision algorithms, such as Convolutional Neural Networks called ResNet-50 and MobileNet V2, along with a Cascade Classifier. After receiving bounding boxes and landmarks from these Computer Vision algorithms, we used mathematical computations to determine if a user is drinking water, stood up, touched their face, leaned in, and has bad posture.

In order to create the front end, we used JavaScript, HTML5, and CSS. We used responsive CSS and custom JavaScript to create a simple yet powerful UI/UX design. We also implemented rapid push notifications that notifies users whenever they are being unhealthy, allowing users to keep the website running in the background.

## Authors

* [Ashay Parikh](https://www.linkedin.com/in/ashay-parikh-a0621619a/)
* [Abhi Nayak](https://www.linkedin.com/in/abhi-nayak-7a9a531ab/)
* [Skyler Gao](https://www.linkedin.com/in/skyler-gao-9683b01b2/)

## Contributing
We encourage people to contribute to our website and suggest changes. Please create a pull request and email [us](mailto:ashayp22@gmail.com) with your suggestion. 

For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU General Public License v3.0](https://github.com/ashayp22/HackTheLib/blob/master/LICENSE)


