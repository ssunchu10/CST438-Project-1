import { User } from './user'; // Assuming 'user.js' defines the User interface

import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";

enablePromise(true);

export const connectToDatabase   
 = async () => {
  return openDatabase(
    { name: "weather.db", location: "default" },
    () => {},
    (error) => {
      console.error(error);
      throw new Error("Could not connect to database");
    }
  );
};

export const createTables = async (db) => {
  const usersQuery = `
    CREATE TABLE IF NOT EXISTS Users (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      familyName TEXT,
      givenName TEXT,
      name TEXT,
      id INTEGER
    )
  `;

  try {
    await db.executeSql(usersQuery);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to create tables`);
  }
};

export const getTableNames = async (db) => {
  try {
    const tableNames = [];
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    );
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name);
      }
    });
    return tableNames;
  } catch (error) {
    console.error(error);
    throw   
 new Error("Failed to get table names from database");
  }
};

export const removeTable = async (db, tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to drop table ${tableName}`);
  }
};

export const addUser = async (db, user) => {
  const insertQuery = `
    INSERT INTO Users (email, familyName, givenName, name, id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [user.email, user.familyName, user.givenName, user.name, user.id];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add user");
  }
};

export const getUser = async (db) => {
  try {
    const users = [];
    const results = await db.executeSql("SELECT * FROM Users");
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        users.push(result.rows.item(index));
      }
    });
    return users;
  } catch (error) {
    console.error(error);
    throw   
 new Error("Failed to get Users from database");
  }
};

export const updateUser = async (db, updatedUser) => {
  const updateQuery = `
    UPDATE Users
    SET email = ?, familyName = ?, givenName = ?, name = ?
    WHERE id = ?
  `;
  const values = [updatedUser.email, updatedUser.familyName, updatedUser.givenName, updatedUser.name, updatedUser.id];
  try {
    return db.executeSql(updateQuery, values);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (db, user) => {
  const deleteQuery = `
    DELETE FROM Users
    WHERE id = ?
  `;
  const values = [user.id];
  try {
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove user");
  }
};