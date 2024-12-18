---
title: "Transfer CLI"
summary: "A little about my Go CLI using Cobra, SSH and Git. Built to help me easily sync and transfer repositories over wifi for school / work."
date: "2024-12-18"
tags: ["Go", "CLI", "Cobra","SSH", "Git"]
author: ["Julian Patterson"]
---

## Transfer CLI
This project started off as a simple solution for transfering files between both my computers. To be brief, 
I wanted a cross platform solution that can sync files between two repositories. Overtime, I also started to add
features such as listing directories over SSH and just transfering specific files using SSH. These features were more or less
added just for fun and since the architecture was already there. The main goal and my personal usage of this project is still the 
sync functionality.

## Use of GO and Cobra
This was the first time I had created a CLI (command line interface) and to be honest, I was pretty excited.
I looked into various options but in the end I was quite impressed by the offerings of Cobra to create a CLI. 
It was very straight forward, managing all flags, usage, and even adding help functionality. Also, using Go in this project allowed me to learn
another language which was gaining a decent amount of popularity. After working and writing a lot of this CLI, I have to say that Cobra
is super easy to use and provides a very clean implementation of how I wanted my CLI to work. I could not have been more happier with the choice 
I made. It makes modifying and adding features to this project very easy. 

## Structure
The structure of my repository is pretty simple. I have `/cmd/root.go` which manages all the Cobra and CLI set up. This includes the creation of 
commands, the init of the CLI tool, and input validation (for commands). Next, I have `/sshutils/sshutils.go` which manages the SSH connection 
functions. This file contains the majority of the logic for the CLI including how connections happen, how repositories are synced and how files
are transfered. Together these make the majority of the CLI, with `root.go` acting as a "front-end" specifying how the program is displayed to the 
end user and `sshutils.go` acting as a "back-end" powering the logic and the transfering. 

## Configuration
One of the features that I wanted to incorporate was saving configurations. I was at a point were the service 
was working well between my computers, but I faced an issue where the command to transfer was getting quite long. 
I had to specify the remote directory, local directory, port and host, which was quite annoying. This pushed me to create a "setup" function. 
With the setup function, the user would specify all the "default" information which would be saved into `config.yaml`. Then when the user
would use the CLI, the check if the user had set up default configurations or input them with the command. Here is the default config file:
```yaml
user: username
password: password
host: host
port: 22
remoteDir: /remote/dir
localDir: /local/dir
```

## Installation Scripts
I had also created installation scripts ease of use between machines. This just made it easier to install the CLI on any device I wanted. 

## Future of this project
While this project is in a working state, there are a couple of features that I am excited to implement. Here's a couple: 
- **To Do Functionality:** Creating command to add, view and remove To Do items. This would be synced and act as an agenda. I would like 
the content to be displayed neatly (colored and with columns). This list would be stored locally on each device and would obviously be synced
using the CLI. My idea is that I create a `.transfer` directory in whichever directory I am syncing. Then, I will use this directory to store 
the `config.yaml` and `todo` files. Adding this functionality would also requiring revamping of `config.yaml` to allow users to create different
configurations per directory as well as a global configurations for system wide. In the future, I will install this CLI on my phone and I'll be able 
to use it wherever and whenever I want. I might also create a GitHub repository to manage the TODO list so I can sync it from wherever. 
-  **Back ups:** Another idea I want to incorporate is to keep backups before syncing. This idea came to mind after taking COMP 206, Introduction
to Software Systems where we had to create backups in one of our assignments. I think the idea is pretty straight forward, I would take the 
directory that is being synced, create archive & compress it and keep it in the `.transfer` directory mentioned before. This could also go hand in 
hand with having an `undo` command that would take the last backup and apply the changes to the current directory. 

These are just some ideas that I'm looking forward to implement, I have other ideas in the [issues](https://github.com/julian-patterson/transfer-cli/issues) section
of my GitHub repo.

## Source Code
You can check out the source code [here](https://github.com/julian-patterson/transfer-cli).
