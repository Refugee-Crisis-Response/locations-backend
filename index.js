import restify from 'restify';
import dotenv from 'dotenv';
import fs from 'fs';
import Postgres from './lib/mappers/Postgres';
import Country from './lib/models/Country';
import Countries from './lib/controllers/Countries';

//load environment vars if .env file is there
try {
  let envFile = fs.statSync('.env');
  if (envFile) {
    dotenv.load();
  }
} catch (e) {
  if (!process.env.DB_CONNECT) {
    throw(new Error('No database connection defined'));
  }
  console.log('No .env file found, but environment vars defined.');
}

let server = restify.createServer();
server.use(restify.bodyParser());

let Pg = new Postgres(process.env.DB_CONNECT);
let controllers = {
  countries: new Countries(new Country(Pg))
};

server.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the home of the EU Migrants Refuge API'
  });
});

server.get('/countries', controllers.countries.list);

server.get('/countries/:country', controllers.countries.get);

server.listen(3000, () => {
  console.log('now listening at %s', server.url);
});
