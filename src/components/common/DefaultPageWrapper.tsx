import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Content from "./Content";

interface IDefaultPageElProps {
  children: ReactNode;
}
export default function DefaultPageWrapper({ children }: IDefaultPageElProps) {
  return (
    <>
      <Header />
      <Content>
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          {children}
        </Box>
      </Content>
    </>
  );
}
