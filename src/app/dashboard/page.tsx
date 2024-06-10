'use client';

import CreateAlias from "@/components/ImportCsv/CreateAlias";
import CreateReverseProxyIP from "@/components/ImportCsv/CreateReverseProxyIP";
import CreateWebService from "@/components/ImportCsv/CreateWebService";
import CreateInboundRules from "@/components/ImportCsv/CreateInboundRules";
import {
  Box,
  Center,
  Text,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";


export default async function Dashboard() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" position="relative">
      <Image
        src="/imperva-vector-logo.svg"
        alt="Imperva Logo"
        position="absolute"
        top={-55}
        left={4}
        boxSize="170px"
      />

      <Box
        w="400px"
        h="400px"
        borderWidth="1px"
        borderRadius="10"
        borderColor="black"
        overflow="hidden"
        alignItems="center"
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <Center>
            <Text color="black" fontSize="35px" p={4}>
              Modules
            </Text>
          </Center>

          <CreateReverseProxyIP buttonText="Create IP Address" />
          <CreateAlias buttonText="Create Alias" />
          <CreateWebService buttonText="Create Web Service" />
          <CreateInboundRules buttonText="Create Inbound Rules" />
        </Flex>
      </Box>
    </Flex>
  );
}
