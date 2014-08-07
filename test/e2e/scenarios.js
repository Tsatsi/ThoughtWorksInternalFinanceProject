'use strict';


describe('P1 Dashboard', function() {

    browser.get('index.html');

    it('should display homepage Title', function(){
       expect(browser.getTitle()).toEqual('P1 Dashboard');

   }) ;

    it('should display header',function(){
        expect(element(by.css('h2')).getText()).toBe('ThoughtWorks Finance DashBoard');
    });

    it('should have upload button', function(){

        element(by.id('upload-btn')).isDisplayed().then(function(visible){
            expect(visible).toBeTruthy();
        });

    });
});
