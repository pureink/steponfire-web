import type { NextPage } from "next";
import useSWR from "swr";
import { Box, Img, Flex, Tooltip } from "@chakra-ui/react";
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
const Home: NextPage = () => {
  const i = "t2";
  const { data, error } = useSWR("/api/player", fetcher);
  if (data)
    return (
      <>
        <Flex maxW="md" mx="auto" w="100%" px="4">
          <Box w="50%">
            <Flex flexDirection="column">
              <Tooltip label="39%">
                <Img src={`/models/${i}-head.png`} w="100%"></Img>
              </Tooltip>
              <Flex flexDirection="row">
                <Img src={`/models/${i}-lh.png`} w="calc(7*100%/27)"></Img>
                <Flex flexDirection="column" w="50%">
                  <Img src={`/models/${i}-chest.png`}></Img>
                  <Img src={`/models/${i}-belly.png`}></Img>
                </Flex>
                <Img src={`/models/${i}-rh.png`} w="calc(7*100%/27)"></Img>
              </Flex>
            </Flex>

            <Flex flexDirection="row" justifyContent="center">
              <Img src={`/models/${i}-ll.png`} w="calc(19*100%/54)"></Img>
              <Img src={`/models/${i}-rl.png`} w="calc(19*100%/54)"></Img>
            </Flex>
          </Box>
          <Box w="50%">
            {data.players.map((p: any) => (
              <Box>
                <Img src={p.avatar} display="inline-block"></Img>
                <p>{p.name}</p>
              </Box>
            ))}
          </Box>
        </Flex>
        <Box>
          <p>111</p>
        </Box>
      </>
    );
  else {
    return <p>loading</p>;
  }
};

export default Home;
