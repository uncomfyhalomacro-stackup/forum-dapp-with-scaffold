import { StrictMode } from "react";
import RootPage from "./App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";

// Different pages here
import Forum from "./pages/forum/Forum.tsx";
import Profile from "./pages/profile/Profile.tsx";
import {
	Post,
	postActionHandler,
	PostSuccessPage,
} from "./pages/forum/components/Posts.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// RainbowKit specific css
import "@rainbow-me/rainbowkit/styles.css";

// Web3
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";

// Utils
import {
	queryClientConfig,
	wagmiProviderConfig,
} from "./web3-utils/web3-init.ts";
import { Navbar } from "./components/Navbar.tsx";

const domNode = document.getElementById("root") || new HTMLElement(); // Or use as HTMLElement. See https://stackoverflow.com/a/55781571

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
	},
	{
		path: "/feed",
		element: <Forum />,
	},
	{
		path: "/post",
		element: <Post />,
		action: postActionHandler,
		children: [
			{
				path: "success",
				element: <PostSuccessPage />,
			},
		],
	},
	{
		path: "/profile",
		element: <Profile />,
	},
]);
ReactDOM.createRoot(domNode).render(
	<StrictMode>
		<WagmiProvider config={wagmiProviderConfig}>
			<QueryClientProvider client={queryClientConfig}>
				<RainbowKitProvider coolMode={true} modalSize="wide">
					<Navbar />
					<RouterProvider router={router} />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>,
);
