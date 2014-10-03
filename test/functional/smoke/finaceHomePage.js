'use strict';


describe('Home page', function () {

    var financeHomePagePage = require('../pages/financeHomePagePage.js');


    beforeEach(function () {
        browser.get('index.html');

    });

    it('should display homepage Title', function () {
        expect(financeHomePagePage.pageTitle()).toEqual('P1 Dashboard');
    });

    it('should display header', function () {
        expect(financeHomePagePage.header()).toBe('Internal Finance Dashboard');
    });

    it('should have upload button', function () {
        expect(financeHomePagePage.uploadButtonPresent()).toBeTruthy();
    });

    it('should have and upload button with button value: "Upload Excel File" ', function () {
        expect(financeHomePagePage.uploadButtonValue()).toBe('Upload Excel File');
    });

    it('should upload a file and display an error message when the file is invalid', function () {
        financeHomePagePage.uploadInvalidFile();
        expect(financeHomePagePage.errorNotification()).toContain('The excel file uploaded does not contain Q2-ZA Plan');
    });

    it('should redirect to the dashboard when an upload is successful', function () {
        financeHomePagePage.uploadValidFile();
        expect(browser.getCurrentUrl()).toContain('dashboard');
    });

});