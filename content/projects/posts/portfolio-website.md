---
title: "Portfolio Website"
summary: "Quick story about my portfolio website"
date: "2024-12-07"
tags: ["Hugo", "Github-Actions"]
author: ["Julian Patterson"]
---

## Overall Goal
In the beginning, my goal with a portfolio website was to act as virtual CV. Over time, I wanted to 
store more information on the page, including motivations behind certain projects, different configurations
I have set up, and maybe even some random blog posts. My hope was to be able to express, document, and reflect
on different topics in one particular location. 

## Why Hugo??
My original portfolio website was a React built website with UI elements from
chakra-ui library. I had a lot of fun developing this website myself, especially in 
creative aspects. However, the big downside was that I was spending a lot of time, 
maintaining, updating and tweaking with the website. In the end, I had determined that I 
would much rather have something built (& polished) already and be able to use that to 
implement new features. I had came across Hugo, which presented a unique offering of:
- Markdown editing for webpages
- Nice theming 
- Polished product (not too many bugs)
- Easy to add information

Another big positive was that I was super used to writing in markdown from taking notes in
my classes. So, I made the switch and it took me about 4 hours to set it up, not including
adding the written content. I no longer had to update my UI, maintain & fix bugs and I could 
(finally) spend more time on other projects. Check out there github [here](https://github.com/gohugoio/hugo). 

## Quick Word about PaperMod
In my honest opinion, PaperMod was the best looking theme for Hugo. It was simple, straight forward
and did not include too many features. Simplicity is the key word. I had looked at other options, but did not 
get the same asthetical appeal as PaperMod. Feel free to check out their github page [here](https://github.com/adityatelange/hugo-PaperMod).

## Repository Overview
Overall the repository is very similar to the original Hugo "start" command. The only this I added was the subpages
and the "profile" style homepage in [`config.yaml`](https://github.com/julian-patterson/julian-patterson.github.io/blob/hugo-redesign/config.yaml)
Other than that, I set up my blog, projects, education and experience sections with style of repository structure:
```
blog/
|---_index.md
|---posts/
    |---first_post
```
In order to add another post, I just create another `.md` file in the posts directory and I do not have anything else to do.
This keeps it super simple for me to add, install and remove information. This solution lets me focus more on the content, 
rather than the maintenance. 

## Source Code
Check out the source code [here](https://github.com/julian-patterson/julian-patterson.github.io).
You will see it's pretty similar to the hugo create new website code. 
