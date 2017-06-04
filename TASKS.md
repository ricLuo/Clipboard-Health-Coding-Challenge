# Senior Engineer Interview Task
Clipboard Health Senior Engineer Interview Task

## Before you begin

* rename this file to TASKS.md
* initialize an empty repository
* add TASKS.md to a .gitignore (you may also want to add node_modules, github maintains a node gitignore [here](https://github.com/github/gitignore/blob/master/Node.gitignore))
* push the repository to github (Make commits as you work and send me a link when you are done)


## Introduction
Do not spend any longer than **4 hours** on this task, please try to complete as much as you can during this time. **You are not expected to finish everything**


This project is divided into two parts:

1. Implement python pipeline to ingest data from a csv, clean it, and load it into a MongoDB
2. Serve this data from Express web server as an API and visualize it using a react application and D3

### Data Ingestion

As is true of a lot of our user generated data, it is not standardized. So as part of this process you will need to standardize the data, it is up to you how you choose to handle data that cannot be machine parsed. Then, you will populate a Mongo DB.

The fields you will be populating are: Wage, Patient:Nurse Ratio

**Wages**: Please standardize to Hourly

**Ratio**: Notice values some may be reversed, i.e. 5:1 vs 1:5

Additionally, you may also populate **Department** and **Location**.

### Data Visualization

You will be serving the data that you just loaded into your Mongo DB and serving it to a react application where you will visualized nicely. Think of it as a page a nurse might want to see to learn about their fellow nurses.

Please use the visualization that you see as most appropriate (for example, location should be on a map) but feel free to be creative! (There's nothing wrong with a histogram!)

## What's included

1. Boilerplate for a Python data ingestion pipeline for converting entries in a CSV file to MongoDB documents
2. An Express web server with unimplemented API endpoints and a prebuilt react application

## What's expected of you
1. Clean the data from the included CSV using python
2. Load this cleaned data into a Mongo DB
3. Meaningfully serve this data via an API
4. Visually display this data in a dashboard using D3 and React
5. Create Documentation for your solution in a new README.md
6. Time permitting, feel free to write tests or anything else that you believe will make your solution more complete

## Notes

### Technologies

The technologies we have suggested are ones that we currently use so it is best if you use these. However, if you have a strong technical argument for why something else should be used you may use a different technology but please let us know why you did so.

### Tasks

You can spend as much or as little time on each section and you may work out in the order as you see fit. It will make it easier for us to evaluate your solution if you at least visualize one field of data.

## Install and Run the Boilerplate
Feel free to use this section as a starting point for your documentation

### Dependencies
* Python 3.5
* Virtualenv
* Node.js (>= v6.0.0)
* mongodb >= 3.4.0
* Yarn

### Installation
* Set up a virtual enviroment with:
  ```bash
  virtualenv venv
  source venv/bin/activate
  ```
* Install python dependencies in requirements.txt by:
  ```bash
  pip install -r requirements.txt
  ```
* Install node dependencies with:
  ```bash
  npm install
  ```

### Running in development mode
1. Start webpack-dev-sever by typing ```npm start```

### Running in production mode
1. set `NODE_ENV=production` in your `.env` file
2. Compile webpack using ```npm run build```

1. ``` cp sample.env .env ``` and set values as appropriate.

2. Run `npm run forever-start` and navigate to `<ip>:<port> (default=7999)`.

###  Developing:
1. Set `NODE_ENV=development` in `.env`.
2. Run `npm run dev`
