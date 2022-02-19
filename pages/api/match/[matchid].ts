import { query } from "../../../lib/db";
import escape from "sql-template-strings";
import type { NextApiRequest, NextApiResponse } from "next";
import { cvt_64 } from "../../../lib/steamidconvert";
module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const match: any = await query(escape`
      SELECT *
      FROM matches
      WHERE demoName = ${req.query.matchid}
    `);
  const players: any = await query(escape`
    SELECT *
    FROM player
    WHERE demoName = ${req.query.matchid}
    `);
  if (match.length === 1 && players.length > 0) {
    const steamArray: string = players
      .map((a: any) => cvt_64(a.steamId))
      .reduce((a: string, b: string) => a + "," + b);
    const res_steam = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API}&steamids=${steamArray}`
    );
    const steams: any = await res_steam.json();
    for (let p of players) {
      p.avatar = steams.response.players.find(
        (e: any) => e.steamid === cvt_64(p.steamId)
      ).avatar;
    }
    res.status(200).json({ match: match[0], players });
  } else {
    res.status(400).json({ error: "Match not found" });
  }
};
