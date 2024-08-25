import { StrictMode } from "react";
import RootPage from "./App.tsx";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import ReactDOM from "react-dom/client";

// Different pages here
import Forum from "./pages/forum/Forum.tsx";
import Profile from "./pages/profile/Profile.tsx";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
const projectId = import.meta.env.VITE_PROJECT_ID;

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as chains from "viem/chains";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Post } from "./pages/forum/components/Posts.tsx";

const queryClient = new QueryClient();
const config = getDefaultConfig({
	appName: "StackUp Forum",
	projectId: `${projectId}`,
	chains: [chains.sepolia, chains.arbitrum, chains.arbitrumSepolia],
	ssr: true,
});

const domNode = document.getElementById("root") || new HTMLElement(); // Or use as HTMLElement. See https://stackoverflow.com/a/55781571

ReactDOM.createRoot(domNode).render(
	<StrictMode>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider coolMode={true} modalSize="wide">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<RootPage />} />
							<Route path="/feed" element={<Forum />} />
							<Route path="/post" element={<Post />} />
							<Route path="/profile" element={<Profile />} />
						</Routes>
					</BrowserRouter>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>,
);
