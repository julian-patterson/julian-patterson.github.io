---
title: "Portfolio Website"
summary: "Quick story about my portfolio website"
date: "2024-12-07"
tags: ["Hugo", "Github-Actions"]
author: ["Julian Patterson"]
---

## Overall Goal

In the beginning, my goal for a portfolio website was to act as a virtual CV. Over time, I wanted to store more information on the page, including the motivations behind certain projects, different configurations I have set up, and maybe even some random blog posts. My hope was to express, document, and reflect on different topics in one central location.

## Why Hugo?

My original portfolio website was a React-built website with UI elements from the Chakra UI library. I had a lot of fun developing this website myself, especially in the creative aspects. However, the big downside was that I spent a lot of time maintaining, updating, and tweaking the website.

In the end, I determined that I would much rather use something pre-built (and polished) to implement new features. I came across Hugo, which offered a unique set of benefits:

- Markdown editing for webpages
- Nice theming
- Polished product (not too many bugs)
- Easy to add information

Another big positive was that I was already very comfortable writing in Markdown from taking class notes. So, I made the switch, and it took me about 4 hours to set up (not including adding the written content). I no longer had to update my UI, maintain it, or fix bugs, and I could finally spend more time on other projects. Check out their GitHub [here](https://github.com/gohugoio/hugo).

## Quick Word About PaperMod

In my honest opinion, PaperMod was the best-looking theme for Hugo. It was simple, straightforward, and did not include too many features. Simplicity is the keyword. I looked at other options but didn’t get the same aesthetic appeal as PaperMod. Feel free to check out their GitHub page [here](https://github.com/adityatelange/hugo-PaperMod).

## Repository Overview

Overall, the repository is very similar to the original Hugo "start" command. The only thing I added was the subpages and the "profile"-style homepage in [`config.yaml`](https://github.com/julian-patterson/julian-patterson.github.io/blob/hugo-redesign/config.yaml).  
Other than that, I set up my blog, projects, education, and experience sections with a repository structure like this:

```
blog
    |---_index.md
    |---posts/
        |---first_post.md
```

To add another post, I just create another `.md` file in the posts directory, and that’s it—I don’t have to do anything else. This keeps it super simple for me to add, update, and remove information. This solution lets me focus more on the content rather than the maintenance.

## Source Code

Check out the source code [here](https://github.com/julian-patterson/julian-patterson.github.io).
