import { query } from "../../../lib/db";
import escape from "sql-template-strings";
import type { NextApiRequest, NextApiResponse } from "next";
module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query.page;
  const limit = 6;
  if (typeof page != "object") {
    const pageNum = parseInt(page) || 1;
    const count = await query(escape`
      SELECT COUNT(*)
      AS matchCount
      FROM matches
    `);
    if (count instanceof Array && typeof count[0].matchCount === "number") {
      const matches = await query(escape`
        SELECT *
        FROM matches
        ORDER BY time DESC
        LIMIT ${(pageNum - 1) * limit}, ${limit}
      `);
      res.status(200).json({ matches, count: count[0].matchCount });
    }
  }
  res.status(400);
};
