const projectId = import.meta.env.VITE_PROJECT_ID;

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createConfig } from "wagmi";
import * as chains from "viem/chains";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const rainbowConfig = getDefaultConfig({
	appName: "StackUp Forum",
	projectId: `${projectId}`,
	chains: [chains.sepolia, chains.arbitrum, chains.arbitrumSepolia],
	ssr: true,
});


export { rainbowConfig, queryClient as queryClientConfig };
