import mysql from "serverless-mysql";
import { SQLStatement } from "sql-template-strings";

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: "ink",
    password: "Cs73841959",
    database: "csgo",
    port: 60129,
  },
});

export async function query(query: SQLStatement) {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
