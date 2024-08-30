import { StrictMode } from "react";
import RootPage from "./App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";

// Different pages here
import Forum, { forumLoader } from "./pages/forum/Forum.tsx";
import Profile from "./pages/profile/Profile.tsx";
import Post, {
	loaderGetPostById,
	postActionHandler,
	PostFailurePage,
	PostRouteChangeable,
	PostSuccessPage,
	StandAlonePostPage,
} from "./pages/forum/components/Posts.tsx";

import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";

// RainbowKit specific css
import "@rainbow-me/rainbowkit/styles.css";

// Web3
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";

// Utils
import { queryClientConfig, rainbowConfig } from "./web3-utils/web3-init.ts";
import { Navbar } from "./components/Navbar.tsx";
import Comment, {
	commentActionHandler,
	CommentFailurePage,
	CommentSuccessPage,
	loaderGetPostId,
} from "./pages/forum/components/Comment.tsx";

const domNode = document.getElementById("root") || new HTMLElement(); // Or use as HTMLElement. See https://stackoverflow.com/a/55781571

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
	},
	{
		path: "/forum",
		element: <Forum />,
		loader: forumLoader,
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
			{
				path: "failure",
				element: <PostFailurePage />,
			},
		],
	},
	{
		path: "/posts",
		element: <StandAlonePostPage />,
		loader: () => {
			// Hack?
			if (
				window.location.pathname.endsWith("posts") ||
				window.location.pathname.endsWith("posts/")
			) {
				return redirect("/");
			}
			return null;
		},
		children: [
			{
				path: ":id",
				element: <PostRouteChangeable />,
				loader: loaderGetPostById,
				children: [
					{
						path: "/posts/:id/comment",
						element: <Comment />,
						loader: loaderGetPostId,
						action: commentActionHandler,
						children: [
							{
								path: "success",
								element: <CommentSuccessPage />,
							},
							{
								path: "failure",
								element: <CommentFailurePage />,
							},
						],
					},
				],
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
		<WagmiProvider config={rainbowConfig}>
			<QueryClientProvider client={queryClientConfig}>
				<RainbowKitProvider coolMode={true} modalSize="wide">
					<Navbar />
					<RouterProvider router={router} />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>,
);
