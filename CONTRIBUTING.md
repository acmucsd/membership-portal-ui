# Contributing Guide

We'd love any contribution from you to our project! Any initiative shown by our members is a testament to our tight-knit community. In order to ensure the best contribution experience for everyone else, you should follow these guidelines.

## Getting Started

You can contribute in a number of ways to this project. Primarily, there are two different kinds of contributions:

- Issue creation
- Code

We'll cover each of the two and how to best approach them.

## Issues

Issues in our projects are kind of like conversations; when we find a problem or a new idea that should be discussed, we generally open an issue. The Dev Team not only frequently checks new issues to flesh out details of feature requests, but also directly works along with the conversation to allow for easy contribution from other members.

If you want to file an issue, you can write something like this:

```md
A description of the issue with what occurs.

## Reproduction

Steps for reproduction.

Preferably, add screenshots for easier communication of the issue, if visual in nature.
```

It's recommended you stick to the template above, as it allows the Dev Team to process issues quicker.  However, before submitting a new issue, make sure there isn't a duplicate already on the issues tracker.  Search for your issue and add a "thumbs-up" emote to the issue if you find one that covers your concern.  If it doesn't perfectly cover it, make sure to join the conversation and see whether other members share your concern.

When submitting new issues, be sure to:

- Be clear and concise
	- The better you can describe what the bug or feature is, the faster we'll be able to work on it.
- Provide as much information before-hand as possible.
	- Sometimes, the Dev Team (and perhaps other members) will ask for clarification on your bug or feature if you're not too in-depth. Make sure to provide as much material to help out with the issue.
- Leave labels empty
	- The Dev Team will handle the labels for you. We use them for internal tracking of tasks as well, so it's best left as is.

## Code

So you like coding and want to get into it. That's great! For starters, it's best to run through this checklist so you can get started fast with coding:

- [ ] Fork this repo. If you're not a member of the Dev Team, you won't be able to write code otherwise
- [ ] Check the README. It contains build instructions, how to setup dev tooling, etc.
- [ ] Check out our basic architecture documentation, `ARCHITECTURE.md`. It will be enough to point you towards more important areas of the code you should know about.

Afterwards, you can get started with coding. Here are some tips to get your code accepted the fastest.

- Use Git properly
	- Make sure to branch off of the `nightly` branch
	- Make commits often and atomic ("Start early, start often")
	- Use imperative clauses for Git commit messages ("Add new feature", "Fix old bug", etc.)
	- Make sure your commit messages are well-written and contain useful information
- Use the tooling of the project
	- Make sure to lint your project before committing
	- Write unit tests! We know it's hard (we're guilty of avoiding this) but it helps so much in the future
	- Use any internal custom tooling if it's included instead of another alternative. If you'd like to suggest an alternative to the internal tooling, file an issue to spark up some conversation about it.

After you're done implementing the issue, make sure to open a PR for your fork using the provided template.

### PR's

After you're done with the code, all to do now is ask for a code review. If you don't who to specifically ping for a review, you can ping the Frontend Team in order to make sure someone will pick up your PR. After that, a member of the Dev Team will review your code and provide you with feedback on it.

A Dev Team member might request changes to your PR. If that's the case, make sure to fix them before re-requesting a review. Do make sure to request a review from the same Dev Team member, however.

Whenever conversations spark with regards to code implementation, make sure to talk them out in the code review comments. That way, the driving thoughts behind changes are kept for later.

If your PR gets accepted, congrats! You've added code to the project! Make sure to "Squash and Merge" when you're done.
