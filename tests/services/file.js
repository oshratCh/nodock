const test = require("utest");
const assert = require("assert");
const fileService = require("../../src/services/file");
const Errors = require("../../src/shared/errors");

describe("Check File Service", () => {
  it("not json file", function() {
    assert.equal(
      JSON.stringify(fileService.isValidJsonFile("test.txt")),
      JSON.stringify({
        isValid: false,
        errorMessage: Errors.FILE_EXTENTION_NOT_VALID
      })
    );
  });

  it("not exist file", function() {
    assert.equal(
      JSON.stringify(
        fileService.isValidJsonFile("tests/mock/accounts-mock-not-exist.json")
      ),
      JSON.stringify({
        isValid: false,
        errorMessage: Errors.FILE_EXTENTION_NOT_EXIST
      })
    );
  });

  it("good path", function() {
    assert.equal(
      JSON.stringify(fileService.isValidJsonFile("tests/mock/accounts-mock.json")),
      JSON.stringify({
        isValid: true,
        errorMessage: null
      })
    );
  });

  it("read file wrong path", function() {
    const path = "tests/mock/accounts-mock-not-exist.json";
    fileService
      .readJsonFile(path)
      .subscribe(
        n => assert.ok(false),
        e => assert.ok(true),
        d => console.log("done")
      );
  });

  it("read file good path", function() {
    const path = "tests/mock/accounts-mock.json";
    fileService
      .readJsonFile(path)
      .subscribe(
        n => assert.ok(true),
        e => assert.ok(false),
        d => console.log("done")
      );
  });
});
