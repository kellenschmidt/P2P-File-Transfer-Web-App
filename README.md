# P2P File Transfer Web App
Transfer any file, to anyone, anywhere, securely, quickly, and anonymously

## Prerequisites
1. Node
    ```
    https://nodejs.org/en/download/
    ```

2. NPM
    ```
    npm i -g npm
    ```

3. Angular CLI
    ```
    npm i -g @angular/cli
    ```

4. Git
    ```
    https://git-scm.com/downloads
    ```

## Running the project from scratch
1. Download all of the files from GitHub
    ```
    git clone https://github.com/kellenschmidt/P2P-File-Transfer-Web-App
    cd P2P-File-Transfer-Web-App
    ```

2. Install dependencies
    ```
    npm install
    ```

3. Build the project with Angular CLI
    ```
    ng build
    ```

4. Start the Express server
    ```
    node server.js
    ```

5. Navigate to `localhost:3000` in your browser

## Angular development
1. Start Angular dev server
    ```
    cd P2P-File-Transfer-Web-App
    ng serve -open
    ```

## Angular CLI Instuctions

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
