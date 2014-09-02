'use strict';


ddescribe('P1 Dashboard', function () {

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

//    it('should upload a file and display success message when the file is valid', function () {
//        financeHomePagePage.uploadFile('../../../app/assets/input-valid.xlsx');
//        expect(financeHomePagePage.successNotification()).toContain('Successfully uploaded file');
//    });

    it('should upload a file and display an error message when the file is invalid', function () {
        financeHomePagePage.uploadFile('../../../app/assets/input-invalid.xlsx');
        expect(financeHomePagePage.errorNotification()).toContain('The excel file uploaded does not contain Q2-ZA Plan');
    });
});