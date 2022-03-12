import { query } from "../../lib/db";
import escape from "sql-template-strings";
import type { NextApiRequest, NextApiResponse } from "next";
module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const matches = await query(escape`
  SELECT demoName
  FROM matches
  ORDER BY time DESC
      `);
  res.status(200).json({ matches });
};
