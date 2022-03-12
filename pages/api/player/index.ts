import { query } from "../../../lib/db";
import escape from "sql-template-strings";
import type { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  let players: any = await query(escape`
      SELECT steam,name,score,kills,deaths,connected
      FROM rankme
      ORDER BY score DESC
    `);
  res.status(200).json({ players });
};
