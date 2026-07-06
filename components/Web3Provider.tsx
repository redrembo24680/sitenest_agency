'use client';

import React from 'react';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'SiteNest Agency',
  projectId: 'a52a3cc69c5e3170a4a9c68fe8d84422', // Fallback public project ID
  chains: [base],
  ssr: true,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#00f0ff', // matches var(--color-blue)
            accentColorForeground: '#0a0b14', // matches dark backgrounds
            borderRadius: 'medium',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
