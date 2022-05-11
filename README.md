<div id="top"></div>

# HUDL Login Automation Project

<!-- PROJECT LOGO -->
<!-- <br />
<div align="center">

  <a href="https://info.hudl.com/contact-sales?_ga=2.67552465.116820452.1652144927-1055888508.1650769979&_gl=1*1jalygd*_ga*MTA1NTg4ODUwOC4xNjUwNzY5OTc5*_ga_B3MJ4DBX38*MTY1MjIzNTM1Mi43LjEuMTY1MjIzNTM1OC4w">
    <img src="images/logo.png" alt="Logo" width="100%" height="400px">
  </a>
</div> -->
<!-- TABLE OF CONTENTS -->
<details open>
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
        <li><a href="#help">Help</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project is a sample to automate login functions on https:hudl.com. In this test we will log in with valid email and password, log out. We will try and log in with a bad email and good password and finally we will try to login with a good email and bad password. While doing this we are looking for elements on the page along with verifing data on the page like the page title etc...

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This project is for hudl testing

### Prerequisites

Before you start using JavaScript for Selenium automation testing, you need to ensure that your system is installed with the following pre-requisites:

1. NodeJS and NPM Verify if NodeJS and NPM are already installed in your system by running the commands in terminal
    ```sh
    node -v 
    ```
    ```sh
    npm -v 
    ```

2. If Node JS (or Node.js) is not present on your machine, you can install the latest LTS version from https://nodejs.org/en/. NPM will be installed along with Node.js. So no need for separate installation..
  ```sh
  npm install npm@latest -g
  ```

3. For this test you will need to be on latest version of chrome 101+

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

_Below is an example of how you to install and setting up your automation. This template does rely on external dependencies and/or services. This also requires a valid login to http://hudl.com_

1. Clone the repo
   ```sh
   git clone https://github.com/blueice349.git
   ```

2. Download the project folder in the desired location in your system. Open the folder in your IDE.

3. To Install NPM packages. I have included them in this setup
   ```sh
   npm install --save-dev
   ```

4. Make sure the package includes the following dependiccs scripts and keywords:
   ```json
        {
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "hudlLogin": "./node_modules/.bin/mocha hudlLogin.js"
            },
            "keywords": [
                "mocha",
                "bdd",
                "selenium",
                "examples",
                "test",
                "bdd",
                "tdd",
                "tap",
                "framework"
            ],
            "dependencies": {
                "chai": "^4.3.6",
                "chromedriver": "^101.0.0",
                "geckodriver": "^3.0.1",
                "nodemon": "^2.0.16",
                "selenium-webdriver": "^4.1.2"
            },
            "devDependencies": {
                "mocha": "^10.0.0"
            }
        }
    ```
    
5. I have included mocha, but if for some reason mocha fails to load you can install mocha.
    ```sh
    npm install --save-dev mocha
    ```

6. Install selenium-webdriver chromdriver if you want to use firefox you will also have to install this and call firefox in the test. for this test we will be using chrome. 
    ```sh
    npm install --save selenium-webdriver chromedriver geckodriver
    ```  

7. Add the following to your bash.
    ```sh
    #hudl login email address and password
    export HUDL_CORRECT_EMAIL="yourEmail"
    export HUDL_CORRECT_PASSWORD="yourPaassword" 
    ```
    Replace "yourEmail" and "yourPassword" with your own email and password that is registered with https://hudle.com.Failing to add this and/or not having a vaild login will result in the first test failing. 

8. Time for some action…let’s run the code by giving the following command on the terminal:
    ```sh
     npm run hudlLogin
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- known Errors & Help -->
## Help

<a herf="https://github.com/SeleniumHQ/selenium/issues/10619">[🐛 Bug]: "Error: Invalid URL: http:/" with Node.js v18 #10619</a>


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Mike Meyer - blueice349@gmail.com

Project Link: https://github.com/blueice349/hudl

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html
* https://www.selenium.dev/documentation/webdriver/waits/

<p align="right">(<a href="#top">back to top</a>)</p>
