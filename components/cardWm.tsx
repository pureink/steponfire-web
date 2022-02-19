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
export function CardWm({ userid }: { userid: string }) {
  const { data } = useSWR(`/api/third/wm?steamId=${userid}`, fetcher);
  if (!data) {
    return <p>loading</p>;
  } else {
    if (data.result.is_found === 1) {
      return (
        <>
          <Flex>
            <Flex flexDirection="column" w="25%" my="auto">
              <Flex flexDirection="column">
                <Image
                  mx="auto"
                  rounded="md"
                  alt="wm_avatar"
                  w="8"
                  src={data.result.avatar}
                />
                <Text my="auto" textAlign="center">
                  {data.result.nickname}
                </Text>
              </Flex>
              <Flex mx="auto">
                <Image
                  alt="wm_elo_avatar"
                  w="8"
                  src={data.result.rank_info.img}
                />
                <Text my="auto">{data.result.rank_info.score}</Text>
              </Flex>
              <Text textAlign="center">
                {data.result.rank_info.rank.substring(1)}名
              </Text>
            </Flex>

            <Flex flexWrap="wrap" justifyContent="space-between" w="75%">
              {data.result.tags_info.map((item: any) => (
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
          <Flex></Flex>
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
              {data.result.matches.slice(0, 5).map((match: any) => (
                <Tr key={match.match_id}>
                  <Td textAlign="center">
                    {match.win_type === -1 ? (
                      <Text color="gray.400">负</Text>
                    ) : match.win_type === 1 ? (
                      <Text color="orange">胜</Text>
                    ) : (
                      <Text color="gray.600">平</Text>
                    )}
                  </Td>
                  <Td textAlign="center">
                    <Flex flexDirection="column">
                      <Text>
                        {" "}
                        {`${match.match_score_result[0]}:${match.match_score_result[1]}`}
                      </Text>
                      <Flex justifyContent="center">
                        {match.higitling_tags.map(
                          (item: any, index: number) => (
                            <Image
                              h="3"
                              src={item.img}
                              key={index}
                              alt={item.name}
                            />
                          )
                        )}
                      </Flex>
                    </Flex>
                  </Td>
                  <Td fontFamily="serif" fontSize="xs" textAlign="center">
                    <Flex flexDirection="column">
                      <Text bg={match.map_color} mx="auto">
                        {match.map_name}
                      </Text>
                      <Text mx="auto">{match.match_type}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex flexDirection="column">
                      <Text fontSize="sm" textAlign="center">
                        {match.pw_rating}
                      </Text>
                      <Text textAlign="center">{`${match.kill}/${match.death}/${match.assist}`}</Text>
                    </Flex>
                  </Td>
                  <Td textAlign="center">
                    <Flex justifyContent="center">
                      <Image
                        my="auto"
                        src={match.mm_score_level_img}
                        h="4"
                        alt="rank"
                      />
                      <Text>{match.mm_score}</Text>
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
