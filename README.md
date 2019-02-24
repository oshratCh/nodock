NODOCK ETL
===============

Setup
===============

Setup docker:

```
    docker-compose up --build -d node nginx mysql
```

Exec node image:

```
    docker-compose exec node bash
```
in the node terminal that opened enter to the prject foer name:
``` 
    cd nodock 
```

Usage
===============

Init
===============

This command create the SQL Database and the tables (used also to delete al the data)
``` 
    npm run init
```

Save Data
===============
``` 
    npm run save PATH 
```
limits: 
    * the json file MUST be in project folder
    * it MUST have json extension
    * it MUST contains a valid json
example: # npm run save accounts.json

Load
===============
``` 
    npm run load PAGENUMBER 
```
PAGENUMBER must be a equal or bigger then 0.
example: # npm run load 0

Test
===============
``` 
   npm run test 
```
    Note: There is only ~20% of test coverage (sorry...)