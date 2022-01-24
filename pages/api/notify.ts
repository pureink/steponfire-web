import { Telegram } from "telegraf";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cosUrl = "https://demo-1257876674.cos.ap-beijing.myqcloud.com/";
  // check if the request using POST method and using correct TOKEN
  const { match, players, token } = req.body;
  if (req.method === "POST" && token === process.env.SECRET_TOKEN) {
    // get the message from the request
    let message = "🔥Step On Fire 快报🔥\n\n";
    message += `于${match.time}在${
      match.map
    }结束的比赛Demo已解析完毕，下载链接为${cosUrl + match.demoName}\n`;
    message += `🏁本场比赛比分为${match.team2Score}:${match.team3Score}\n`;
    match.highlight.map((e: any) => {
      message += `${e.user}完成了${e.num}次${e.name}\n`;
    });

    const mvp = players.sort((a: any, b: any) => b.mvp - a.mvp)[0];
    message += `🏆MVP - ${mvp.name}获得了${mvp.mvp}个MVP\n`;

    const adrplayer = players.sort((a: any, b: any) => b.damage - a.damage)[0];
    message += `💥ADR - ${adrplayer.name}造成了场均${
      (adrplayer.damage / adrplayer.totalRound).toFixed(2)
    }的伤害\n`;

    const killer = players.sort((a: any, b: any) => b.kill - a.kill)[0];
    message += `🦸我的超人 - ${killer.name}击杀了${killer.kill}个敌人\n`;

    const hskiller = players.sort(
      (a: any, b: any) => b.headShot - a.headShot
    )[0];
    message += `🎯爆头精英 - ${hskiller.name}获得了${hskiller.headShot}个爆头击杀\n`;

    const entryKiller = players.sort(
      (a: any, b: any) => b.firstKill - a.firstKill
    )[0];
    message += `🔫突破之最 - ${entryKiller.name}获得了${entryKiller.firstKill}个首杀\n`;

    const utilityplayer = players.sort(
      (a: any, b: any) => b.utilityDamage - a.utilityDamage
    )[0];
    message += `💪道具达人 - ${utilityplayer.name}造成了${utilityplayer.utilityDamage}点道具伤害\n`;

    const flashplayer = players.filter((e)=>e.enemyFlashDuration).sort(
      (a: any, b: any) => b.enemyFlashDuration - a.enemyFlashDuration
    )[0];
    message += `🗯闪光达人 - ${
      flashplayer.name
    }共闪白敌人${flashplayer.enemyFlashDuration.toFixed(2)}秒\n`;

    const flashteamplayer = players.filter((e)=>e.teamFlashDuration).sort(
      (a: any, b: any) => b.teamFlashDuration - a.teamFlashDuration
    )[0];
    message += `😓闪兵一号 - ${
      flashteamplayer.name
    }共闪白队友${flashteamplayer.teamFlashDuration.toFixed(2)}秒\n`;

    message += `更多详情请点击链接 https://sof.hezh.in/matches/${match.demoName.substring(
      0,
      match.demoName.length - 4
    )}\n`;

    // create a new instance of telegram
    const bot = new Telegram(process.env.TG_TOKEN || "");
    // send the message to the bot
    await bot.sendMessage(-1001160820861, message);
    // send the response
    res.status(200).json({ name: "success" });
  }
}
