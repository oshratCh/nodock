const test   = require('utest');
const assert = require('assert');
const accountModel = require('../../src/DBModels/accounts');

describe('Check Account Model Validation',() => {
    it('without _id', function() {
      const accout = {};
      assert.equal(accountModel.isValid(accout), false);
    });
   
    it('just with _id', function() {
        const accout = { _id: 'hhh'};
        assert.equal(accountModel.isValid(accout), true);
    });
   
    it('with non-string _id', function() {
        const accout = { _id: 132};
        assert.equal(accountModel.isValid(accout), false);
    })

    it('with non-string name', function() {
        const accout = { _id: 132, name: true};
        assert.equal(accountModel.isValid(accout), false);
    })

    it('with non-string provider', function() {
        const accout = { _id: 132, provider: 123};
        assert.equal(accountModel.isValid(accout), false);
    })

    it('with non-string privateAccountOwner', function() {
        const accout = { _id: 132, privateAccountOwner: true};
        assert.equal(accountModel.isValid(accout), false);
    })

    it('with non-string canUsePrivateRepos', function() {
        const accout = { _id: 132, canUsePrivateRepos: ''};
        assert.equal(accountModel.isValid(accout), false);
    })
});

