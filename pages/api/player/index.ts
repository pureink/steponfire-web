import { query } from "../../../lib/db";
import escape from "sql-template-strings";
import type { NextApiRequest, NextApiResponse } from "next";
import { cvt_64 } from "../../../lib/steamidconvert";
interface player {
  id: number;
  steam: string;
  name: string;
  avatar: string;
  lastip: string;
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  suicides: number;
  tk: number;
  shots: number;
  hits: number;
  headshots: number;
  connected: number;
  rounds_tr: number;
  rounds_ct: number;
  lastconnect: number;
  knife: number;
  glock: number;
  hkp2000: number;
  usp_silencer: number;
  p250: number;
  deagle: number;
  elite: number;
  fiveseven: number;
  tec9: number;
  cz75a: number;
  revolver: number;
  nova: number;
  xm1014: number;
  mag7: number;
  sawedoff: number;
  bizon: number;
  mac10: number;
  mp9: number;
  mp7: number;
  ump45: number;
  p90: number;
  galilar: number;
  ak47: number;
  scar20: number;
  famas: number;
  m4a1: number;
  m4a1_silencer: number;
  aug: number;
  ssg08: number;
  sg556: number;
  awp: number;
  g3sg1: number;
  m249: number;
  negev: number;
  hegrenade: number;
  flashbang: number;
  smokegrenade: number;
  inferno: number;
  decoy: number;
  taser: number;
  mp5sd: number;
  breachcharge: number;
  head: number;
  chest: number;
  stomach: number;
  left_arm: number;
  right_arm: number;
  left_leg: number;
  right_leg: number;
  c4_planted: number;
  c4_exploded: number;
  c4_defused: number;
  ct_win: number;
  tr_win: number;
  hostages_rescued: number;
  vip_killed: number;
  vip_escaped: number;
  vip_played: number;
  mvp: number;
  damage: number;
  match_win: number;
  match_draw: number;
  match_lose: number;
  first_blood: number;
  no_scope: number;
  no_scope_dis: number;
  thru_smoke: number;
  blind: number;
  assist_flash: number;
  assist_team_flash: number;
  assist_team_kill: number;
  wallbang: number;
}

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  let players: any = await query(escape`
      SELECT *
      FROM rankme
      ORDER BY score DESC
    `);
  const steamArray: string = players
    .map((a: player) => cvt_64(a.steam))
    .reduce((a: string, b: string) => a + "," + b);
  const res_steam = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API}&steamids=${steamArray}`
  );
  const steams: any = await res_steam.json();
  for (let p of players) {
    const find = steams.response.players.find(
      (e: any) => e.steamid === cvt_64(p.steam)
    );
    p.avatar = find.avatar;
    p.personastate = find.personastate;
  }
  res.status(200).json({ players });
};
