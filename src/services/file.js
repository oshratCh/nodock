const fs = require("fs");
const RxNode = require("rx-node");
const JSONStream = require('JSONStream');
const { Observable } = require("rxjs");
const Errors = require("../shared/errors");

require('rxjs/add/observable/throw');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/operator/first');

isValidJsonFile = path => {
  const response = { isValid: false, errorMessage: null };
  const isJsonExtensionValid = isJsonExtension(path);
  if (isJsonExtensionValid == false) {
    response.errorMessage = Errors.FILE_EXTENTION_NOT_VALID;
    return response;
  }
  const isFileExistValid = isFileExist(path);
  if (isFileExistValid == false) {
    response.errorMessage = Errors.FILE_EXTENTION_NOT_EXIST;
    return response;
  }
  response.isValid = true;
  return response;
};

isJsonExtension = path => {
  const extension = path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
  return extension == "json";
};

isFileExist = path => {
  return fs.existsSync(path);
};

readFile = path => {
  const stream = fs.createReadStream(path, {});
  const openSource = Observable.fromEvent(stream, "open").first();
  const resultSource = RxNode.fromReadableStream(stream);
  resultSource.openSource = openSource;
  return resultSource;
};

readJsonFile = path => {
  const isValidJsonPath = isValidJsonFile(path);
  if(isValidJsonPath.isValid == false) {
    return Observable.create(observer => {                        
              observer.error(isValidJsonPath.errorMessage);
              observer.complete()
  });//Observable.throw(isValidJsonPath.errorMessage);
  } else {
    return readLargeJsonFile(path)//readFile(path)
  }
}

readLargeJsonFile = path => {
  const stream = fs.createReadStream(path, {});
  return Observable.create((observer) =>
    stream.pipe(JSONStream.parse('*'))
      .on('data', (data) => observer.next(data))
      .on('error', (err) => observer.error(err))
      .on('end', () => observer.complete()));
}

module.exports = {
  readJsonFile,
  isValidJsonFile
};
