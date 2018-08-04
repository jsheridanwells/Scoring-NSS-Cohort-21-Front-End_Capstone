# Scoring
A web-based tool for teachers to organize and visualize formative assessment data.

A deployed demo version of this application can be found at [http://jeremywells.io/scoring](http://jeremywells.io/scoring)

## Features

Create and store student lists organized by class roster.

<img src="/documentation/Roster-List.png" width="500" />

Organize assessments given over a marking period.

<img src="/documentation/Assessment-Overview.png" width="500" />

Generate lists of students sorted by level of performance.

<img src="/documentation/Performance-Levels.png" width="500" />

Visualize class and student performance data.

<img src="/documentation/Class-Data-Viz.png" width="500" />

<img src="/documentation/Student-Data-Viz.png" width="500" />

## Installation and Setup

Scoring requires **Node Package Manager** to install dependencies.

1. Download or clone this Github repository

`git clone https://github.com/jsheridanwells/Scoring-NSS-Cohort-21-Front-End_Capstone.git`

2. Change to the __lib__ directory.

`$ cd Scoring-NSS-Cohort-21-Front-End_Capstone/lib`

3. Install dependencies using the Node Package Manager.

`$ npm install`

Before running the server, a Firebase database and credentials will need to be added.

1. Create a new project in Firebase or modify an existing project.

2. Change the database rules to the following: 
```javascript

{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "students" : {
      ".indexOn" : ["uid", "name"]
    },
      "classes" : {
        ".indexOn" : ["uid", "name"]
      },
        "assessments" : {
          ".indexOn" : ["uid", "assessmentName", "scores"]
        }
  }
}
```



1.  From the root directory, create the following directory and .js file for reading Firebase credentials:

	`$ mkdir app/credentials/ && cd $_`

2. Create a javascript file to hold Firebase credentials.

	`$ touch fb-creds.js`

3. In the `fb-creds.js` file, copy the following code, modifying the values to your own Firebase config settings:

```javascript
'use strict';

app.constant('FBCreds', {
	apiKey: "[YOUR API KEY]",
        authDomain: "[YOUR FIREBASE DOMAIN]",
        databaseURL: "[YOUR DATABASE URL]"
});

```

4. To run the http server and build the `/dist` directory, move to the `/lib` directory and run Grunt:

	`$ cd lib && grunt`


## Built With

  [Angular JS](https://angularjs.org/)

  [Firebase](https://firebase.google.com/)

  [Bootstrap 4](https://v4-alpha.getbootstrap.com/)

  [D3](https://d3js.org/)

## Author
  Jeremy Sheridan Wells

  [Github: jsheridanwells](http://www.github.com/jsheridanwells)

  [Twitter: @jsheridanwells](http://twitter.com/jsheridanwells)
