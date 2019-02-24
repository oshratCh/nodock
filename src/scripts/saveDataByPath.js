const { Observable } = require('rxjs');
const fileService = require('../services/file');
const sqlService = require('../services/sql');
const accountConstroller = require('../controllers/account');

const flatMap  =  require('rxjs/operators').flatMap
require('rxjs/add/observable/from');
require('rxjs/add/observable/forkJoin');
require('rxjs/add/operator/map');

(async () => {
    await sqlService.connect();
    const path = process.argv.slice(2)[0] || '';
    console.log('Fetch path ' + JSON.stringify(path));
    fileService.readJsonFile(path)
    .pipe(
        flatMap((account) => accountConstroller.saveSingleAccount(account))
    )
    .subscribe(     
        (n) => console.log('saved successfully',n), 
        (e) => console.log('error',e), 
        (d) => sqlService.disconnect()
    );
})();