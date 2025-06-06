import * as mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "Raulito9047106/",
  database: process.env.MYSQL_DATABASE || "db_grafos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});