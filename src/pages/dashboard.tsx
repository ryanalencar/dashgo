import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { withSSRAuth } from "../utils/withSSRAuth";

import Content from "../components/common/Content";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { setupAPIClient } from "../services/api";
import { destroyCookie } from "nookies";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    foreColor: theme.colors.gray[500],
  },
  grid: { show: false },
  dataLabels: { enabled: false },
  tooltip: {
    theme: "dark",
    x: { show: false },
  },
  xaxix: {
    type: "numeric",
    axisBorder: { color: theme.colors.gray[600] },
    axisTicks: { color: theme.colors.gray[600] },
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
const series = [
  {
    name: "inscritos",
    data: [31, 120, 19, 150, 123, 124, 50],
  },
];

export default function DashBoard() {
  return (
    <>
      <Header />
      <Content>
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          style={{ alignContent: "flex-start" }}
        >
          <Box p={["4", "8"]} pb="4" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
          <Box p={["4", "8"]} pb="4" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Content>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/me");

  return {
    props: {},
  };
});
