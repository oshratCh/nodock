const sqlService = require('../services/sql');
const accountModel = require('../DBModels/accounts');
const limitsModel = require('../DBModels/limits');
const adminModel = require('../DBModels/admin');
const buildModel = require('../DBModels/build');

(async () => {
    try {
        console.log('Initialize the Database')
        await sqlService.connect();
        await sqlService.init();
        await accountModel.init();
        await limitsModel.init();
        await adminModel.init();
        await buildModel.init();
        await sqlService.disconnect();
        console.log('Initialize successfully completed :)')
    } catch(e) {
        console.log('Error when Initialize :(', e.message)
    }
})();