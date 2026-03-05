---
title: "Shipping a Presentation Generator in 3 Days"
date: "2025-03-01"
summary: "How I built and launched a presentation generator in a weekend sprint."
---

Last week I had an idea: what if you could generate a full slide deck from a single prompt? Three days later, I shipped it.

## The stack

I kept things simple — Next.js for the frontend, a single API route calling Claude, and a custom renderer for the slides. No databases, no auth, no unnecessary complexity.

## Day 1: Proof of concept

The first day was all about proving the core loop worked. Could I take a prompt, generate structured slide content, and render it visually? By midnight, I had a rough but functional prototype.

## Day 2: Polish and edge cases

Day two was about making it feel good. I added transitions, better typography, and handled the weird edge cases in the AI output.

## Day 3: Ship it

I spent the morning on a landing page, set up a domain, and hit publish. The response was better than I expected.
