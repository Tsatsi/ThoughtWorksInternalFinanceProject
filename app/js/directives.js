'use strict';

/* Directives */


var app = angular.module('financeApplication.directives', []);


app.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]);

app.directive('financialInput', function () {
    return {
        restrict: 'E',
        scope: {
            header: '@',
            ngModel: '=',
            maxLength: '@'
        },
        templateUrl: 'partials/financialsInput.html'
    };
});

app.directive('chart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        scope: '=',
        link: function (scope, element, attrs) {
            var opt = {

                subtitle: {
                    text: attrs.subtitle,
                    x: -20
                },
                xAxis: {
                    tickInterval: 1,
                    title: {
                        text: attrs.xname
                    }
                },
                plotOptions: {
                    lineWidth: 0.5
                },
                yAxis: {
                    title: {
                        text: attrs.yname
                    },
                    tickInterval: (attrs.yinterval) ? new Number(attrs.yinterval) : null,
                    max: attrs.ymax,
                    min: attrs.ymin
                },
                tooltip: {
                    formatter: scope[attrs.formatter] || function () {
                        return '<b>' + this.y + '</b>'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 100,
                    borderWidth: 0
                }
            };

            scope.$watch(function (scope) {

                return JSON.stringify({
                    xAxis: {
                        categories: scope[attrs.xdata]
                    },
                    chart: {
                        renderTo: 'chart',
                        type: scope[attrs.chartType],
                        marginRight: 130,
                        marginBottom: 40,
                        reflow: true
                    },

                    series: scope[attrs.ydata],
                    title: {
                        text: scope[attrs.title],
                        x: -20 //center
                    }
                });
            }, function (news) {
                news = JSON.parse(news);
                if (!news.series)return;
                angular.extend(opt, news);


                var chart = new Highcharts.Chart(opt);
            });
        }
    }

});




