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
      //var _optionsSelector = _ddl + "//option[*]";
      //var array = this.browser.getText(_optionsSelector);

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
  }


})();