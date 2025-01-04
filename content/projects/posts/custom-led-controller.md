---
title: "Custom Led Controller"
summary: "My custom web service to control LEDs. This project includes a mix of multi-threading, web services, docker, Linux, and Rust."
date: "2024-12-07"
tags:
  [
    "Rust",
    "IoT",
    "Restful-API",
    "Docker",
    "Docker-Compose",
    "Actix_web",
    "Multi-Threading",
  ]
author: ["Julian Patterson"]
---

## Background

I first started exploring IoT when I was 16 years old. At the time, I was really interested in controlling my bedroom lights from my phone. Coincidentally, I was gifted an LED strip (WS_281x) and an RPi Zero shortly afterward. Using a Python library, I managed to control the strip, and by the end of the day, I had a working solution to my problem: SSH into the Pi, run the Python script to change colors, and close the connection. It worked great (not)!!

## First Iteration — Python API

My first iteration after this was to create an API to control the lights via a website. For example, I could go to `http://ip_address_of_pi/off`, and that would trigger the function. I discovered that I could also use Apple Shortcuts to send JSON requests to different APIs. Essentially, I created shortcuts for every function I wanted, sending different lighting commands. The request looked something like this:

```json
{
  "r": 120,
  "g": 120,
  "b": 120
}
```

I would send similar JSON to different endpoints for various functions (brightness, HSV, RGB, off, on, animations, etc.). This marked the beginning of my rabbit hole into IoT and home automation. You can check out my blog posts for more about that!

## Second Iteration — Rust

My second iteration was to redesign this entire project in Rust. Why? Because why not. It gave me the chance to learn a highly popular (and praised) programming language. My original Docker image had also started giving me problems since the RPi Zero is 32-bit ARM, and the dependencies were becoming unmanageable. I also found a proper library to control my WS_281x lights, so I was ready to go.

### Main Components

1. **main.rs**:

   This file is responsible for starting the web server. Here, I defined the endpoints, initialized the strip, and outlined JSON data structures. I implemented endpoints for on/off, brightness, HSV, light temperature, and animations to cover all the functionality I wanted. I used the actix-web library to manage my server and endpoints.
   Each endpoint wraps the strip.rs function, which handles the strip and color logic. Here's an example:

```rust
#[post("/hsv")]
async fn strip_set_hsv(mut payload: web::Payload) -> Result<HttpResponse, Error> {
    let mut body = web::BytesMut::new();
    while let Some(chunk) = payload.next().await {
        let chunk = chunk?;
        if (body.len() + chunk.len()) > MAX_SIZE {
            return Err(error::ErrorBadRequest("overflow"));
        }
        body.extend_from_slice(&chunk);
    }
    let hsv = serde_json::from_slice::<HsvDto>(&body)?;
    strip::strip_set_hsv(hsv.h, hsv.s, hsv.v);
    Ok(HttpResponse::Ok().body(format!("Setting HSV: {}, {}, {}", hsv.h, hsv.s, hsv.v)))
}
```

2.  **strip.rs**:

    This file contains the logic for displaying colors on the strip. I started with static functions for setting colors, brightness, and temperature. Things got more interesting when I implemented animations (dynamic functions).

    This required multi-threading to ensure no two animations ran simultaneously. Multi-threading was also crucial for animations that needed to run indefinitely or until manually stopped. Rust's AtomicBool helped manage this by acting as a conditional variable to indicate when an animation was running. Here's an example animation using multi-threading:

```rust
pub fn rainbow() {
    thread::spawn(move || {
        while ANIMATION_RUNNING.load(Ordering::SeqCst) {
            let mut controller = unsafe {
                STRIP.as_ref().unwrap().lock().unwrap()
            };
            let led_count = controller.leds_mut(0).len();
            let mut color = [255, 0, 0, 0]; // Start with Red

            loop {
                // Transition logic
                if color[0] == 255 && color[1] < 255 && color[2] == 0 { // Red to Yellow
                    color[1] += 1;
                } else if color[0] > 0 && color[1] == 255 { // Yellow to Green
                    color[0] -= 1;
                } else if color[1] == 255 && color[2] < 255 { // Green to Cyan
                    color[2] += 1;
                } else if color[2] == 255 && color[1] > 0 { // Cyan to Blue
                    color[1] -= 1;
                } else if color[2] == 255 && color[0] < 255 { // Blue to Purple
                    color[0] += 1;
                } else if color[0] == 255 && color[2] > 0 { // Purple to Red
                    color[2] -= 1;
                }
                // Apply the current color to all LEDs
                for i in 0..led_count {
                    controller.leds_mut(0)[i] = color;
                }

                if !ANIMATION_RUNNING.load(Ordering::SeqCst) {
                    return;
                }

                controller.render().unwrap();
                std::thread::sleep(std::time::Duration::from_millis(50));
            }
        }
    });
}
```

3. **Docker Integration**:

   I created a Docker image for easy deployment on my RPi. Developing directly on the RPi was buggy, so my workflow involved writing and testing code on my laptop, pushing to Git, and pulling it on the RPi to test with the hardware. The Dockerfile simplified this process with docker-compose commands and standardized the development environment. I also discovered & used docker-compose in order to properly deploy the docker container.

4. **strip/colors.rs**:

   This file contains logic for converting color values from different endpoints, designed to work with the Home Assistant UI.

## Source Code

Feel free to check out the source code for this project [here](https://github.com/patterson-project/custom-led-controller).
