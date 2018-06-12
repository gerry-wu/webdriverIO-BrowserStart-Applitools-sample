var expect = require('chai').expect;
const axeSource = require('axe-core').source;
const assert = require('assert');

describe('Mocha Sauce Example', function () {
  it("Visual Validate Applitools.com", function () {

    console.log('RUNNING SAUCE TEST');
    browser.EyesOpen("Home Page");
    browser.url('http://localhost:9000/');
    console.log(browser.getUrl());
    browser.pause(5000);
    browser.EyesCheckWindow("Home");
    var results = browser.EyesClose(false);
    // inject the script
    browser.execute(axeSource);
    // run inside browser and get result
    let result = browser.executeAsync(function (done) {
        //run axe on our site
        axe.run(function (err, result) {
            if (err) done(err)
            done(result);
        });
        // return the results
    })
//    console.log(result.value);

    // assert there are no violations
    assert.equal(result.value.violations.length, 0, 'Expected no a11y violations');
    if(result.value.violations.length > 0){
            console.log(result.value.violations);
            JSON.stringify(result.value.violations);
    }

    // parse through the results and convert them to chai format



//		axe.run(document, function (err, result) {
//			expect(err).to.be.null();
//			expect(result.violations.length).to.equal(0);
//			done();
//		});
    //assert the results object if you like...
    //http://support.applitools.com/customer/en/portal/articles/2191066-tests-results-advanced-information
  });
});
