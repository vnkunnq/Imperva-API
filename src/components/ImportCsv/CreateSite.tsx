"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  VStack,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";

interface ImportCsvModalProps {
  buttonText: string;
}

export default function CreateSite({ buttonText }: ImportCsvModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [isValidFile, setIsValidFile] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    setSessionId(storedSessionId);
  }, [isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'csv' || fileExtension === 'xlsx') {
        setIsValidFile(true);
        setFile(selectedFile);
      } else {
        setIsValidFile(false);
        setFile(null);
      }
    }
  };

  const handleClose = () => {
    setFile(null);
    setIsValidFile(true);
    setError(null);
    onClose();
  };

  const handleImport = async () => {
    if (!file) return;

    const apiIP = localStorage.getItem('apiIP');
    const apiPort = localStorage.getItem('apiPort');

    if (!apiIP || !apiPort) {
      setError("API IP and Port are not set.");
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const data = results.data;
        for (const row of data as any[]) {
          const { siteName, ...body } = row;

          // Debugging: Check extracted values
          console.log('Extracted siteName:', siteName);

          if (!siteName) {
            setError('CSV row missing siteName');
            return;
          }

          const url = `/api/createSite?siteName=${encodeURIComponent(siteName)}`;

          try {
            const response = await axios.post(url, body, {
              headers: {
                "Content-Type": "application/json",
                "Cookie": `JSESSIONID=${sessionId}`,
                "x-api-ip": apiIP,
                "x-api-port": apiPort,
              },
              withCredentials: true,
            });

            if (response.status === 200) {
              toast({
                title: "Import Successful",
                description: "The CSV file has been imported successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Import Failed",
                description: response.data.message || `Error: ${response.status}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          } catch (error: any) {
            if (error.response) {
              setError(`Error: ${error.response.data.message}`);
              toast({
                title: "Import Failed",
                description: `Error: ${error.response.data.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } else {
              setError("An unknown error occurred.");
              toast({
                title: "Import Failed",
                description: "An unknown error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
            break; // Stop further processing if there's an error
          }
        }
        if (!error) {
          handleClose();
        }
      },
    });
  };

  return (
    <>
      <Button
        _hover={{ bg: 'grey' }}
        w="150px"
        textColor="black"
        borderWidth="1px"
        borderColor="grey"
        onClick={onOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
              />
              {!isValidFile && (
                <Alert status="error">
                  <AlertIcon />
                  Not a CSV or XLSX file
                </Alert>
              )}
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleImport}
              isDisabled={!file}
            >
              Import
            </Button>
            <Button colorScheme="red" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
