<!--PROJECT HEAD-->
<br />
<p align="center">
  <a href="https://github.com/raine-discord/website">
    <img src='assets/img/header.png' width="20%" height="20%">
  </a>

  <h3 align="center">Hydrator</h3>

  <p align="center">
    Remind your members to stay hydrated
    <br />
    <a href="https://github.com/AngelNull/Hydrator/releases"><strong>Download »</strong></a>
    <br />
    <br />
    <a href="#contributing">Contributing</a>
    ·
    <a href="https://github.com/AngelNull/Hydrator/issues">Issues</a>
    ·
    <a href="https://github.com/AngelNull/Hydrator/pulls">Pull Requests</a>
  </p>
</p>
<p align="center">
<!--Contributors-->
<img src="https://img.shields.io/github/contributors/AngelNull/Hydrator.svg?style=for-the-badge" align="center" alt='Contributors'>
<!--Forks-->
<img src="https://img.shields.io/github/forks/AngelNull/Hydrator.svg?style=for-the-badge" align="center" alt='Forks' >
<!--Stars-->
<img src="https://img.shields.io/github/stars/AngelNull/Hydrator.svg?style=for-the-badge" align="center" alt='Stars' >
<!--Issues-->
<img src="https://img.shields.io/github/issues/AngelNull/Hydrator.svg?style=for-the-badge" align="center" alt='Issues' >
</p>

# 
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#purpose">Purpose</a>
    </li>
    <li>
      <a href="#setting-up">Setting Up</a>
      <ul>
        <li><a href="#making-a-bot-application">Making Bot Application</a></li>
        <li><a href="#downloading">Downloading</a></li>
        <li><a href='#install-dependancies'>Installing Dependancies</a></li>
        </ul>
        </li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#versioning">Versioning</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

# Purpose
This bot was made to easily remind server members to stay hydrated at regular intervals using a role to ping them with a specified message.

# Setting Up

Hydrator requires [NodeJS](https://nodejs.org/) 14.x or higher in order to function properly.

## Making A Bot Application

In order to set up hydrator, first of all you must register for a discord bot application over on the [discord developer portal](https://discord.com/developers/applications), there are plenty of guides for this online, so I shall spare the details on it

## Downloading

Clone the repository with `git clone https://github.com/AngelNull/Hydrator.git` or download the latest full release from [here](https://github.com/AngelNull/Hydrator/releases)

## Install Dependancies
```bash
npm install
```
To install only production dependancies, run npm install with the ``--production`` flag.

## Configuration

Once dependancies have been installed, do `npm run config` and follow the steps to configure the base part of hydrator. 

Once you have done this, go to `src/core/config/sample` and copy commands.json and message.json into `src/core/config` and change them to your liking. 

*Note: Thumbnail and Image links must be direct links to the images and be resolvable by discord, an error will be thrown if they are not.*

# Contributing
All contributions are welcomed and encouraged, please ensure you lint your code using the included configurations otherwise it will fail the linting workflow when making a pull-request. Please also keep all commits you make to the [commit convention](./.github/COMMIT_CONVENTION.md) so that changelogs can be created from them. 

## Versioning
Learn more about versioning and the release CI [here.](./.github/VERSIONING.MD)

# License
📜 Hydrator is licensed under the [**MIT** license](./LICENSE) (c) 2021 AngelNull.
