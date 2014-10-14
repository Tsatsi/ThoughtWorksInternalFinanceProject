ddescribe('utilization and bill rates', function(){
    var utilizationAndBillRatesPage = require('../pages/utilizationAndBillRatesPage.js');
    var dashboardPage = require('../pages/dashboardPage.js');
    var financeHomePagePage = require('../pages/financeHomePagePage.js');

    beforeEach(function () {
        browser.get('index.html');
        financeHomePagePage.uploadValidFile();
        dashboardPage.select('UTIL', 'JHB');
    });

    describe('johannesburg', function () {
        it('should show the correct header', function () {
            expect(utilizationAndBillRatesPage.header()).toBe('Johannesburg Utilization');
        });

        it('should display save button', function(){
            expect(utilizationAndBillRatesPage.saveButton().isDisplayed()).toBeTruthy();
        });

        xit('should display successfully saved message when values were saved', function () {
            utilizationAndBillRatesPage.enterAndSaveValidUtilizationValues();
            expect(utilizationAndBillRatesPage.successNotification()).toContain('The utilization values were successfully saved');
        });
    });

    describe('navigation', function () {
        it('should return to dashboard when back button is clicked', function () {
            utilizationAndBillRatesPage.backToDashboard();
            expect(browser.getCurrentUrl()).toContain('dashboard');
        });

    });
});