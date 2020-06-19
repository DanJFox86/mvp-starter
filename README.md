![fridgeReducer logo](img/logo.png)

![GIF demo](img/demo.gif)

`Fridge Reducer` is for when you want to cook at home and don't know what to make. It suggests dishes you can make with ingredients on hand as well as showing you what you *could* make with a quick trip to the store. Users can select recipes that seem appealing and a grocery list will be generated.

## Setup

*The following assumes you have `git`, `npm`, and `mysql` installed on your machine.*
1. Clone this repo to your desktop.
2. Open terminal and navigate to the repo, run `npm install` to install all the dependencies.
3. Two files, `schema.sql` and `data.sql`, have everything you need to install a demo database in MySQL. Another file, `database.config.js`, is used as the credentials for accessing MySQL. Check that it will work with your setup, change if necessary. If changes are necessary, update the `database-reset` script in `package.json` as well.
4. Run `npm run database-reset`. This will set up the database and populate it.
---

## Usage

After following the directions in the `Setup` section, you'll need to run 2 scripts:
- `npm run react-dev`
- `npm run server-dev`

At this point you should be able to access it on `http://localhost:3000`, *bon appétit*.

This is a project I completed as a student at [hackreactor](http://hackreactor.com).