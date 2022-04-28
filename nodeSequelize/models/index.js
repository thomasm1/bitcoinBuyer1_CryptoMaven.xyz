import fs from 'fs';
import path from 'path'

const env = process.env.NODE_ENV || 'development';


const config = require(__dirname + '/../config/config.json')[env];
console.log(config)

// SEQUELZE


export const db = {};



