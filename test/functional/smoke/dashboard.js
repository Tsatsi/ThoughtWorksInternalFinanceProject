'use strict';
describe('dashboard', function () {

    var financeHomePagePage = require('../pages/financeHomePagePage.js');
    var dashboardPage = require('../pages/dashboardPage.js');

    beforeEach(function () {
        browser.get('index.html');
        financeHomePagePage.uploadValidFile();
    });

    describe('tiles', function () {
        describe('financials', function () {
            it('should be displayed', function () {
                expect(dashboardPage.tileDisplayed('FIN')).toBeTruthy();
            });

            it('should have buttons button to show financials by region', function () {
                expect(dashboardPage.tileButton('FIN', 'JHB').isDisplayed()).toBeTruthy();
            });

            it('should redirect to financials page when Johannesburg button is clicked', function () {
                dashboardPage.financials('JHB');
                expect(browser.getCurrentUrl()).toContain('financials');
            });

        });
        describe('ytd', function () {
            it('should be displayed', function () {
                expect(dashboardPage.tileDisplayed('YTD')).toBeTruthy()
            });
            it('should have buttons button to show ytd financials by region', function () {
                expect(dashboardPage.tileButton('YTD', 'JHB').isDisplayed()).toBeTruthy();
                expect(dashboardPage.tileButton('YTD', 'KPL').isDisplayed()).toBeTruthy();
                expect(dashboardPage.tileButton('YTD', 'PA').isDisplayed()).toBeTruthy();
            });
        });

        describe('opex', function () {
            it('should be displayed', function () {
                expect(dashboardPage.tileDisplayed('OPEX')).toBeTruthy();
            });
            it('should have buttons button to show operating expenses by region', function () {
                expect(dashboardPage.tileButton('OPEX', 'JHB').isDisplayed()).toBeTruthy();
                expect(dashboardPage.tileButton('OPEX', 'KPL').isDisplayed()).toBeTruthy();
            });
        });

        describe('utilization and bill rates', function () {
            it('should be displayed', function () {
                expect(dashboardPage.tileDisplayed('UTIL')).toBeTruthy();
            });
            it('should have buttons button to show utilization and bill rates by region', function () {
                expect(dashboardPage.tileButton('UTIL', 'JHB').isDisplayed()).toBeTruthy();
                expect(dashboardPage.tileButton('UTIL', 'KPL').isDisplayed()).toBeTruthy();
            });

            it('should redirect to utilization page when johannesburg utilization button is clicked', function () {
                dashboardPage.select('UTIL', 'JHB');
                expect(browser.getCurrentUrl()).toContain('utilization');
            });
        });

    });

    describe('navigation', function () {
        it('should redirect back to the home page when the back to home page button is clicked', function () {
            browser.get('index.html');
            financeHomePagePage.uploadValidFile();
            dashboardPage.backToHomePage();
            expect(browser.getCurrentUrl()).toContain('upload');

        });
    });

});