import {
  Collapse,
  Box,
  Flex,
  useDisclosure,
  Text,
  Button,
  Img,
  Link,
} from "@chakra-ui/react";
import { cvt_64 } from "../lib/steamidconvert";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
export function PlayerMatch({ player }: any) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex flexDirection="row" py="1">
        <Flex flex="1" flexDirection="row" h="6">
          <Img mr="2" src={player.avatar} rounded="md" />
          <Link href={"/player/" + cvt_64(player.steamId)}>{player.name}</Link>
          {JSON.parse(player.event).map((e: any) => (
            <Text
              key={e.name}
              mx="0.5"
              bg="blue.500"
              my="auto"
              fontSize="xs"
              fontWeight="bold"
              fontFamily="mono"
              color="white"
              rounded="md"
            >
              {e.name}
            </Text>
          ))}
        </Flex>
        <Text
          w="20"
          textAlign="center"
          fontSize="lg"
        >{`${player.kill}/${player.death}/${player.assist}`}</Text>
        <Text w="20" fontSize="lg" textAlign="center">
          {player.score}
        </Text>

        {isOpen ? (
          <ChevronUpIcon w="7" h="7" onClick={onToggle} />
        ) : (
          <ChevronDownIcon w="7" h="7" onClick={onToggle} />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Flex flexDirection="row" w="full">
          <Box w="25%">
            <Box bg="gray.100" mx="1" rounded="md" textAlign="center">
              <Text>
                {(
                  parseFloat((player.headshot / player.kill).toFixed(2)) * 100
                ).toFixed(0)}
                %
              </Text>
              <Text fontSize="xs">爆头率</Text>
            </Box>
          </Box>
          <Box w="25%">
            <Box bg="gray.100" mx="1" rounded="md" textAlign="center">
              <Text>
                {player.firstKIll}/{player.firstDeath}
              </Text>
              <Text fontSize="xs">首杀/死</Text>
            </Box>
          </Box>
          <Box w="25%">
            <Box bg="gray.100" mx="1" rounded="md" textAlign="center">
              <Text>
                {player.enemyFlashDuration.toFixed(1) +
                  "/" +
                  player.teamFlashDuration.toFixed(1)}
              </Text>
              <Text fontSize="xs">闪敌/友</Text>
            </Box>
          </Box>
          <Box w="25%">
            <Box bg="gray.100" mx="1" rounded="md" textAlign="center">
              <Text>{(player.damage / player.totalRound).toFixed(1)}</Text>
              <Text fontSize="xs">ADR</Text>
            </Box>
          </Box>
        </Flex>
        <Flex flexDirection="row" mt="1">
          <Box w="25%">
            <Box bg="gray.100" mx="1" rounded="md" textAlign="center">
              <Text>
                {(player.liveTime / player.totalRound).toFixed(1) + "s"}
              </Text>
              <Text fontSize="xs">平均存活时间</Text>
            </Box>
          </Box>
          <Box w="25%">
            <Box bg="gray.100" mx="1" rounded="md" textAlign="center">
              <Text>{player.utilityDamage}</Text>
              <Text fontSize="xs">道具伤害</Text>
            </Box>
          </Box>
          <Box w="25%">
            <Box bg="gray.100" mx="1" rounded="md" textAlign="center">
              <Text>{JSON.parse(player.multiKill).join("/")}</Text>
              <Text fontSize="xs">多杀 2/3/4/5</Text>
            </Box>
          </Box>
          <Box w="25%">
            <Box bg="gray.100" mx="1" rounded="md" textAlign="center">
              <Text>{JSON.parse(player.clutch).join("/")}</Text>
              <Text fontSize="xs">残局 2/3/4/5</Text>
            </Box>
          </Box>
        </Flex>
      </Collapse>
    </>
  );
}
