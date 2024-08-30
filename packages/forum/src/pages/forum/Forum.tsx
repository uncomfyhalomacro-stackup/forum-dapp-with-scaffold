import { Link, useLoaderData } from "react-router-dom";
import { useAccount } from "wagmi";
import {
	readContract,
	simulateContract,
	waitForTransactionReceipt,
	writeContract,
} from "wagmi/actions";
import {
	rainbowConfig as config,
	abi,
	deployedContractAddress,
} from "../../web3-utils/web3-init";
import { useState } from "react";
import type { PostDetails } from "./components/Posts";
import type { Address } from "viem";

// loader function for the list of posts in the forum
const forumLoader = async () => {
	const posts: PostDetails[] = [];
	const totalPostCount: bigint = (await readContract(config, {
		abi: abi,
		address: deployedContractAddress,
		functionName: "postIdIncrement",
	})) as bigint;

	for (let i = 1; i < totalPostCount; i++) {
		const post: PostDetails = (await readContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "getPost",
			args: [i],
		})) as PostDetails;

		posts.push(post);
	}

	return posts;
};

const ShareableForumItemComponent = ({
	postId,
	likes,
}: { postId: bigint; likes: bigint }) => {
	const [likeCounter, setLikeCounter] = useState(likes);

	const handleUpvote = async () => {
		const { result } = await simulateContract(config, {
			address: deployedContractAddress,
			abi: abi,
			functionName: "upVotePost",
			args: [postId],
		});

		console.log(result);

		const upvoteTxHash = await writeContract(config, {
			address: deployedContractAddress,
			abi: abi,
			functionName: "upVotePost",
			args: [postId],
		});

		const transaction = await waitForTransactionReceipt(config, {
			hash: upvoteTxHash,
		});

		if (transaction.status === "reverted") {
			alert("Upvoting post failed! Transaction was reverted due to an error!");
			return;
		}

		const post: PostDetails = (await readContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "getPost",
			args: [postId],
		})) as PostDetails;

		setLikeCounter(post.likes);
	};

	const handleDownVote = async () => {
		const { result } = await simulateContract(config, {
			address: deployedContractAddress,
			abi: abi,
			functionName: "downVotePost",
			args: [postId],
		});

		console.log(result);

		const downvoteTxHash = await writeContract(config, {
			address: deployedContractAddress,
			abi: abi,
			functionName: "downVotePost",
			args: [postId],
		});

		const transaction = await waitForTransactionReceipt(config, {
			hash: downvoteTxHash,
		});

		if (transaction.status === "reverted") {
			alert(
				"Downvoting post failed! Transaction was reverted due to an error!",
			);
			return;
		}

		const post: PostDetails = (await readContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "getPost",
			args: [postId],
		})) as PostDetails;

		setLikeCounter(post.likes);
	};

	return (
		<>
			<div
				style={{
					display: "inline-block",
				}}
			>
				Number of upvotes {likeCounter.toString()}
				<button type="button" onClick={handleUpvote}>
					⏫
				</button>
				<button type="button" onClick={handleDownVote}>
					⏬
				</button>
			</div>
		</>
	);
};

// ForumItem is just one Post
const ForumItem = ({
	owner,
	title,
	description,
	timestamp,
}: {
	owner: Address;
	postId: bigint;
	title: string;
	description: string;
	likes: bigint;
	timestamp: bigint;
}) => {
	const readableDate = new Date(Number(timestamp) * 1000);

	return (
		<div>
			<article>
				<h1>
					{title} | Published on{" "}
					<time dateTime={readableDate.toDateString()}>
						{readableDate.toDateString()}
					</time>
				</h1>
				<h2>Posted by {owner}</h2>
				<p>{description}</p>
			</article>
		</div>
	);
};

const Forum = () => {
	const account = useAccount();
	const posts = useLoaderData() as PostDetails[];
	const template = (
		<div>
			{posts.map((post) => (
				<>
					<Link to={"/posts/".concat(post.id.toString())} key={post.id}>
						<ForumItem
							owner={post.owner}
							postId={post.id}
							title={post.title}
							description={post.description}
							likes={post.likes}
							timestamp={post.timestamp}
						/>
					</Link>
					<ShareableForumItemComponent
						key={post.id}
						postId={post.id}
						likes={post.likes}
					/>
				</>
			))}
		</div>
	);

	if (account.isConnected) {
		return (
			<main>
				<h2>
					<Link to="/post">Post</Link> something or start a poll!
				</h2>
				<h3>
					<Link to="/">Go back to home page</Link>
				</h3>
				{template}
			</main>
		);
	}
	return (
		<main>
			<h2>Your account is not connected. You can't post yet.</h2>
			<Link to="/">Go back to home page</Link>
		</main>
	);
};

export default Forum;
export { forumLoader, ForumItem, ShareableForumItemComponent };
