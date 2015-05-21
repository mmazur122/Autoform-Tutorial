(function () {

  'use strict';

  module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');
    var assert = require("chai").assert;

    this.Given(/^I am a new user$/, function () {
      // no callbacks! DDP has been promisified so you can just return it
      return this.mirror.call('reset'); // this.ddp is a connection to the mirror
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
      // WebdriverIO supports Promises/A+ out the box, so you can return that too
      this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
        url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
        call(callback);
    });

    this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
      // you can use chai-as-promised in step definitions also
      this.browser.
        //waitForVisible('body *'). // WebdriverIO chain-able promise magic
        getTitle().should.become(expectedTitle).and.notify(callback);
    });

    //working
    //this.Then(/^I should not see button "([^"]*)"$/, function (buttonText, callback) {
    //  var _buttonSelector = "//button[text()='" + buttonText + "']";
    //  this.browser.waitForExist(_buttonSelector)
    //      .isVisible(_buttonSelector, function(err, isVisible){
    //        assert.isUndefined(isVisible);
    //        callback();
    //      });
    //});

    //working better then the one above
    this.Then(/^I should not see button "([^"]*)"$/, function (buttonText, callback) {
      var _buttonSelector = "//button[text()='" + buttonText + "']";
      this.browser.waitForExist(_buttonSelector)
          .isExisting(_buttonSelector, function(err, isExisting){
        assert.isFalse(isExisting);
        callback();
      });
    });

    this.Then(/^I should see Category drop down list$/, function (callback) {
      var _ddl = "//select";
      var _that = this;
      this.browser.waitForExist(_ddl)
          .isExisting(_ddl, function(err, isExisting) {
            assert.isTrue(isExisting);
            callback();
          });
    });

    this.Then(/^I should see button "([^"]*)"$/, function (buttonText, callback) {
      var _buttonSelector = "//button[text()='" + buttonText + "']";
      this.browser.waitForExist(_buttonSelector)
          .isExisting(_buttonSelector, function(err, isExisting){
            assert.isTrue(isExisting);
            callback();
          });
    });

    this.Then(/^I click on button "([^"]*)" and should see "([^"]*)"$/, function (buttonText, expectedText, callback) {
      var _buttonSelector = "//button[text()='" + buttonText + "']";
      this.browser.click(_buttonSelector);


      var _h1Selector = "//h1[text()='" + expectedText + "']";
      var _that = this;
        _that.browser
            .waitForExist(_h1Selector).getText(_h1Selector, function(err, text) {
              assert.equal(text, expectedText);
              callback();
            });
        //.getText(_h1Selector).should.become(expectedText);

      });
    //Scenario: completing and submitting form
      this.Given(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
          // WebdriverIO supports Promises/A+ out the box, so you can return that too
          this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
              url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
              call(callback);
      });

      this.Given(/^I am an authenticated user$/, function (callback){

        this.browser.
            execute(function() {
                Meteor.logout();
                //Meteor.call("cleanDB");
            });

        this.browser
            .waitForExist("//li[@id='login-dropdown-list']/a[contains(.,'Sign')]")
            .click("//li[@id='login-dropdown-list']/a[contains(.,'Sign')]")
            .waitForVisible("#login-email")
            .setValue('#login-email', "admin@thebrain.pro")
            .setValue("#login-password", "password")
            //line below is for signing in with an existing account
            //.click("#login-buttons-password");
            //3 lines below are for creating new account
            .click("//a[@id='signup-link']")
            .waitForVisible("//button[contains(.,'Create')]")
            .click("//button[contains(.,'Create')]")

        var _adminSelector = '//li[@id="login-dropdown-list"]/a[contains(.,"@")]';

          var _that = this;
        this.browser.waitForExist(_adminSelector).isVisible(_adminSelector, function(err, isVisible) {
            assert.isTrue(isVisible);

            callback();

        });
    });

    this.Then(/^I should see header "([^"]*)"$/, function (expectedText, callback) {
      var _headerSelector = "//h1[text()='" + expectedText + "']";
      this.browser
          .waitForExist(_headerSelector)
          .isExisting(_headerSelector, function(err, isExisting){
            assert.isTrue(isExisting);
            callback();
          });
    });

    this.Then(/^I should see label "([^"]*)"$/, function (expectedText, callback) {
      var _labelSelector = "//label[text()='" + expectedText + "']";
      //var _inputSelector = "//label[text()='" + expectedText + "']/following-sibling::*[position()=1]";
      this.browser
          .waitForExist(_labelSelector)
          .isExisting(_labelSelector, function(err, isExisting){
              assert.isTrue(isExisting);
              callback();
          });
    });



    this.Then(/^I should click button "([^"]*)"$/, function (buttonText, callback) {
      var _buttonSelector = "//button[text()='" + buttonText + "']";
      //var _buttonSelector = "//button[@type='submit']";
      console.log("_buttonSelector: ", _buttonSelector);
      var _that=this;

      this.browser
          .waitForExist("button.insert")
          .click("button.insert").then(function() {
            callback();
          });
    });

    this.Then(/^The input closest to "([^"]*)" should be "([^"]*)"$/, function (arg1, arg2, callback) {
      var _that = this;
      var _inputSelector = "//label[text()='" + arg1 + "']/following-sibling::*[position()=1]";
      console.log("_inputSelector ", _inputSelector);
      this.browser.setValue(_inputSelector, arg2)
          .getValue(_inputSelector, function (err, value) {
            console.log("input value after clicking insert button: ", value);
            callback();
        });
    });

      this.Then(/^I should remove user I created$/, function (callback) {
          this.browser
              .execute(function() {
                  Meteor.call("cleanDB");
              });
          callback();
      });
  }
})();