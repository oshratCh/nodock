const { Observable } = require('rxjs');
const accountModel = require('../DBModels/accounts');
const limitsModel = require('../DBModels/limits');
const adminModel = require('../DBModels/admin');
const buildModel = require('../DBModels/build');
const Errors = require('../shared/errors');

require('rxjs/add/observable/concat');
require('rxjs/add/operator/concat');
require('rxjs/add/operator/mapTo');

function saveSingleAccount(account) {
    if(isAccountValid(account) == false) {
        return Rx.Observable.throw(Errors.ACCOUNT_NOT_VALID)
    }
    return Observable.concat(
        accountModel.save(account),
        limitsModel.save(account),
        adminModel.save(account) &&
        buildModel.save(account)
     ).mapTo(account)
 }

 function isAccountValid(account) {
    return accountModel.isValid(account) &&
           limitsModel.isValid(account) &&
           adminModel.isValid(account) &&
           buildModel.isValid(account)
 }

 module.exports = {
    isAccountValid,
    saveSingleAccount
 }