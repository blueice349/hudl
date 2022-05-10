const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

var assert = require( 'assert' );
var hudlSite = "https://www.hudl.com/"

describe( 'Login test for hudl', function () {

    let driver = await new Builder().forBrowser("chrome").build();
    
    describe('Should login to hudl with a good email and password', function () {

        it('should go to hudl and verify login button exist', function () {
            await driver.get( hudlSite );
            //assert.equal(-1, [4, 5, 6].indexOf(7));
        });
    });
});