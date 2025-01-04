---
title: "Habit - Metric Tracker"
summary: "Upcoming and work in progress habit / mood tracker to improve my skills and familiarize myself with machine learning"
date: "2024-12-18"
tags:
  [
    "Swift",
    "Machine-Learning",
    "Unsupervised-Learning",
    "Data-Analysis",
    "Statistics",
  ]
author: ["Julian Patterson"]
---

## Motivation

My motivation for this project was to familiarize myself with machine learning while improving something in my daily life. I initially wanted to track my habits and metrics such as happiness, motivation, concentration, and productivity. At the time, I was doing this on paper, regularly tracking each day to evaluate my progress over the month. Then, an idea hit me: I had been using an Apple Watch to track my exercise and sleep, which was already collecting a lot of data about me. This realization inspired the birth of this project.

## The Idea

The idea was to build a Swift application for my iPhone to streamline habit and metric tracking. Through the app, I could log my daily habits and metrics, saving them alongside health data collected by my phone and Apple Watch. Additionally, I planned to integrate other data points such as screen time, sleep, weather, and possibly location. Over the course of a year, I would compile this data and run an unsupervised learning algorithm to gain insights into my health, mood, sleep patterns, and other aspects of my life. The goal was to both deepen my understanding of machine learning and learn more about myself—my goals, habits, and overall mood.

## What Is Unsupervised Learning?

Unsupervised learning is a type of machine learning that analyzes unlabeled data. In other words, it uncovers hidden patterns in the data without predefined outputs. In my case, this would reveal general correlations in my data (e.g., "Doing X tends to improve my overall energy levels").

## The App

The app is built in Swift to leverage Apple’s APIs, including those for screen time, health, and sleep data. The frontend features three main sections:

- **Metrics**: Mood, motivation, concentration, and energy, each rated on a scale of 1-5.
- **Habits**: Tasks like “Read,” “Run,” or “Do X,” marked as either completed or not.
- **Comments**: A section for reflections or summaries of the day.

The app is dynamic and customizable, allowing users to add or remove habits and metrics to suit their needs. This flexibility means I can adjust the tracked metrics as I use the app daily, without having to rebuild the application.

## The Data

The data collected by the app is extensive, thanks to integrations with Apple’s APIs:

- **User-Entered Data**:
  - Metrics (rated on a scale of 1-5) are reflective, subjective measures.
  - Habits (yes/no) act as a daily “to-do” list.
  - Comments are free-form text for additional context.
- **Health Data**: Heart rate, exercise logs, walking distance, etc.
- **Screen Time Data**: Time spent per app category and total screen time.
- **Sleep Data**: REM and NREM sleep durations.

Although the data collected is vast, not all of it will necessarily be used. My approach is to collect as much as possible initially and refine it later.

## What About Privacy?

All data is stored locally on the iPhone and can be transferred to a local computer for algorithmic analysis. In the future, I might explore using a server to run data analysis directly within the app. However, this would raise significant privacy concerns that would need to be carefully addressed.

## Why Collect Comments?

The comment section provides users with a space to reflect on their day in a sentence or two. This feature is designed for self-reflection and can also be used to identify keywords for unsupervised learning algorithms, offering additional insights into the user’s day.

## Status

This application is a work in progress. The frontend is nearly complete, and I will soon begin the data collection phase. Once sufficient data has been gathered, I will experiment with various machine learning algorithms to extract meaningful insights.

## Future Ideas

- **Widget Integration**: I plan to add widgets to the app, such as a commit-graph-style visualization for habit history, quick actions for daily logging, or reminders.
- **Live Activities**: I aim to create live activity features to display incomplete habits in real time.
