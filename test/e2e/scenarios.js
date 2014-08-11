'use strict';


describe('P1 Dashboard', function() {

    browser.get('index.html');

    it('should display homepage Title', function(){
       expect(browser.getTitle()).toEqual('P1 Dashboard');

   }) ;

    it('should display header',function(){
        expect(element(by.css('.intro')).getText()).toBe('Internal Finance Dashboard');
    });

    it('should have upload button', function(){
        expect(element(by.css('#upload-btn')).isPresent()).toBeTruthy();
        expect(element(by.css('.btn-file')).getText()).toBe('Upload Excel File');
    });


});
