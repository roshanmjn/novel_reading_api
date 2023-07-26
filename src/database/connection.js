import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;

const mysqlConnect = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
});

try {
    await mysqlConnect.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
} catch (err) {
    throw err;
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    define: {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
