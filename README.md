# Weather App Retrospective and Overview

[Video Walkthrough](https://youtu.be/YVzYHNB8c68)
[Github Repo](https://github.com/ssunchu10/CST438-Project-1)

## Overview
This is a Weather Forecasting App built with React Native that provides real-time weather updates for any location in the world. It fetches data from the [OpenWeather API](https://openweathermap.org/) and displays it in both Celsius and Fahrenheit, based on user preference. User can search for any city in the world for its weather.

## Introduction

* How was communication managed?
    * Our group’s communication was done through Slack when we were not in class. If anyone had any questions about the project’s progress or needed help with something, the questions would be addressed there.

* How many stories/issues were initially considered? 
     * 16 stories were initially considered for the project. 
 
* How many stories/issues were completed?
     * 8 stories were completed.


# Team Retrospective

## Matthew Belles

* [Matthew’s pull requests](https://github.com/ssunchu10/CST438-Project-1/pulls?q=is%3Apr+author%3A%40me+is%3Aclosed)
* [Matthew's Github issues](https://github.com/ssunchu10/CST438-Project-1/issues?q=assignee%3A%40me+is%3Aclosed)

**What was your role/which stories did you work on?**

Matthew worked on the app’s search functionality, mainly working with the API. His work also includes displaying the search results after the query was submitted. 

* What was the biggest challenge?
    * Setting up the React Native environment
* Why was it a challenge?
    * It was a challenge because I have never had to set up a project environment in this way before.
* How was it addressed?
    * This challenge was addressed by finding and following the documentation on how to set up a react native project. 
* Favorite/most interesting part of the project?
    * Getting the search results to display conditionally based on if there had been a search or not
* If you could do it over, what would you change?
    * I would suggest we set up the Google OAuth functionality towards the end as that seemed to cause some unforeseen issues when trying to run the project locally. 
* What is the most valuable thing you learned?
    * Try to find a good workflow as soon as possible.
 

## Aiman Khan

* Aiman’s pull requests [Create Homepage](https://github.com/ssunchu10/CST438-Project-1/pull/19) [ Connecting Homepage and Search page](https://github.com/ssunchu10/CST438-Project-1/pull/24)
* [Aiman's Github issues][Homepage](https://github.com/ssunchu10/CST438-Project-1/issues/4) [Retrieve data from search bar to display on Homepage](https://github.com/ssunchu10/CST438-Project-1/issues/20)

**What was your role/which stories did you work on?**

 I worked on developing the homepage for our weather application that provides users with real-time weather data and hourly forecasts. I implemented features that allow users to view detailed weather information like temperature, weather conditions, and a "feels like" temperature. The data is fetched directly from  OpenWeather API, ensuring accurate and up-to-date information. I also added a toggle feature to switch between Celsius and Fahrenheit.

* What was the biggest challenge?
    * For me the biggest challenges were to make the android emulator work, get google play services for my emulator that would allow Google Oauth to work on my device, and get the current location of the user.
* Why was it a challenge?
    * The issue with my android emulator was that it would hang up my laptop, and since google play services is not available on Genymotion virtual devices I had to work without using Google Oauth, and for the current location issue it was a challenge because even though trying everything that would possibly make it work it just wouldn’t detect the current location.
* How was it addressed?
    * Since android emulator won’t work on my laptop I had to use Genymotion to run a virtual device, and since it doesn’t support Google Oauth due to no services of google play services; I had a temporary login page for me to work with other screens of the app. Lastly, detecting current location was never resolved so I just had a default city for initial use of the application.
* Favorite/most interesting part of the project?
    * Probably working with API was one of the most interesting parts for me.
* If you could do it over, what would you change?
    * I would probably have a better workflow of the project prepared beforehand.
* What is the most valuable thing you learned?
    * I learned how to work with react native projects and add different features like fetching API, get current location of the user, and how to work with github as well.
   


## Amancio Ramirez

* [Amancio’s branch](https://github.com/ssunchu10/CST438-Project-1/tree/amancio-Branch)
* [Amancio's Github issues](https://github.com/ssunchu10/CST438-Project-1/issues?q=assignee%3Aajr23+is%3Aopen)

**What was your role/which stories did you work on?**

I was supposed to work on the app’s search database. 

* What was the biggest challenge?
    * My biggest challenge was getting the project to run.
* Why was it a challenge?
    * It was a challenge because I could not figure out how to properly run it. Originally the app just would not bundle at all saying that it had a build error. I was able to resolve that issue though by looking at Stack Overflow and some of the Expo documentation. The error I most struggled with was having Google Oauth work. When I would start my project it would say I am missing the Google sign in modules. It seems that building it using eas build was able to resolve that issue but now it takes extremely long to build and the google services are not working.
* How was it addressed?
    * I tried addressing my issues by asking my teammates, reading documentation online, and scheduling office hours meetings with Graeme. 
* Favorite/most interesting part of the project?
    * My favorite part was trying to resolve the issues I had.
* If you could do it over, what would you change?
    * I would implement Google Oauth last and maybe that would prevent issues we had.
* What is the most valuable thing you learned?
    * I learned that sometimes just getting the project to run correctly can be the hardest part.
 


## Sumit Sunchu

* Sumit’s pull requests [Login Page](https://github.com/ssunchu10/CST438-Project-1/pull/16) [Homepage](https://github.com/ssunchu10/CST438-Project-1/pull/22) [Redesigned the Entire Application](https://github.com/ssunchu10/CST438-Project-1/pull/25) [TestCases](https://github.com/ssunchu10/CST438-Project-1/pull/26)
* Sumit's Github issues [Llogin page](https://github.com/ssunchu10/CST438-Project-1/issues/1) [Search-page](https://github.com/ssunchu10/CST438-Project-1/issues/5) [Testcases](https://github.com/ssunchu10/CST438-Project-1/issues/27)

**What was your role/which stories did you work on?**

 I worked on several key features including the login page, homepage, redesigning the search engine, and implementing test cases. I also contributed to resolving GitHub issues such as creating the login page, search page, and writing test cases.
* What was the biggest challenge?
    * The biggest challenge was implementing Google OAuth2, which was one of my first pull requests. 
    * Additionally, the integration of the database during the last few days of the project was particularly difficult and ultimately could not be completed.
* Why was it a challenge?
    * The database integration faced obstacles due to environment setup issues encountered by a team member, Amancio Ramirez. 
    * There were also complications with Google Cloud authentication, which further delayed progress.
* How was it addressed?
    * Unfortunately, the database integration was not completed by the project deadline. 
    * Despite efforts, the Google Sign-In implementation also presented difficulties, especially in obtaining the SHA-1 fingerprint for the Android client ID and setting up eas-cli.
* Favorite/most interesting part of the project?
    * My favorite part of the project was implementing Google Sign-In, as it provided a valuable learning experience in integrating OAuth2.
* If you could do it over, what would you change?
    * I would prioritize the database setup from the start to ensure it was completed on time.
* What is the most valuable thing you learned?
    * The google Oauth2 implementation and experience to work in a Group.

## How is our app built?

* This app is developed using React Native as the framework for building the weather application.

* We integrated Google Authentication to manage user sign-ins and keep track of their information securely.

* Weather data is fetched in real-time from an external API to display accurate, up-to-date information.


## How to run it?

* [React Native](https://reactnative.dev/docs/getting-started)
* [Google Oauth](https://developers.google.com/identity/protocols/oauth2)
  

## Conclusion

* How successful was the project?
    * The project was successful in achieving its base functionality, and we were able to deliver a working product for the video submission.
* What was the largest victory?
    * The largest victory was getting the project up and running in time for the video submission, despite the challenges we faced, especially with the database integration.
* Final assessment of the project
    * The project provided valuable experience, particularly in Google OAuth2 implementation, and highlighted the importance of teamwork and effective collaboration in a group environment.



