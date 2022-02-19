import { rand_md } from "../../lib/modelrandom";
import {
  Box,
  Img,
  Flex,
  Tooltip,
  Text,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { PlayerWeapon } from "../../components/playerweapon";
import { CardB5 } from "../../components/cardB5";
import { CardWm } from "../../components/cardWm";
import { useState } from "react";
import { Card5e } from "../../components/card5e";
import Layout from "../../components/layout";
import { cvt_64 } from "../../lib/steamidconvert";
function Home({ data }: { data: any }) {
  const i = rand_md();
  const [cnt, setCnt] = useState(5);
  const hits =
    data.player.head +
    data.player.stomach +
    data.player.chest +
    data.player.right_arm +
    data.player.left_arm +
    data.player.left_leg +
    data.player.right_leg;
  const matchCount = data.matches.length || 0;
  const pages = [];
  for (let i = 0; i < cnt && i < matchCount; i++) {
    const match = data.matches[i];
    pages.push(
      <Tr
        rounded="md"
        key={match.demoName}
        borderLeftWidth="3px"
        borderColor={
          match.teamScore > match.enemyScore ? "green.400" : "red.400"
        }
      >
        <Td>
          <Flex>
            <Img
              display="inline-block"
              w="5"
              mx="1"
              src={"/map-badge/" + match.map + ".png"}
            />
            <Link
              my="auto"
              href={
                "/match/" +
                match.demoName.substring(0, match.demoName.length - 4)
              }
            >
              {match.map}
            </Link>
          </Flex>
        </Td>
        <Td>{`${match.kill}/${match.death}/${match.assist}`}</Td>
        <Td textAlign="center">{match.teamScore + ":" + match.enemyScore}</Td>
        <Td>{new Date(match.time).toLocaleDateString()}</Td>
      </Tr>
    );
  }
  return (
    <Layout>
      <Text
        textAlign="center"
        bgGradient="linear(to-b,#f7c90a,#f35317)"
        bgClip="text"
      >
        {data.player.name}
      </Text>
      <Img w="16" rounded="full" src={data.player.avatar} mx="auto" />
      <Text textAlign="center">
        玩家共游玩{(data.player.connected / 3600).toFixed(1)}小时
      </Text>
      <Text textAlign="center">
        上次连接时间：
        {new Date(data.player.lastconnect * 1000).toLocaleString()}
      </Text>
      <Flex my="2">
        <Flex flexDirection="column" px="2" w="25%" textAlign="center">
          <Text>击杀数</Text>
          <Text>{data.player.kills}</Text>
        </Flex>
        <Flex
          flexDirection="column"
          borderLeft="1px"
          px="2"
          w="25%"
          textAlign="center"
        >
          <Text>死亡数</Text>
          <Text>{data.player.deaths}</Text>
        </Flex>
        <Flex
          flexDirection="column"
          borderLeft="1px"
          px="2"
          w="25%"
          textAlign="center"
        >
          <Text>助攻数</Text>
          <Text>{data.player.assists}</Text>
        </Flex>
        <Flex
          flexDirection="column"
          borderLeft="1px"
          px="2"
          w="25%"
          textAlign="center"
        >
          <Text>分数</Text>
          <Text>{data.player.score}</Text>
        </Flex>
      </Flex>
      <Flex w="100%" px="4" justifyContent="space-around" my="4">
        <Box my="auto" w="30%">
          <Flex flexDirection="column">
            <Tooltip label={((data.player.head / hits) * 100).toFixed(1) + "%"}>
              <Img
                src={`/models/${i}-head.png`}
                _hover={{ filter: "blur(1px)" }}
                w="100%"
              ></Img>
            </Tooltip>
            <Flex flexDirection="row">
              <Tooltip
                label={((data.player.left_arm / hits) * 100).toFixed(1) + "%"}
              >
                <Img
                  _hover={{ filter: "blur(1px)" }}
                  src={`/models/${i}-lh.png`}
                  w="calc(7*100%/27)"
                ></Img>
              </Tooltip>
              <Flex flexDirection="column" w="50%">
                <Tooltip
                  label={((data.player.chest / hits) * 100).toFixed(1) + "%"}
                >
                  <Img
                    _hover={{ filter: "blur(1px)" }}
                    src={`/models/${i}-chest.png`}
                  ></Img>
                </Tooltip>
                <Tooltip
                  label={((data.player.stomach / hits) * 100).toFixed(1) + "%"}
                >
                  <Img
                    _hover={{ filter: "blur(1px)" }}
                    src={`/models/${i}-belly.png`}
                  ></Img>
                </Tooltip>
              </Flex>
              <Tooltip
                label={((data.player.right_arm / hits) * 100).toFixed(1) + "%"}
              >
                <Img
                  _hover={{ filter: "blur(1px)" }}
                  src={`/models/${i}-rh.png`}
                  w="calc(7*100%/27)"
                ></Img>
              </Tooltip>
            </Flex>
          </Flex>

          <Flex flexDirection="row" justifyContent="center">
            <Tooltip
              label={((data.player.left_leg / hits) * 100).toFixed(1) + "%"}
            >
              <Img
                _hover={{ filter: "blur(1px)" }}
                src={`/models/${i}-ll.png`}
                w="calc(19*100%/54)"
              ></Img>
            </Tooltip>
            <Tooltip
              label={((data.player.right_leg / hits) * 100).toFixed(1) + "%"}
            >
              <Img
                _hover={{ filter: "blur(1px)" }}
                src={`/models/${i}-rl.png`}
                w="calc(19*100%/54)"
              ></Img>
            </Tooltip>
          </Flex>
        </Box>
        <Box w="50%">
          <PlayerWeapon player={data.player} />
        </Box>
      </Flex>
      <Flex flexDirection="column">
        {data.matches.length > 0 ? (
          <>
            <Text textAlign="center">{`您总共进行了${data.matches.length}场游戏`}</Text>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th textAlign="center">地图</Th>
                  <Th textAlign="center">k/d/a</Th>
                  <Th textAlign="center">比分</Th>
                  <Th textAlign="center">时间</Th>
                </Tr>
              </Thead>
              <Tbody>{pages}</Tbody>
            </Table>
            {cnt < matchCount ? (
              <Button
                variant="outline"
                w="-webkit-fit-content"
                ml="auto"
                onClick={() => setCnt(cnt + 5)}
              >
                更多比赛
              </Button>
            ) : null}
          </>
        ) : (
          <Text mx="auto">没有比赛记录</Text>
        )}
      </Flex>
      <Tabs mx="auto" w="100%" boxShadow="md" rounded="md" my="4">
        <TabList>
          <Tab>5E</Tab>
          <Tab>B5</Tab>
          <Tab>完美</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Card5e userid={data.player.steam} />
          </TabPanel>
          <TabPanel>
            <CardB5 userid={data.player.steam} />
          </TabPanel>
          <TabPanel>
            <CardWm userid={data.player.steam} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
export async function getStaticProps(context: any) {
  const res = await fetch(
    process.env.END_POINT + "/api/player/" + context.params.playerid
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
  const res = await fetch(process.env.END_POINT + "/api/player");
  const data = await res.json();
  const paths = data.players.map((player: any) => ({
    params: { playerid: cvt_64(player.steam) },
  }));
  return { paths, fallback: "blocking" };
}

export default Home;
