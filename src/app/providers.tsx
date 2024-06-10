"use client";

import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
  session?: any; // Make session optional
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </SessionProvider>
  );
}
