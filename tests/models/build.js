const test = require("utest");
const assert = require("assert");
const buildModel = require("../../src/DBModels/build");

describe("Check Build Model Validation", () => {
  it("just with build", function() {
    const accout = { _id: "hhh" };
    assert.equal(buildModel.isValid(accout), true);
  });

  it("with not-int parallel", function() {
    const accout = { _id: 132, build: { parallel: true } };
    assert.equal(buildModel.isValid(accout), false);
  });

  it("with int parallel", function() {
    const accout = { _id: 132, build: { parallel: 123 } };
    assert.equal(buildModel.isValid(accout), true);
  });

  it("with non-int nodes", function() {
    const accout = { _id: 132, build: { nodes: true } };
    assert.equal(buildModel.isValid(accout), false);
  });

  it("with int nodes", function() {
    const accout = { _id: 132, build: { nodes: 23 } };
    assert.equal(buildModel.isValid(accout), true);
  });
});
