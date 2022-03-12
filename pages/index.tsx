import { Box, Img, Flex, Text, Link } from "@chakra-ui/react";
import { cvt_64 } from "../lib/steamidconvert";
import Layout from "../components/layout";

function Home({ data }: { data: any }) {
  return (
    <Layout>
      <Text textAlign="center">
        总游玩时间：
        {(
          data.players
            .map((p: any) => p.connected)
            .reduce((a: any, b: any) => a + b) / 3600
        ).toFixed(0) + " 小时"}
      </Text>
      <Text textAlign="center">玩家人数：{data.players.length + " 人"}</Text>
      <Flex w="100%" px="4">
        <Box mx="auto">
          {data.players.map((p: any) => (
            <Flex key={p.steam} my="4">
              <Img
                mr="4"
                w="7"
                h="7"
                src={p.avatar}
                rounded="md"
                display="inline-block"
              ></Img>

              <Link
                my="auto"
                maxW="32"
                overflow="auto"
                href={`/player/${cvt_64(p.steam)}`}
                display="inline-block"
                whiteSpace="nowrap"
                mx="2"
              >
                {p.name}
              </Link>

              <Text mx="2" my="auto">
                {(p.kills / p.deaths).toFixed(2)}
              </Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Layout>
  );
}
export async function getStaticProps() {
  const res = await fetch(process.env.END_POINT + "/api/player/");
  const data = await res.json();
  const steamArray: string = data.players
  .map((a: any) => cvt_64(a.steam))
  .reduce((a: string, b: string) => a + "," + b);
const res_steam = await fetch(
  `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API}&steamids=${steamArray}`
);
const steams: any = await res_steam.json();
for (let p of data.players) {
  const find = steams.response.players.find(
    (e: any) => e.steamid === cvt_64(p.steam)
  );
  p.avatar = find.avatar;
  p.personastate = find.personastate;
}

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}

export default Home;
