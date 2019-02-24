const { Observable } = require('rxjs');
const fileManager = require('./services/file');
const accountModel = require('./DBModels/accounts');
const limitsModel = require('./DBModels/limits');



function loadFile(path) {
    fileManager.readFile(path)
    .flatMap((data) => Observable.from(JSON.parse(data)))
    .flatMap((account) => saveSingleAccount(account))
    .subscribe(      
        (n) => console.log('next',n), 
        (e) => console.log('error',e), 
        (d) => console.log('done',d)
    );
}


function saveSingleAccount(account) {
    return Observable.forkJoin(
        accountModel.save(account),
        limitsModel.save(account)
     )
 }

module.exports = {
    addTogether: function(x,y){
        return x + y
    }, doSomethingWithObject: function(object){
        object.newKey = "easy AF";
        return object;
    }, simpleValue: 'also works'
};