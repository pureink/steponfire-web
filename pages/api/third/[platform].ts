import type { NextApiRequest, NextApiResponse } from "next";
import { cvt_64 } from "../../../lib/steamidconvert";
module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { platform, steamId } = req.query;
  if (typeof platform === "string" && typeof steamId === "string") {
    if (platform === "wm") {
      const res3 = await fetch(
        `https://api.xiaoheihe.cn/game/csgo/${
          req.query.platform
        }/get_player_overview?account_id=${cvt_64(steamId)}`
      );
      const data = await res3.json();
      res.status(200).json(data);
    } else {
      const oldSID = steamId.split(":");
      const res3 = await fetch(
        `https://api.xiaoheihe.cn/game/csgo/${
          req.query.platform
        }/get_player_overview?account_id=${
          parseInt(oldSID[2], 10) * 2 + parseInt(oldSID[1], 10)
        }`
      );
      const data = await res3.json();
      res.status(200).json(data);
    }
  } else {
    res.status(400).json("error");
  }
};
