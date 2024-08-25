import { StrictMode } from "react";
import RootPage from "./App.tsx";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import ReactDOM from "react-dom/client";

// Different pages here
import Forum from "./pages/forum/Forum.tsx";
import Profile from "./pages/profile/Profile.tsx";
import { Post } from "./pages/forum/components/Posts.tsx";

import { Routes, Route, BrowserRouter } from "react-router-dom";

// RainbowKit specific css
import "@rainbow-me/rainbowkit/styles.css";

// Web3
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";

// Utils
import { queryClientConfig, wagmiProviderConfig } from "./utils/web3-init";

const domNode = document.getElementById("root") || new HTMLElement(); // Or use as HTMLElement. See https://stackoverflow.com/a/55781571

ReactDOM.createRoot(domNode).render(
	<StrictMode>
		<WagmiProvider config={wagmiProviderConfig}>
			<QueryClientProvider client={queryClientConfig}>
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
