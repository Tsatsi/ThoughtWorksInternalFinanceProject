var helpers = function () {

    var scrollFn = function (location) {
        browser.executeScript('window.scrollTo(' + location.x + ', ' + location.y + ');');
        return element;
    };
    var scrollTo = function (element) {
        return element.getLocation().then(scrollFn);
    };

    this.scrollThenClick = function (element) {
        scrollTo(element).then(element.click);
    };
};

module.exports = new helpers();

