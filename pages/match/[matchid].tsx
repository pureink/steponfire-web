
import React from "react";
import { Divider, Box, Flex, Text, Img } from "@chakra-ui/react";
import { PlayerMatch } from "../../components/playermatch";
import Layout from "../../components/layout";
function Match({ data }: { data: any }) {
  return (
    <Layout>
      <Flex justifyContent="center">
        <Img h="8" src={`/map-badge/${data.match.map}.png`}></Img>
        <Text ml="2" my="auto" fontSize="2xl">
          {data.match.map}
        </Text>
      </Flex>
      <Text textAlign="center">
        {new Date(data.match.time).toLocaleString("zh-CN")}
      </Text>
      <Flex maxW="md" mx="auto" flexDirection="column" px="2">
        <Text my="auto" fontSize="4xl" mx="auto">
          {data.match.team3Score + " : " + data.match.team2Score}
        </Text>
        <Flex textAlign="center">
          <Text flex="1">teamA</Text>
          <Text w="20">K/D/A</Text>
          <Text w="20">得分</Text>
          <Text w="7"></Text>
        </Flex>

        <Box>
          {data.players
            .filter((e: any) => e.teamNumber === 2)
            .sort((a: any, b: any) => b.score - a.score)
            .map((player: any) => (
              <PlayerMatch key={player.name} player={player} />
            ))}
        </Box>
        <Divider my="2" />
        <Flex textAlign="center">
          <Text flex="1">teamB</Text>
          <Text w="20">K/D/A</Text>
          <Text w="20">得分</Text>
          <Text w="7"></Text>
        </Flex>
        <Box>
          {data.players
            .filter((e: any) => e.teamNumber === 3)
            .sort((a: any, b: any) => b.score - a.score)
            .map((player: any) => (
              <PlayerMatch key={player.name} player={player} />
            ))}
        </Box>
      </Flex>
    </Layout>
  );
}

export async function getStaticProps(context: any) {
  const res = await fetch(
    process.env.END_POINT + "/api/match/" + context.params.matchid + ".dem"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
export async function getStaticPaths() {
  const res = await fetch(process.env.END_POINT + "/api/match");
  const data = await res.json();
  const paths = data.matches.map((match: any) => ({
    params: { matchid: match.demoName.substring(0, match.demoName.length - 4) },
  }));
  return { paths, fallback: "blocking" };
}
export default Match;
