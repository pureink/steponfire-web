import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { Img } from "@chakra-ui/react";
import useSWR, { SWRConfig } from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
type Match = {
  id: number;
  highlight: string;
  demoName: string;
  map: string;
  team2Score: number;
  team3Score: number;
  time: string;
};
type Highlight = {
  num: number;
  name: string;
  user: string;
};
import React from "react";
import { useState } from "react";
import { chakra, Box, Flex, useColorModeValue, Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
const Match: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(`/api/match?page=${pageIndex}`, fetcher);
  if (!data) return <p>loading</p>;
  return (
    <>
      <h1>match</h1>
      <div>
        {data.matches.map((m: Match) => (
          <Flex
            p={3}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              maxW="lg"
              w="lg"
              mx="auto"
              bg="#0C103E"
              shadow="lg"
              rounded="lg"
              overflow="hidden"
            >
              <Box
                w={1 / 3}
                bgSize="cover"
                position="relative"
                style={{
                  backgroundImage: `url('/map/${m.map}.jpg')`,
                }}
              >{m.map}
              </Box>

              <Box w={2 / 3} px="4" py="1">
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex
                    flex="1"
                    minH="80px"
                    mt="4"
                    justifyContent="space-around"
                    color="white"
                    fontSize="xs"
                    flexDirection="column"
                  >
                    {JSON.parse(m.highlight).map((h: Highlight) => (
                      <p>
                        {h.user} - {h.name}
                      </p>
                    ))}
                  </Flex>
                  <Flex
                    flexDirection="column"
                    flex="1"
                    minH="80px"
                    justifyContent="space-between"
                  >
                    <chakra.h1
                    my="4"
                      textAlign="center"
                      fontSize="4xl"
                      fontWeight="formal"
                      color="white"
                    >
                      {m.team2Score}:{m.team3Score}
                    </chakra.h1>
                    <chakra.button
                      px={2}
                      py={1/2}
                      ml="auto"
                      bg="white"
                      fontSize="xs"
                      color="gray.900"
                      fontWeight="bold"
                      rounded="lg"
                      _hover={{
                        bg: "gray.200",
                      }}
                      _focus={{
                        bg: "gray.400",
                      }}
                    >
                      DEMO
                      <DownloadIcon />
                    </chakra.button>
                  </Flex>
                </Flex>
                <chakra.p
                  textAlign="right"
                  mt={2}
                  fontSize="xs"
                  maxH="50px"
                  color="white"
                  fontWeight="bold"
                >
                  {new Date(m.time).toLocaleString()}
                </chakra.p>
              </Box>
            </Flex>
          </Flex>
        ))}
      </div>
      {pageIndex > 1 ? (
        <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous</Button>
      ) : null}
      {pageIndex * 6 < data.count ? (
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next</Button>
      ) : null}
    </>
  );
};

export default Match;
