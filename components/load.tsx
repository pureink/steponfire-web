import { Box } from "@chakra-ui/react";
const Typical: any = require("react-typical");
export function Load() {
  return (
    <Box mx="auto" w="24" mt="40vh">
      <Typical
        steps={["Loading", 500, "Loading...", 250]}
        loop={Infinity}
        wrapper="p"
      />
    </Box>
  );
}
