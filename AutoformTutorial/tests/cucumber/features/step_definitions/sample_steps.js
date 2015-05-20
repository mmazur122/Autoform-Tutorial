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

            //callback();
          });
      //this.browser.click(_ddl).selectByVisibleText(_ddl, "Business");
      //this.browser.selectByIndex(_ddl, 2, function(err, selectedValue){
      //  console.log("Selected value with index 2: ", selectedValue);
      //})

      //var _optionsSelector = _ddl + "//option[2000]";
      //var array = this.browser.getText(_optionsSelector);
      //this.browser.setValue(_ddl, 2);
      //console.log("typeof selected _ddl option: ", typeof(_optionsSelector));
      callback();
    });

    this.Then(/^I should see button "([^"]*)"$/, function (buttonText, callback) {
      var _buttonSelector = "//button[text()='" + buttonText + "']";
      this.browser.waitForExist(_buttonSelector)
          .isExisting(_buttonSelector, function(err, isExisting){
            assert.isTrue(isExisting);
            callback();
          });
    });

    //this.Then(/^I click on button "([^"]*)" and should see "([^"]*)"$/, function (buttonText, expectedText, callback){
    //  var _buttonSelector = "//button[text()='" + buttonText + "']";
    //  this.browser.click(_buttonSelector);
    //  setTimeout(function() {
    //    this.browser.getText('h1').should.become(expectedText);
    //  }, 1000);
    //
    //  callback();
    //
    //});

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

    this.Given(/^I am an authenticated user$/, function (callback){


        this.browser.
            execute(function() {
                Meteor.logout();
            });

        this.browser
            .waitForExist("//li[@id='login-dropdown-list']/a[contains(.,'Sign')]")
            .click("//li[@id='login-dropdown-list']/a[contains(.,'Sign')]")
            .waitForVisible("#login-email")
            .setValue('#login-email', "admin3@thebrain.pro")
            .setValue("#login-password", "password")
            .click("#login-buttons-password");
            //.click("//a[@id='signup-link']")
            //.waitForVisible("//button[contains(.,'Create')]")
            //.click("//button[contains(.,'Create')]")

        var _adminSelector = '//li[@id="login-dropdown-list"]/a[contains(.,"@")]';

        this.browser.waitForExist(_adminSelector).isVisible(_adminSelector, function(err, isVisible) {
            assert.isTrue(isVisible);
            callback();
        });
        //
        //
        //var _adminSelector = '//li[@id="login-dropdown-list"]/a[contains(.,"@")]';
        //
        //this.browser
        //  .waitForExist("//li[@id='login-dropdown-list']")
        //  .click("//li[@id='login-dropdown-list']")
        //  .waitForVisible("//input[@id='login-email']")
        //  .setValue('#login-email', "user@thebrain.pro")
        //  .setValue("#login-password", "password")
        //  .click("//a[@id='signup-link']")
        //  .waitForVisible("//button[contains(.,'Create')]")
        //  .click("//button[contains(.,'Create')]")
        //    .waitForExist(_adminSelector)
        //    .isVisible(_adminSelector, function(err, isVisible) {
        //    assert.isTrue(isVisible);
        //    callback();
        //});

    });

    //this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
    //  // WebdriverIO supports Promises/A+ out the box, so you can return that too
    //  this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
    //      url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
    //      call(callback);
    //});

    //this.Then(/^I should see header "([^"]*)"$/, function (expectedTitle, callback) {
    //  // you can use chai-as-promised in step definitions also
    //  this.browser.
    //    //waitForVisible('body *'). // WebdriverIO chain-able promise magic
    //      getTitle().should.become(expectedTitle).and.notify(callback);
    //});

    this.Then(/^I should see header "([^"]*)"$/, function (expectedText, callback) {
        console.log("inside next test");
      var _headerSelector = "//h1[text()='" + expectedText + "']";
      this.browser
          .waitForExist(_headerSelector)
          .isExisting(_headerSelector, function(err, isExisting){
            assert.isTrue(isExisting);
            callback();
          });
    });

    this.Then(/^I should see label "([^"]*)" and fill the closest input field with "([^"]*)"$/, function (expectedText, inputValue, callback) {
      var _labelSelector = "//label[text()='" + expectedText + "']";
      var _inputSelector = "//label[text()='" + expectedText + "']/following-sibling::*[position()=1]";
      this.browser
          .waitForExist(_labelSelector)
          .setValue(_inputSelector, inputValue).getValue(_inputSelector, function(err, value){
            console.log("input has value: ", value);
            callback();
          });
      //console.log("input has value: ", this.browser.getValue(_inputSelector));


      //callback();
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
      setTimeout(function() {
        _that.browser.getValue(_inputSelector, function (err, value) {
          console.log("input value after clicking insert button: ", value);
            _that.browser.screenshot();
          callback();
        });
      }, 1000);
    });

    //this.Then(/^I should click button "([^"]*)"$/, function (buttonText, callback) {
    //  var _formSelector = "//form[@id='insertPostForm']";
    //  var _inputSelector = "//label[text()='Title']/following-sibling::*[position()=1]";
    //  console.log("_formSelector: ", _formSelector);
    //  this.browser.waitForExist(_formSelector).submit(_formSelector).getValue(_inputSelector, function(err, value){
    //    console.log("Title input value after clicking insert button: ", value);
    //  });
    //
    //  callback();
    //});
  }


})();