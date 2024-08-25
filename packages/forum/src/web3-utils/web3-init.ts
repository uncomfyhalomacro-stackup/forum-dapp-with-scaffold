const projectId = import.meta.env.VITE_PROJECT_ID;

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import * as chains from "viem/chains";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const config = getDefaultConfig({
	appName: "StackUp Forum",
	projectId: `${projectId}`,
	chains: [chains.sepolia, chains.arbitrum, chains.arbitrumSepolia],
	ssr: true,
});

export { config as wagmiProviderConfig, queryClient as queryClientConfig };
