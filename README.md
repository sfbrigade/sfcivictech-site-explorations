# *SF Civic Tech* Site Explorations

This repo contains explorations of how to build a new website for the SF Civic Tech organization.


## Goals

The goals for a new production version of the site include:

- Showcase new branding for the new SF Civic Tech name and logo.
- Make it easy for non-developers to add content to the site, including a blog.
- Make it easy for projects to update their own info, without having to go through the organizing team.
- Reduce costs of website creation and hosting.

But those are **not** necessarily the goals for this repo.  Here we want to collect experiments that help answer questions like:

- What is a good, modern, open source tech stack?
- Which CMSes offer a good balance of features, ease of development and cost?
- How can information from project repos be automatically pulled into the site during the build?
- How can we integrate other tools into the site, like Slack, Notion, Airtable, etc.?
- What are other former CfA Brigades doing for their sites?
- Can a new site serve as a foundation for other needs and workflows, like collecting hours worked by volunteers?

Once we have some of those questions answered, we can start working on the full implementation of the new site.  We may be able to leverage some of the code from these explorations, but we may also just start over from scratch, so we can be loose with the code in this repo.


## Astro proof of concept

A very rough skeleton of the site is now available at https://sfbrigade.github.io/sfcivictech-site-explorations/

The "recent" blog posts are pulled from the markdown files from the old site, and are dynamically generated during the build.  The site has some basic styling from Pico CSS, but is otherwise unthemed.


## Proposed tech stack

Just as a stake in the ground:

- Astro for static site generation
- TypeScript
- Some sort of headless CMS
- [Pico CSS](https://picocss.com/) as a starting point

Another new SSG tool that looks interesting is [Enhance](https://enhance.dev/), though it doesn't have nearly the usage of Astro yet.


### CMS

Requirements for the CMS:

- Free or cheap
- Accounts/roles for at least a few editors to login and create content as needed
- Reasonably easy-to-use editing UI
- Image management and automatic resizing of uploaded images

CMS options:

- builder.io
- Storyblok
- [Payload](https://payloadcms.com/)
- [Cosmic](https://www.cosmicjs.com/)
- [Static CMS](https://www.staticcms.org/)
- [Puck editor](https://github.com/measuredco/puck)


## Old versions of the site

Some of the old site repos listed below contain [old blog posts](https://github.com/sfbrigade/codeforsanfrancisco.org/tree/master/_posts) as markdown files that can be used as ready-made content for new experiments.

- [sfbrigade.github.io](https://github.com/sfbrigade/sfbrigade.github.io) (archived 2018-04-14)
- [brigadehub-archive](https://github.com/sfbrigade/brigadehub-archive) (snapshot from 2018-05-06)
- [sfbrigade.github.io.old](https://github.com/sfbrigade/sfbrigade.github.io.old) (archived 2018-10-13)
- [codeforsanfrancisco.org](https://github.com/sfbrigade/codeforsanfrancisco.org) (archived 2020-11-19)
- [Current site on Wix](https://editor.wix.com/html/editor/web/renderer/edit/dcadfb55-f3c7-4c7d-a6d3-f41bb7b6c303?metaSiteId=0f1cba99-319e-4274-ab7b-f8a661ce7399)


## Packages

- `astro`
  - A basic skeleton of the existing site using Astro, including previous blog posts.
  - Start the server with `npm run astro:dev`.
- `payload`
  - A containerized combo of Astro, Payload and MongoDB, built from the [`astroad`](https://github.com/mooxl/astroad) template.
  - Start the docker containers with `npm run payload:dev`.
