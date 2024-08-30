const projectId = import.meta.env.VITE_PROJECT_ID;
const deployedContractAddress = import.meta.env.VITE_DEPLOYED_CONTRACT;

import { abi } from "../contracts/Forum.json";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
	arbitrum,
	arbitrumSepolia,
	sepolia,
	base,
	mainnet,
} from "@wagmi/core/chains";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const rainbowConfig = getDefaultConfig({
	appName: "StackUp Forum",
	projectId: `${projectId}`,
	chains: [arbitrum, arbitrumSepolia, sepolia, base, mainnet],
	ssr: false,
});

const client = rainbowConfig.getClient();

export {
	abi,
	deployedContractAddress,
	rainbowConfig,
	client,
	queryClient as queryClientConfig,
};
