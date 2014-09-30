'use strict';

var mongoose = require('mongoose');
var financialsSchema = new mongoose.Schema({
        region: String,
        type: String,
        effectiveMonth: String,
        uploadDate: {type: Date, default: Date.now},
        data: [
            { indicator: String, serialNumber: Number, type: String, values: [
                {period: String, amount: Number, type: String}
            ], ytd: [
                {period: String, amounts: {plan: Number, actual: Number}}
            ] }
        ]
    });

var Financial = mongoose.model('Financial', financialsSchema);

mongoose.connect('mongodb://localhost/financials');

exports.create = function (req, res) {

    create(req.body, function (error, result) {
        if (error) {
            res.send({'result': 'error'});
        } else {
            console.info("result:" + JSON.stringify(result));
            res.send('created');
        }
    })
};


function create(row, callback) {
    console.log('Creating:');
    console.log(row);
    var financialObj = new Financial(row);

    financialObj.save(function (error, result) {
        callback(error, result);
    });
}
exports.readFinancials = function (req, res) {
    getFinancials(function (error, result) {
        if (error) {
            res.send({'result': 'error'});
        } else {
            console.info("result:" + JSON.stringify(result));
            res.send(result);
        }
    });

}

function getFinancials(callback) {
    Financial.find({}, function (error, result) {
        callback(error, result);
    });
}
