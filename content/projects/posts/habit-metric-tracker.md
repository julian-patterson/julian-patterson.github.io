---
title: "Habit - Metric Tracker"
summary: "Upcoming and work in progress habit / mood tracker to improve my skills and familiarize myself with machine learning"
date: "2024-12-18"
tags: ["Swift", "Machine-Learning", "Unsupervised-Learning", "Data-Analysis", "Statistics"]
author: ["Julian Patterson"]
---

## Motivation
My motivation for this project was to familiarize myself with machine learning all while improving something in my life. 
I started off first wanting to track my habits and/or some metrics about my life, such as general happiness, motivation, concentration,
productivity, etc. At the time, I was doing this on paper, regularly tracking each day to see how I progressed over the month with my goals. 
All of a sudden, an idea had hit me. I had been using an apple watch to track my exercise and sleep, which I knew was collecting a lot of 
data about me just by wearing it. This realization caused the birth of this project.

## The idea 
The idea was build a Swift application to load on my iPhone. In doing so, I was able to track all my habits and metrics from my phone and save them. 
Upon saving these daily logs, I would also compile all my health data (provided by my phone and watch) and save it alongside. I would also compile 
other metrics about my screen time, sleep, weather, and maybe even location. Then, I am going to compile this data among a year and I would run an 
unsupervised learning algorithm in order to gain insights on my health, my mood, my sleep, and pretty much anything else I can think of. I would
to both learn more about machine learning, but also learn more about myself, my goals, my habits and my general mood. 

## What is unsupervised learning
Unsupervised learning is a type of machine learning that tries to learn from un-labeled data. What this means is that it tried to uncover hidden patterns
about the data would out having any predefined output. In my case, this would be general correlations about my data (ex. doing x tends to influence my overall energy of the day). 


## The app
The app is build on Swift in order to gain access to Apple's APIs such as the one used to access screen time, health and sleep data. In the frontend,
I will have three sections, metrics (mood, motivation, concentration, energy) rated 1-5, habits (Read, Run, Do x) which are either done or not done, 
and finally, I will have a comment section. All of this data is dynamic, which means that the user can set which habits and metrics they want as 
default, encouraging customization and personalization. Users will be able to add & delete metrics for the daily logs. This was done to allow myself
to add and remove metrics and not having to rebuild the whole application. This would help me adjust these topics as I use the app daily. 

## The data
The data for this application is quite extensive thanks to integrations with Apple's APIs. First, I will have all the data the user enters into the application
As stated above, this is dyanmic, but a specific distinction should be made with the difference between habits and metrics. Metrics are defined to be on a scale
(1-5) where habits are defined to be yes/no. The difference is that metrics are supposed to be reflective questions while habits are supposed to be a sort of 
daily "to do" list. This is the extent of user inputed data, as well as comments. The rest of the data takes advantage of Apple's APIs, logging all the health data
(heart rate, exercises, walking distance,etc.), logging the screen time data (Amount of time per app category, and total screen time), and sleep data (amount of REM & NREM sleep). 
This data can be really extensive, but I am positive that I will not use them all. That being said, I would rather collect as much data and then skim it down later.

## What about privacy?
All data is stored locally on iPhone and to be transfered to a local computer where algorithms can be run. It would be cool in the future to use a server to compute
data analysis directly in the application, however, it would bring serious privacy concerns that would need to be handled. 

## Why collect comments?
The reason for adding comments was in order to provide the user with space that they could reflective think about their day. Think of it as a single sentence
or two that is just a summary of the day. Another idea was to organize key words and use that for the unsupervised learning algorithms. This could just add more 
information about the user's day. 

## Status
This application is a work in progress. The frontend is almost done being developed. This will begin the data collection phase of the project. After this,
I will be importing data and trying different learning algorithms to see what works, and what I can gather

## Future ideas
- **Widget Integration:** I would like to add widgets to this application. An idea is to have a commit graph type of style for seeing the history of habits.
Other ideas is to include quick actions to log the day, or just reminders.
- **Live Activities:** I would like to create live activities to display habits that have not been completed yet.
