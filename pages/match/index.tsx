import { MatchCard } from "../../components/matchcard";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
import React from "react";
import { useState } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import Layout from "../../components/layout";
function Page({ index }: { index: number }) {
  const { data } = useSWR(`/api/match?page=${index}`, fetcher);

  if (!data) return <Text textAlign="center">Loading...</Text>;

  return data.matches.map((m: any) => <MatchCard match={m} key={m.demoName} />);
}
function Match({ data }: { data: any }) {
  const [pageIndex, setPageIndex] = useState(1);
  const pages = data.matches.map((m: any) => (
    <MatchCard match={m} key={m.demoName} />
  ));
  for (let i = 2; i < pageIndex; i++) {
    pages.push(<Page index={i} key={i} />);
  }

  return (
    <Layout>
      <Box>
        <Text textAlign="center">总进行{data.count}场比赛</Text>
        {pages}

        <Box textAlign="center">
          {pageIndex * 6 < data.count ? (
            <Button onClick={() => setPageIndex(pageIndex + 1)}>更多比赛</Button>
          ) : null}
        </Box>
      </Box>
    </Layout>
  );
}
export async function getStaticProps() {
  const res = await fetch(process.env.END_POINT+"/api/match");
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
export default Match;
