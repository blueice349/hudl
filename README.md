<div id="top"></div>
# HUDL Login Automation Project

<!-- PROJECT LOGO -->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


This project is a sample of automating login, log out and verifing data on the page

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This project is for hudl testing

### Prerequisites for Selenium Webdriver with Javascript

Before you start using JavaScript for Selenium automation testing, you need to ensure that your system is installed with the following pre-requisites:

NodeJS and NPM
Verify if NodeJS and NPM are already installed in your system by running the commands node -v and npm -v on the terminal:

If Node JS (or Node.js) is not present on your machine, you can install the latest LTS version from https://nodejs.org/en/. NPM will be installed along with Node.js. So no need for separate installation..
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you to install and setting up your automation. This template does rely on external dependencies and/or services. This also requires a valid login to http://hudl.com_

1. Clone the repo
   ```sh
   git clone https://github.com/blueice349.git
   ```
2. Download the project folder in the desired location in your system. Open the folder in your IDE.

3. Install NPM packages
   ```sh
   npm install
   ```
4. Initialize the project in this folder. Open the IDE terminal and navigate to the project location. Run the following command only if the package.json is missing or has errors.
   ```sh
   npm init -y
   ```
5. I have included the node_modules, but if for some reason they fail to load you can install the project dependencies. You need to install Selenium WebDriver and browser drivers. Run the following command on the terminal to install browser drivers for Chrome. 
    ```sh
    npm install --save selenium-webdriver chromedriver geckodriver
    ```
6. Add the following to your bash.
    ```sh
    #hudl username and password
    export HUDL_CORRECT_EMAIL="yourEmail"
    export HUDL_CORRECT_PASSWORD="yourPaassword" 
    ```
    Replace "yourEmail" and "yourPassword" with your own email and password that is registered with https://hudle.com.

7. Time for some action…let’s run the code by giving the following command on the terminal:
    ```sh
    node test.js
    ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Mike Meyer - blueice349@gmail.com

Project Link: [https://github.com/blueice349/hudl](https://github.com/blueice349/hudl)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html
* https://www.selenium.dev/documentation/webdriver/waits/

<p align="right">(<a href="#top">back to top</a>)</p>
