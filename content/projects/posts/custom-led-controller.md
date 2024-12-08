---
title: "Custom Led Controller"
summary: "How laziness turned into full scale home-automation"
date: "2024-12-07"
tags: ["Rust", "IoT", "Restful-API", "Docker", "Docker-Compose", "Actix_web"]
author: ["Julian Patterson"]
---

## Background
I first started messing around in IoT when I was 16 years old. 
At the time, I was really interested in being able to control 
my bedrooms lights from my phone. Coincidentally, I was gifted a LED strip (WS_281x)
and a RPi Zero shortly afterwards. I used a python library in order to control the strip and in the end of the day. I had
a working solution to my problem, SSH into the Pi, run the python script to change colors, and then close the
connection. It worked great (not)!!

## First Iteration -- Python API
My first iteration after this was to create a API, and be able to access it from a website. For example, 
I would go to `http://ip_address_of_pi/off` and that would trigger the function. I found out that I could also use Apple Shortcuts
to send JSON requests to different APIs, so essential I would have a shortcut for every function I wanted sending different 
lighting commands. The request would look something like this:
```
{
    r: 120
    g: 120 
    b: 120
}
```
I would send similar JSON to different endpoints for different functions (brightness, HSV, RGB, off, on, animations, etc. ).
This was the beginning of my rabbit hole in IoT / Home automation, you can check out my blog posts for more about that. 

## Second Iteration -- Rust
My second iteration was to redesign this whole project in Rust. Why ? Because why not. It offered me an opportunity to 
learn a super popular (and praised) language. My original docker image had also started giving me a lot of problems, since 
the RPi Zero is 32-bit ARM and the dependencies were getting out of hand. I also was able to find a proper library to control my WS_281x lights, and I was off. 

First, I created `main.rs` which is responsible for starting the webserver. Here, I define the endpoints, initialize the strip, 
and define JSON data structures. I created, on / off, brightness, HSV, light temperature, and animation endpoints to support
all the functionality I wanted. I used Actix_web library to manage my server and endpoints.
Each endpoint just wraps the `strip.rs` function that actually handles the strip & color logic.
Here's an example of one of my endpoints:
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

Second, I created `strip.rs` which implemented the logic of actually displaying the colors on the strip. I started off with the static functions, 
setting colors, setting brightness, and temperature where all pretty straight forward. Where things got interesting was when I started creating animations (dynamic functions). 
This brought in multi-threading, where I had to be sure that there is no two animations running at once. Multi-threading was also important to since, 
these animations needed to run indefinite, or until a controller turned them off. This worked out with with Rust's `AtomicBool` which
is basically just a conditional-variable used to indicate when an animation is running. Luckily everything worked out in the end. Here's an example of one of my 
animations using multi-threading:
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
Third, I wanted to create a Docker image to easily deploy on my RPi. I was developing on my laptop and 
writing code through SSH and on a RPi was too buggy, so my cycle would be to write, test, push to git,
and pull on RPi to test with their hardware. The Dockerfile helped me deploy faster, by using docker-compose
commands and also helped normalize the development environment between the RPi and my laptop. 

Lastly, I created `/strip/colors.rs` which contains the logic for converting color values from different endpoints, basically, 
just code to work with some Home Assistant UI. 

## Source Code
Feel free to look at the source code of the project [here](https://github.com/patterson-project/custom-led-controller)
