import { resolve } from 'path';
import sqlite3 from 'sqlite3';
const DB_FILE = process.env.DB_FILE;

if (!DB_FILE)
  throw new Error('Banco de Dados não encontrado');

export const openConnection = () => {
  let db = new sqlite3.Database(DB_FILE);
  return db;
}

export const query = (query: string, params?: any[]) => {
  let db = openConnection();
  return new Promise<any[]>((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if(err)
        reject(err);
      else
        resolve(rows);
    })    
  })
  .finally(() =>{
    db.close();
  })
}