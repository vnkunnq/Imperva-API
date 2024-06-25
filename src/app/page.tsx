"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, FormControl, FormLabel, Input, Alert, AlertIcon, Flex } from "@chakra-ui/react";

export default function IPConfigPage() {
  const [ip, setIP] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = () => {
    if (!ip || !port) {
      setError("IP and Port are required");
      return;
    }

    // Save IP and Port to localStorage
    localStorage.setItem("apiIP", ip);
    localStorage.setItem("apiPort", port);

    // Navigate to login page
    router.push("/login");
  };

  return (
    <Container maxW="sm" centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" w="100%" mt={10}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <FormControl id="ip" mb={4} isRequired>
            <FormLabel>API IP</FormLabel>
            <Input type="text" value={ip} onChange={(e) => setIP(e.target.value)} />
          </FormControl>
          <FormControl id="port" mb={4} isRequired>
            <FormLabel>API Port</FormLabel>
            <Input type="text" value={port} onChange={(e) => setPort(e.target.value)} />
          </FormControl>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Button type="submit" colorScheme="blue" width="full">
            Save and Continue to Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
