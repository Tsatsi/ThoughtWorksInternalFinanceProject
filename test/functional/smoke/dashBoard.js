
describe('Dashboard', function(){

    var financeHomePagePage = require('../pages/financeHomePagePage.js');

    describe('Utilization and Bill Rates', function () {
        beforeEach(function () {
            browser.get('index.html');
            financeHomePagePage.uploadFile('../../../app/assets/input-valid.xlsx');
        });
        it('should have a tile', function(){
                expect(element(by.tagName('h3')).isPresent());
        });
        it('should have a button for Johannesburg');
        it('should have a button for Kamplala');
        it('should have a button for Pan Africa');

        describe('navigation', function () {
            it("should redirect back to the upload page", function () {
                expect(financialsPage.backToUploadPage().isDisplayed()).toBeTruthy();
                financialsPage.backToUploadPage().click();
                expect(browser.getCurrentUrl()).toContain('upload');
            });
        });


    });

});
