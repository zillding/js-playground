# JS Playground

A JavaScript code playground

## Development and Run

clone the repo

```bash
cd playground
npm install
npm start
open http://localhost:3000
```

Transforms are enabled for files inside `src` (except `index.js`).

## Usage

Just type in any js code in the editor pane and open the developer console to see
the result. (works best with chrome)

All js code is run with `eval`. Hence the supported js code syntax depends on the
browser that the code is currently running in.

## Build

run `npm run build` to build static assets in folder `dist`

## Features

+ Test short js code snippets.
+ Save script with browser storage. (`sessionStorage` in development mode and `localStorage` in production mode)
+ Support editor vim keybinding.
+ Load external js libraries with either default select or and cdn url.
+ (easter egg) If you find any script you used very frequently and want to add to default select,
try typing 'addmyown' in the add library input in top menu bar. ('reset' to reset) See what happens!!!

## TODO

+ Enable auto complete
+ Add tips
+ Allow executing selected code
+ Toggle script eval context (global or local)
+ Load script according to code (certain code pattern: `// @@LOAD_SCRIPT(url)`)
+ Add push-to-client update message
+ Persist settings (vim)
