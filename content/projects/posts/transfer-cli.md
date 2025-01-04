---
title: "Transfer CLI"
summary: "A little about my Go CLI using Cobra, SSH and Git. Built to help me easily sync and transfer repositories over wifi for school / work."
date: "2024-12-18"
tags: ["Go", "CLI", "Cobra", "SSH", "Git"]
author: ["Julian Patterson"]
---

## Transfer CLI

This project started off as a simple solution for transferring files between my computers. To be brief, I wanted a cross-platform solution that could sync files between two repositories. Over time, I also started to add features such as listing directories over SSH and transferring specific files using SSH. These features were more or less added just for fun and because the architecture was already in place. The main goal and my personal usage of this project remain the sync functionality.

## Use of Go and Cobra

This was the first time I had created a CLI (command-line interface), and to be honest, I was pretty excited. I looked into various options, but in the end, I was quite impressed by the offerings of Cobra to create a CLI. It was very straightforward, managing all flags, usage, and even adding help functionality. Also, using Go in this project allowed me to learn another language that was gaining a decent amount of popularity. After working on and writing much of this CLI, I have to say that Cobra is super easy to use and provides a very clean implementation of how I wanted my CLI to work. I could not have been happier with the choice I made. It makes modifying and adding features to this project very easy.

## Structure

The structure of my repository is pretty simple. I have `/cmd/root.go`, which manages all the Cobra and CLI setup. This includes the creation of commands, the initialization of the CLI tool, and input validation (for commands).

Next, I have `/sshutils/sshutils.go`, which manages the SSH connection functions. This file contains the majority of the logic for the CLI, including how connections happen, how repositories are synced, and how files are transferred.

Together, these make up the majority of the CLI, with `root.go` acting as a "front-end," specifying how the program is displayed to the end user, and `sshutils.go` acting as a "back-end," powering the logic and file transfers.

## Configuration

One of the features that I wanted to incorporate was saving configurations. I was at a point where the service was working well between my computers, but I faced an issue where the command to transfer was getting quite long. I had to specify the remote directory, local directory, port, and host, which was quite annoying.  
This pushed me to create a "setup" function. With the setup function, the user could specify all the "default" information, which would be saved into `config.yaml`. Then, when the user would use the CLI, the program would check if the user had set up default configurations or input them with the command.  
Here is the default config file:

```yaml
user: username
password: password
host: host
port: 22
remoteDir: /remote/dir
localDir: /local/dir
```

## Installation Scripts

I also created installation scripts for ease of use between machines. This made it easier to install the CLI on any device I wanted.

## Future of This Project

While this project is in a working state, there are a couple of features that I am excited to implement. Here's a couple:

- **To-Do Functionality**:

  I plan to create commands to add, view, and remove to-do items. These would be synced and act as an agenda. I would like the content to be displayed neatly (colored and with columns). This list would be stored locally on each device and would obviously be synced using the CLI.

  My idea is to create a `.transfer` directory in whichever directory I am syncing. Then, I will use this directory to store the `config.yaml` and todo files. Adding this functionality would also require revamping `config.yaml` to allow users to create different configurations per directory as well as global configurations for system-wide usage.

  In the future, I plan to install this CLI on my phone so I can use it wherever and whenever I want. I might also create a GitHub repository to manage the to-do list so I can sync it from anywhere.

- **Backups**:

  Another idea I want to incorporate is keeping backups before syncing. This idea came to mind after taking COMP 206 (Introduction to Software Systems), where we had to create backups in one of our assignments.
  I think the idea is pretty straightforward: I would take the directory being synced, create an archive, compress it, and store it in the .transfer directory mentioned earlier. This could also work hand-in-hand with having an undo command that would take the last backup and apply the changes to the current directory.

These are just some ideas that I'm looking forward to implementing. I have other ideas in the [issues](https://github.com/julian-patterson/transfer-cli/issues) section of my GitHub repository.

## Source Code

You can check out the source code [here](https://github.com/julian-patterson/transfer-cli).
