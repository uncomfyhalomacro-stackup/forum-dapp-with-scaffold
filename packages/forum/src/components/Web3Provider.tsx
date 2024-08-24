import { ConnectButton, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { arbitrum, sepolia } from "viem/chains";
import { WagmiProvider } from "wagmi";

const projectID = process.env.REACT_APP_PROJECT_ID;

const config = getDefaultConfig({
    appName: "StackUp Forum Wallet",
    projectId: `${projectID}`,
    chains: [arbitrum, sepolia],
    ssr: true
})

const queryClient = new QueryClient();

const Web3 = () => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <ConnectButton />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}


export default Web3;
