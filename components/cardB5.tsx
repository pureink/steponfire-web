import useSWR from "swr";
import { Text, Image, Flex } from "@chakra-ui/react";
import { StatHelpText, StatArrow } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
function b5rank(rank: string) {
  if (rank === "-") {
    return "0";
  } else {
    const number = parseInt(rank);
    if (number < 600) {
      return "iron";
    } else if (number < 1000) {
      return "bronze";
    } else if (number < 1300) {
      return "silver";
    } else if (number < 1600) {
      return "gold";
    } else if (number < 1800) {
      return "platinum";
    } else if (number < 2000) {
      return "diamond";
    } else {
      return "master";
    }
  }
}
export function CardB5({ userid }: { userid: string }) {
  const { data } = useSWR(`/api/third/b5?steamId=${userid}`, fetcher);
  if (!data) {
    return <p>loading</p>;
  } else {
    if (data.result.matches.length > 0) {
      return (
        <>
          <Flex>
            <Flex flexDirection="column" w="25%" my="auto">
              <Flex flexDirection="column">
                <Image
                  mx="auto"
                  rounded="md"
                  alt="b5_avatar"
                  w="8"
                  src={data.result.player_info.avatar}
                />
                <Text textAlign="center">
                  {data.result.player_info.nickname}
                </Text>
              </Flex>
              <Flex mx="auto">
                <Image
                  alt="b5_elo_avatar"
                  w="8"
                  src={
                    "https://img.b5csgo.com.cn/b5csgo/rank/" +
                    b5rank(data.result.career.header[0].value) +
                    ".png"
                  }
                />
                <Text my="auto">{data.result.career.header[0].value}</Text>
              </Flex>
              <Text textAlign="center">
                {data.result.career.header[1].value}名
              </Text>
            </Flex>

            <Flex flexWrap="wrap" justifyContent="space-between" w="75%">
              {data.result.career.overview.map((item: any) => (
                <Flex
                  key={item.desc}
                  border="1px"
                  rounded="md"
                  flexDirection="column"
                  w="25%"
                >
                  <Text fontSize="xs" textAlign="center">
                    {item.desc}
                  </Text>
                  <Text textAlign="center" fontSize="sm">
                    {item.value}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Table variant="striped" size="xs">
            <Thead>
              <Tr fontSize="xs">
                <Th fontFamily="sans-serif" textAlign="center">
                  比赛结果
                </Th>
                <Th fontFamily="sans-serif" textAlign="center">
                  比分
                </Th>
                <Th fontFamily="sans-serif" textAlign="center">
                  {" "}
                  模式
                </Th>
                <Th fontFamily="sans-serif" textAlign="center">
                  <Flex flexDirection="column">
                    <Text>rating</Text>
                    <Text>K/A/D</Text>
                  </Flex>
                </Th>
                <Th fontFamily="sans-serif" textAlign="center">
                  分数
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.result.matches.map((match: any) => (
                <Tr key={match.match_id}>
                  <Td textAlign="center">
                    {match.win === 2 ? (
                      <Text color="gray.600">平</Text>
                    ) : match.win === 1 ? (
                      <Text color="orange">胜</Text>
                    ) : (
                      <Text color="gray.400">负</Text>
                    )}
                  </Td>
                  <Td textAlign="center">{match.score}</Td>
                  <Td fontFamily="serif" fontSize="xs" textAlign="center">
                    <Flex flexDirection="column">
                      <Text bg={match.map_color} mx="auto">
                        {match.map_name}
                      </Text>
                      <Text mx="auto">{match.class_name}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex flexDirection="column">
                      <Text fontSize="sm" textAlign="center">
                        {match.rating}
                      </Text>
                      <Text textAlign="center">{`${match.kill}/${match.death}/${match.assist}`}</Text>
                    </Flex>
                  </Td>
                  <Td textAlign="center">
                    <Flex flexDirection="column">
                      <Text>{match.elo}</Text>
                      {match.elo_change != "0" ? (
                        <StatHelpText fontSize="sm">
                          <StatArrow
                            w="3"
                            type={
                              parseInt(match.elo_change) > 0
                                ? "increase"
                                : "decrease"
                            }
                          />
                          {match.elo_change}
                        </StatHelpText>
                      ) : null}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      );
    } else {
      return null;
    }
  }
}
