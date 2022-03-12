import { Flex, Box, Link, chakra, Img, Text } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import formatDate from "../lib/time";
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
const mapColor: any = {
  mirage: "#ff9a1e",
  inferno: "blue.400",
  cache: "green.500",
  overpass: "#f35317",
  train: "#f7c90a",
  vertigo: "#9774e5",
  nuke: "#46b7c3",
  cbble: "#d580af",
  dust2: "#cbbfa5",
};
export function MatchCard({ match }: { match: Match }) {
  return (
    <Flex
      key={match.demoName}
      p={3}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        flexDirection="column"
        maxW="lg"
        w="lg"
        mx="auto"
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Box px="4" py="1" bg="rgba(0,0,0,0.8)">
          <Flex alignItems="center" justifyContent="space-between">
            <Img w="20" alt={match.map} src={`/map-badge/${match.map}.png`} />
            <Flex
              px="2"
              flex="1"
              minH="80px"
              my="2"
              textAlign="center"
              justifyContent="space-around"
              fontSize="xs"
              flexDirection="column"
            >
              {JSON.parse(match.highlight).map((h: Highlight) => (
                <Text key={h.name} color="white">
                  {h.user} - {h.name}
                </Text>
              ))}
            </Flex>

            <Flex
              flexDirection="column"
              flex="1"
              minH="80px"
              justifyContent="space-between"
            >
              <chakra.h1
                color="white"
                textAlign="center"
                fontSize="5xl"
                fontWeight=""
              >
                {match.team2Score}:{match.team3Score}
              </chakra.h1>
              <Link
                mx="auto"
                href={`/match/${match.demoName.substring(
                  0,
                  match.demoName.length - 4
                )}`}
                color="white"
              >
                {"更多信息->"}
              </Link>
            </Flex>
          </Flex>
        </Box>
        <Flex
          w="full"
          py="1"
          px="2"
          bg={mapColor[match.map]}
          justifyContent="space-between"
        >
          <chakra.p
            textAlign="center"
            fontSize="sm"
            maxH="50px"
            fontWeight="bold"
          >
            {formatDate(match.time)}
          </chakra.p>
          <Link
            href={`https://demo-1257876674.cos.ap-beijing.myqcloud.com/${match.demoName}`}
          >
            <chakra.button
              px="2"
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
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
