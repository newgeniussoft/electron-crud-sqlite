# Electron Windows 7 Application

This is a basic Electron application configured to run on Windows 7.

## Requirements
- Node.js (recommended version: 14.x)
- npm (Node Package Manager)

## Installation
1. Clone or download this repository
2. Open terminal in the project directory
3. Run `npm install` to install dependencies

## Running the Application
- Run `npm start` to launch the application

## Notes
- This application uses Electron 11.5.0, which is the last version that supports Windows 7
- Node integration is enabled for compatibility reasons

## Convert to exe
Library must installed like this
```bash
npm install <library-name> --save
```

This is the installation command of electron-packager for converting to exe and the usage is like this
```bash
npm install --save-dev electron-packager
npx electron-packager ./my-app MyApp --platform=win32 --arch=x64 --out=dist
```