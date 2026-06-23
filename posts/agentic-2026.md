---
title: "My Summer 2026 Agentic Engineering Workflow"
date: "2026-06-23"
summary: "my personal setup, the tools i've been using, and running agents effeciently"
icon: "/penn.png"
iconSize: 64
---

# My Summer 2026 Agentic Engineering Workflow

Over the past month, I've spent a lot of time curating a workflow that gets me into flow as quickly as possible. A few months ago, agentic coding—mostly through harnesses like Claude Code and Codex—felt boring. My workflow was mundane, and it relied on the same repetitive, passive pattern: ask an agent for output, then repeat.
 
Before I went down the rabbit hole, it looked like this:
 
- Open Claude Code
- Use plan mode, create a set of tasks, and let a single agent work through each one
- Review the diffs carefully and push code to production
Simple enough—a huge task list for the project. The result? A bloated context window and an agent that progressively produced worse code.
 
I wanted to change my approach, so I decided to prioritize three things. So far, I think I've succeeded in making my workflow:
 
1. **Keyboard-centric.** Believe it or not, mastering your keyboard gets you into flow much faster—at least it did for me.
2. **Terminal-centric.** A lot of the tools I use are terminal-native, and I wouldn't want it any other way. Everything can be done through a terminal, and I genuinely think it's the best way to run and manage your agents.
3. **Active development.** I always want to be part of the development workflow. Unless I'm unfamiliar with the tools I'm using to build a project, I generally avoid delegating architectural decisions to my agents.
Previously, writing well-structured code (and getting the architecture right) was my main bottleneck. That slowdown has largely been solved by:
 
- PR-reviewing tools like CodeRabbit
- Open-source alternatives like the ones I'll talk about below
- Fundamentally, having agents with a fresh context window review your output, test it, and push it into a clean PR
I want control over the stack, the tools, and the code layout. If I have to dive into the codebase manually, it's much easier to understand where everything is and how it fits together.
 
With that said, let's dive into what you came here for. I'll split this post into five components:
 
1. The Foundation
    - Tools used; my current software stack
2. Your first agent + extending your agent's capabilities
    - Starting an agent instance + going beyond vanilla Claude Code
    - Think about your agent as a new employee. They're good, but they lack context. Ask: how can you help that agent get context as easily as possible?
3. Validating the agent output
    - Create a pipeline that avoids slop at all costs
    - Review → Test → Improve → PR → Merge
4. Looping
    - When to loop
    - How to ensure you get the best results
    - Native tools + useful repos with looping setups
5. Working with multiple agents
    - Git worktrees + Treehouse tooling
Ultimately, every technique presented here is the result of hours of iteration and a focus on engineering principles that prioritize scalability and production-ready code.
 
## The Foundation
 
As mentioned above, I optimized this workflow to be both keyboard- and terminal-centric—primarily by using Neovim and tmux.
 
Both tools have a learning curve, but once you reach a comfortable level, your productivity can skyrocket.
 
If you're not technical, you probably don't need to worry about learning Neovim, but tmux is a great add-on to almost any workflow because it makes agent management much easier.
 
I generally create a different tmux tab per feature or action I'm performing with an agent. I'll usually have three panes, each on a different git worktree (which I'll talk about later), working on a separate feature—each with its own review and testing pipeline.
 
### Managing Context
 
You can do this in two ways:
 
- A global agents.md / claude.md file
- Local files
How you set up these files is up to you, but I generally like keeping my global files as lightweight as possible, with minimal directions. Bloated global files just end up burning tokens.
 
For example, you might include:
 
- How to write commit messages
- Directions like being picky about UI
- Reminders to run tests once a feature is done
My local files contain guidelines I define before writing any code, but a big part of them often becomes an error log—where the agent logs its own mistakes and ensures it doesn't repeat them. For that reason, they tend to be more verbose.
 
To avoid an overly heavy local claude.md file, I analyze which directions can be turned into a skill. For instance, if something isn't a set of rules but rather an action the agent can perform given a condition, I turn it into a ***skill***.
 
You can also create a **symbolic link** between the files so that both agents.md and claude.md point to the same content.
 
Just a reminder: avoid installing random skills from the internet! You don't want a random skill to leak an API key or something similar.
 
### Prompting Agents
 
I've been using WisprFlow. If you're not familiar, it's dictation software with a model that transcribes speech extremely accurately. There are open-source alternatives that run the same model underneath, but WisprFlow works flawlessly for me.
 
Now that our setup is done, let's get to writing scalable code.
 
## Tactical vs Strategic Programming
 
I want to take a brief detour here to give my opinion on where I believe programming and software engineering are increasingly heading.
 
In *A Philosophy of Software Design* by John Ousterhout, there's a heavily debated distinction between tactical programmers (those who focus on achieving the end result as quickly as possible) and strategic programmers (those who focus on the craft itself, making sure every piece of code is neatly written).
 
My approach is very simple. Depending on the feature and project, I can lean one way or the other, but if I'm being completely honest, agents have gotten so good that tactical programming is the only way to keep up with the output speeds and still maintain a thorough comprehension of how the codebase is evolving.
 
I think we're approaching a future where understanding the underlying principles is still necessary (yes, including syntax and how to debug and write code manually!), but where we become more like engineering managers who understand what's going on at every level yet aren't concerned with how the code is written—because they trust their engineers.
 
## Working with the Agents
 
Here is where I want to talk about **vertical vs horizontal** orchestration.
 
Remember how I mentioned that, a few months ago, I'd follow the overly simplistic approach of creating tasks, then letting the agent plan, execute, test, push, and repeat?
 
Well, that isn't very efficient. What if I want agent 1 working on task 1, agent 2 on task 2, and so on—but each feature depends on the others?
 
Fundamentally, you want to slice tasks so you create an entire feedback loop you can check, correct, and send back to the agent. That way, the agent can work through UI, APIs, and backend in small, workable chunks.
 
If you're too lazy to review diffs, you definitely want to keep an eye on the creation of these vertical chunks. Make sure you correct any horizontal-leaning plan. Then we can move on to the issues.
 
### Creating Issues
 
Once you have a good enough PRD—which you can create either by prompting the agent or, preferably, through a dedicated skill—you can turn it into issues.
 
Congrats: now you have small tasks your agents can work toward in separate worktrees.
 
But what are worktrees? Why should I use them? Can't I just open a new terminal tab and create a new Claude Code instance?
 
### Git Worktrees and Running Parallel Agents
 
The quick answer is yes—you can definitely spin up another terminal tab and get Claude to code. But you'll likely end up with a ton of conflicting modifications in your codebase.
 
This is where git worktrees come to life.
 
Think about a worktree as a separate instance of your code. It's not just a branch, but an entire, separate tree you can later merge back into your main working tree. This keeps the codebase and agent instances in completely separate buckets. Now that you've modularized your issues, the agents can work in parallel to get you to your end result.
 
In tmux, you can open a new tab, rename it after the feature you're working on, and get started.
 
### Skills
 
To go from the planning process to a formal PRD, and from a PRD to GitHub issues, I lean on a variety of skills. I'll leave links to them below.
 
For example, I use the lavish skill, which is similar to the grill-me skill (useful for planning without Claude's native interview process).
 
## Validating Agent Output
 
Your feature is done, you've personally checked that it's working, and the codebase looks good. You can add another layer of safety by creating an output-validation pipeline.
 
Once a feature is done, you'll be tempted to review the diffs.
 
I'm conflicted about whether you should review heavily or not.
 
On one hand, adopting the engineering-manager mentality is great—and you probably should do it 80% of the time, especially on solo projects where the code isn't tied to a single owner.
 
But if you're building a production feature for the company you work at, that's a different story. I've talked to some Amazon SWE interns, and they've mentioned that their engineering teams have one core rule:
 
> You're allowed to use agents to write your code, but you should be able to defend every line.
 
This changes everything. Beyond defending the systems you used, you still need to own the syntax and the "tactical decisions" the agent made in your code.
 
That might seem excessive now that agents can produce decent output, but when a single line can make or break a company's systems, you should understand what you're writing—and, most importantly, be able to defend it.
 
If you use Neovim, there are tons of diff-reviewer plugins. If you don't enjoy writing Lua for two hours to set up a simple plugin, it's a good idea to use agents to do that work for you. (You should probably learn Lua anyway—it'll be fun.)
 
There are many ways to do this, but the best option is to wrap the entire pipeline into a skill or CLI program.
 
That's why using the **/no-mistakes** skill is imperative.
 
It essentially creates a new branch and, before opening a PR, runs through a full validation flow—correcting mistakes and testing the code.
 
## Running Loops and Their Proper Occasion
 
The rising popularity of loops has made them the shiny new objects everyone seems to be chasing.
 
> "You shouldn't be writing prompts anymore. You should be writing loops."
 
I'm sure there are people running dozens of these loops, going completely hands-free on their codebase. Sure, it'll save you plenty of time, and you can definitely give instructions specific enough to output code you consider acceptable.
 
Personally, I think loops have their place. I leverage them as tools to solve the genuinely annoying problems I don't want to go back and forth on.
 
With the rise of loops and all the hype around them (yes, it does feel like 2020, with a new JS framework dropping every other day), we need to define when they're actually useful. Writing production code through loops seems risky—so what are they good for?
 
- Reducing page load
- Research
- Improving end-to-end coverage
- Experimenting with different hypotheses
## Running Parallel Agents
 
If you want to run agents in parallel—and you have no previous experience with git—the obvious answer is to spin up another terminal pane and start a Claude session… right?
 
Well, in git, conflicts are infamously annoying to resolve. With two agents that have no context of what the other is working on, conflicts are likely.
 
The solution? Git worktrees again.
 
As mentioned earlier, a worktree is a separate instance of your code that you can later merge back into your main working tree. You can start one with:
 
`git worktree add ../project-2`
 
Then:
 
`cd ../project-2`
 
If you read this far, make sure to send me any feedback—and if there's an addition you'd like me to make, feel free to send me an email or a quick video of how you set up your workflow!

