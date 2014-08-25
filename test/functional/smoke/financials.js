'use strict';

describe('financials page', function () {

    var financialsPage = require('../pages/financialsPage.js');
    beforeEach(function () {
        browser.get('#/financials');
    });

    //spike route provider

    it('should know the region for which financials are being displayed', function () {
        expect(financialsPage.region()).toBe('Johannesburg Financials');
    });

    it("should redirect back to the upload page", function () {
        expect(financialsPage.backToUploadPage().isDisplayed()).toBeTruthy();
        financialsPage.backToUploadPage().click();
        expect(browser.getCurrentUrl()).toContain('/upload');
    });


});