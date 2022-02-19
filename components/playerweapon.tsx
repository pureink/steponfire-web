import { Divider, Flex, Img, Text } from "@chakra-ui/react";
const weapons = [
  "knife",
  "glock",
  "hkp2000",
  "usp_silencer",
  "p250",
  "deagle",
  "elite",
  "fiveseven",
  "tec9",
  "cz75a",
  "revolver",
  "nova",
  "xm1014",
  "mag7",
  "sawedoff",
  "bizon",
  "mac10",
  "mp9",
  "mp7",
  "ump45",
  "p90",
  "galilar",
  "ak47",
  "scar20",
  "famas",
  "m4a1",
  "m4a1_silencer",
  "aug",
  "ssg08",
  "sg556",
  "awp",
  "g3sg1",
  "m249",
  "negev",
  "taser",
  "mp5sd",
];

export function PlayerWeapon({ player }: { player: any }) {
  let weapon_array = [];
  for (let weapon in player) {
    if (weapons.includes(weapon)) {
      weapon_array.push({ weapon: weapon, value: player[weapon] });
    }
  }
  weapon_array = weapon_array
    .filter((e) => e.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
  return (
    <Flex flexDirection="column" border="1px" rounded="md">
      <Flex justifyContent="space-between" textAlign="center">
        <Text w="60%">武器</Text>
        <Text w="40%">击杀数</Text>
      </Flex>
      <Divider />
      {weapon_array.map((weapon) => (
        <Flex key={weapon.weapon} justifyContent="space-between">
          <Img
          mx="auto"
            h="7"
            src={`/weapons/${weapon.weapon}.png`}
            transform="rotateY(180deg)"
          />
          <Text w="40%" fontSize="lg" textAlign="center">{weapon.value}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
