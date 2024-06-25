'use client';

import CreateAlias from "@/components/ImportCsv/CreateAlias";
import CreateReverseProxyIP from "@/components/ImportCsv/CreateReverseProxyIP";
import CreateWebService from "@/components/ImportCsv/CreateWebService";
import CreateInboundRules from "@/components/ImportCsv/CreateInboundRules";
import CreateServerGroup from "@/components/ImportCsv/CreateServerGroup";
import CreateSite from "@/components/ImportCsv/CreateSite";
import { Box, Center, Text, Flex, Image, IconButton, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [showNestedButtons, setShowNestedButtons] = useState(false);

  const handleLogout = async () => {
    router.push('/login');
  };

  const handleToggleNestedButtons = () => {
    setShowNestedButtons(prev => !prev);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" position="relative">
      <IconButton
        colorScheme="red"
        icon={<FiLogOut />}
        aria-label="Logout"
        position="absolute"
        top={4}
        right={4}
        size="lg"
        onClick={handleLogout}
      />
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
        h="auto"
        borderWidth="1px"
        borderRadius="10"
        borderColor="black"
        overflow="hidden"
        alignItems="center"
        p={4}
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
          <Button
            colorScheme="blue"
            _hover={{ bg: 'grey' }}
            w="170px"
            textColor="white"
            borderWidth="1px"
            borderColor="grey"
            onClick={handleToggleNestedButtons}
          >
            Create New Site
          </Button>
          {showNestedButtons && (
            <>
              <CreateSite buttonText="Create Site" />
              <CreateServerGroup buttonText="Create Server Group" />
              <CreateWebService buttonText="Create Web Service" />
            </>
          )}
          <CreateInboundRules buttonText="Create Inbound Rules" />
        </Flex>
      </Box>
    </Flex>
  );
}
