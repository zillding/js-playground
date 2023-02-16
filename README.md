# JS Playground

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A JavaScript code playground

## Usage

Just type in any js code in the editor pane and open the developer console to see
the result.

All js code is run with `eval`. Hence the supported js code syntax depends on the
browser that the code is currently running in.

## Features

- Test short js code snippets with autocompletion.
- Save script with browser storage. (`sessionStorage` in development mode and `localStorage` in production mode)
- Support editor vim keybinding.
- Load external js libraries. (powered by [cdnjs](https://cdnjs.com/))
- Load script according to code pattern: `//@@ http://jquery.js`
- Persist settings (vim)
