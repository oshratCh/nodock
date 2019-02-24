const dbConfig = require("../config/db");
const sqlService = require("../services/sql");
const limitsModel = require("../DBModels/limits");
const adminModel = require("../DBModels/admin");
const buildModel = require("../DBModels/build");

const HITS_PER_PAGE = dbConfig.pagination.hitsPerPage;

(async () => {
  await sqlService.connect();
  const page = parseInt(process.argv.slice(2)[0]) || 0;
  const joinQuery =
    limitsModel.getJoinAccountQuery() +
    adminModel.getJoinAccountQuery() +
    buildModel.getJoinAccountQuery();
  console.log("Loading data page:", page);
  sqlService.loadAllWithJoinQueyOption(joinQuery, page).subscribe(
    n => {
      console.log("Data: ", n);
    },
    e => {
      console.log("error", e);
    },
    d => {
      sqlService.getTotalResults().subscribe(
        totalResults => {
          console.log(
            `page ${page + 1} from ${Math.ceil(totalResults / HITS_PER_PAGE)}`
          );
          console.log("total results: ", totalResults);
        },
        e => {
          console.log("error", e);
        },
        d => {
          sqlService.disconnect();
        }
      );
    }
  );
})();
