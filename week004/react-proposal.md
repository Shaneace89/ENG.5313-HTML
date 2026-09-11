# React Proposal – Motocross Lap Timer

## Shane Fleming – github.com/Shaneace89

### Abstract

I will be developing an open-source, self-contained motocross lap timer to provide an affordable alternative to proprietary systems. The hardware and software stack will run entirely offline on a local Raspberry Pi deployed trackside. Laps will be detected using a physical trigger mechanism, such as a pressure plate or Passive Infrared (PIR) sensor directly wired to the Pi's GPIO pins.

### Architecture & Stack

* Frontend: React optimized for responsive viewing.

* Backend: Ruby with a Rails API to process GPIO trigger events, log timestamps, and calculate split/lap times.

* Database: MySQL running locally via Docker to hold rider profiles, sessions, and individual lap records.

* Hardware Interface: A lightweight background service listening on Raspberry Pi GPIO pins, pushing lap events to the frontend via WebSockets for real-time timing updates.

* Network: Configured with a hotspot on my phone, allowing any device connected to the hotspot to view the interface.

### Hardware & Environmental Testing

* Rebound Logic: Implement software logic to ignore consecutive hits within a short window, to eliminate false trips from front/rear tires.

* Bench Testing: Test at my work bench with a simple cardboard foil setup, or with a PIR sensor.

* Security & Data Integrity: Standard input sanitization and parameterized SQL queries to prevent injection attacks and ensure reliable schema migrations.