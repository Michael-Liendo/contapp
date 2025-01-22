import * as dotenv from 'dotenv';
import knex from 'knex';
import config from './config';

dotenv.config();

const database = knex(config);

export default database;
