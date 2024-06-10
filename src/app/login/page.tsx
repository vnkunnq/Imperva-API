"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Divider,
  Flex,
  Image,
} from "@chakra-ui/react";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Encode the credentials
    const credentials = btoa(`${username}:${password}`);
    const authHeader = `Basic ${credentials}`;

    try {
      const response = await axios.post("/api/loginProxy", null, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure cookies are sent and received
      });

      if (response.status === 200) {
        // Handle successful login, store sessionId, etc.
        console.log("Login successful", response.data);
        // Store the session ID in local storage or a context for further use
        localStorage.setItem('sessionId', response.data.sessionId);
        router.push("/dashboard"); // Redirect to dashboard or another page
      } else {
        setError(response.data.message || "Login failed");
        // Reload the page
        window.location.reload();
      }
    } catch (err: any) {
      setError(
        err.response
          ? err.response.data.message
          : "An error occurred. Please try again."
      );
      // Reload the page
      window.location.reload();
    }
  };

  return (
    <Container maxW="1000px" maxH="1500px">
      <Box maxW="800px" mx="auto" mt={10} p={4} borderWidth={1}>
        <Flex>
          <Image
            w="300px"
            h="240px"
            src="/imperva-vector-logo.svg"
            alt="Imperva Logo"
          />
          <Divider orientation="vertical" mx={4} />
          <Box flex="1">
            <form onSubmit={handleLogin}>
              <FormControl id="username" mb={4} isRequired>
                <FormLabel textColor="black">Username</FormLabel>
                <Input
                  textColor="black"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" mb={4} isRequired>
                <FormLabel textColor="black">Password</FormLabel>
                <Input
                  textColor="black"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              {error && (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <Button
                w="20px"
                h="30px"
                type="submit"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
              {error && (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </form>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}
