###Refugee Locations Services

##How to Install

1. Clone the repo
2. ``` npm install -g gulp ```
3. ``` npm install ```
4. Run ``` npm run test-unit ``` to confirm tests are passing

## Setup environment
1. Install postgres and the postgris extension.
2. Download a copy of the data dump and set up a database
3. Create a .env file in the root of your project and populate as follows:

```
DB_CONNECT=pg://<username>@<server_url>:<port>/<dbname>
```

From here, you should be able to run the site with ``` npm start ```

Alternatively, you can skip creating the .env file and run ``` DB_CONNECT=pg://<username>@<server_url>:<port>/<dbname> npm start ```
