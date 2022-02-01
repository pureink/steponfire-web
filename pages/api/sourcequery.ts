import { NextApiRequest, NextApiResponse } from "next";
const SourceQuery = require("sourcequery");
type server = {
  name: string;
  map: string;
  players: string[];
  maxplayers: number;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = new SourceQuery("120.53.224.144", 27015, 1000, true);
  var origininfo = await query.getInfo();
  var player = await query.getPlayers();
  var server: server = {
    name: "",
    map: "",
    players: [],
    maxplayers: 0,
  };
  server.name = origininfo.name;
  server.map = origininfo.map;
  server.players = origininfo.players;
  server.maxplayers = origininfo.maxplayers;
  res.status(200).json({ server, player });
}
