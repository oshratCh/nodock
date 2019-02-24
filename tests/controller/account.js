const test   = require('utest');
const assert = require('assert');
const accountController = require('../../src/controllers/account');

describe('Check Account controller Validation',() => {
    it('without _id', function() {
      const accout = {};
      assert.equal(accountController.isAccountValid(accout), false);
    });

    it('has _id', function() {
        const accout = {_id: '12131'};
        assert.equal(accountController.isAccountValid(accout), true);
    });
});