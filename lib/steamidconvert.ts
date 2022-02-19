import BigNumber from "bignumber.js";
export function cvt_64(steamid: string) {
  const sidSplit = steamid.split(":"),
    z = sidSplit[2],
    y = sidSplit[1];

  return new BigNumber("76561197960265728")
    .plus(parseInt(z) * 2)
    .plus(parseInt(y))
    .toPrecision(17);
}
export function cvt_str(steamid: string) {
  let out = "STEAM_1";
  let y = 0;
  let w = new BigNumber(steamid);
  if (w.mod(2).toPrecision(1) === "1") y = 1;
  y === 1 ? (out += ":1") : (out += ":0");
  out +=
    ":" +
    parseInt(w.minus(y).minus("76561197960265728").div(2).toPrecision(17));
  return out;
}
