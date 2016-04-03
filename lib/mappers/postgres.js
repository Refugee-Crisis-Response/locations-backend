import pg from 'pg';

export default class Postgres {

  constructor (connString) {
    this.client = new pg.Client(connString);
    this.client.connect();
  }
}
