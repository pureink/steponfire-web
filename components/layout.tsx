import { Box, Flex, Text, Link } from "@chakra-ui/react";
import Head from 'next/head'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Head>
      <title>Step On Fire</title>
    </Head>
      <Box maxW="md" mx="auto">
        <Flex px="2" justifyContent="space-between" my="2">
          <Link href="/">
            <Text
              borderWidth="2px"
              borderColor="#f7c90a"
              rounded="md"
              textAlign="left"
              fontWeight="bold"
              fontSize="xl"
              bgGradient="linear(to-b,#f7c90a,#f35317)"
              bgClip="text"
            >
              Step On Fire
            </Text>
          </Link>
          <Flex>
            <Link href="/">
              <Text
                fontSize="lg"
                mr="4"
                bgGradient="linear(to-b,#f7c90a,#f35317)"
                bgClip="text"
              >
                玩家
              </Text>
            </Link>
            <Link href="/match">
              <Text
                fontSize="lg"
                bgGradient="linear(to-b,#f7c90a,#f35317)"
                bgClip="text"
              >
                比赛
              </Text>
            </Link>
          </Flex>
        </Flex>
        {children}
      </Box>
      <footer>
        <Box maxW="md" mx="auto" mt="4">
          <Box borderTop="1px" borderColor="gray.400" mx="4" py="4">
            <Text
              textAlign="center"
              fontFamily="-apple-system ”system-ui“"
              fontSize="sm"
            >
              © Pure Ink 2019 - 2022
            </Text>
          </Box>
        </Box>
      </footer>
    </>
  );
}
