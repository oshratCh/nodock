const test = require("utest");
const assert = require("assert");
const adminModel = require("../../src/DBModels/admin");

describe("Check Admin Model Validation", () => {
  it("just with build", function() {
    const accout = { _id: "hhh" };
    assert.equal(adminModel.isValid(accout), true);
  });

  it("with single item", function() {
    const accout = { _id: "aaa", admins: [ "5970abe9c5beb51418919c71" ] };
    assert.equal(adminModel.isValid(accout), true);
  });

  it("with strings array", function() {
    const accout = { _id: "aaa", admins: [ "5970abe9c5beb51418919c71", "5970abe9c5beb51418919c72" ] };
    assert.equal(adminModel.isValid(accout), true);
  });

  it("with non-string item", function() {
    const accout = { _id: "aaa", admins: [ 22 ] };
    assert.equal(adminModel.isValid(accout), false);
  });
});

