// See https://reactrouter.com/en/main/components/form
// Since we are using typescript, we cannot infer the types correctly
// Relevant resource https://github.com/remix-run/remix/blob/main/decisions/0003-infer-types-for-useloaderdata-and-useactiondata-from-loader-and-action-via-generics.md
// See also https://github.com/remix-run/remix/discussions/8616 and https://github.com/remix-run/react-router/discussions/9792
import {
	Link,
	Form,
	useActionData,
	redirect,
	type ActionFunctionArgs,
	Outlet,
	useParams,
	useLoaderData,
	type Params,
	useNavigate,
} from "react-router-dom";
import { useAccount } from "wagmi";
import { rainbowConfig as config } from "../../../web3-utils/web3-init";
import {
	getAccount,
	readContract,
	simulateContract,
	waitForTransactionReceipt,
	writeContract,
} from "wagmi/actions";
import { abi, deployedContractAddress } from "../../../web3-utils/web3-init.ts";
import { PollStub } from "./Polls.tsx";
import { ForumItem, ShareableForumItemComponent } from "../Forum.tsx";

export type PostStatus = {
	error: string;
};
// Band-aid https://stackoverflow.com/questions/75740241/what-type-to-declare-for-useloaderdata-and-where
export type PostActionData = {
	status: PostStatus | null;
};

// struct Post {
// 	uint256 id;
// 	string title;
// 	string description;
// 	bool spoil;
// 	uint256 likes;
// 	uint256 timestamp;
// }
export type PostDetails = {
	id: bigint;
	title: string;
	description: string;
	spoiler: boolean;
	likes: bigint;
	timestamp: bigint;
};

export type PostLoaderData = {
	post: PostDetails | null;
};

const postActionHandler = async ({ request }: ActionFunctionArgs) => {
	console.log(request);
	const data: FormData = await request.formData();
	const account = getAccount(config);

	const postSubmission = {
		title: data.get("title") as FormDataEntryValue,
		description: data.get("description") as FormDataEntryValue,
		spoiler: data.get("spoiler") as FormDataEntryValue,
		hasPoll: data.get("hasPoll") as FormDataEntryValue,
	};

	if (!postSubmission.title.valueOf().toString().trim()) {
		const error: PostStatus = { error: "Title should not be empty" };
		const postaction: PostActionData = {
			status: error,
		};
		return postaction;
	}

	if (!postSubmission.description.valueOf().toString().trim()) {
		const error: PostStatus = { error: "Description should not be empty" };
		const postaction: PostActionData = {
			status: error,
		};
		return postaction;
	}

	const title = postSubmission.title.valueOf().toString().trim();
	const description = postSubmission.description.valueOf().toString().trim();
	const spoil = postSubmission.spoiler.valueOf().toString().trim() === "on";
	const hasPoll = postSubmission.hasPoll.valueOf().toString().trim() === "on";
	if (account.isConnected) {
		const { result } = await simulateContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "createPost",
			args: [title, description, spoil],
			account: account.address,
		});

		console.log(result);

		const postTxHash = await writeContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "createPost",
			args: [title, description, spoil],
			account: account.address,
		});

		const transaction = await waitForTransactionReceipt(config, {
			hash: postTxHash,
		});

		if (transaction.status === "reverted") {
			alert("Creating post failed! Transaction was reverted due to an error!");
			return redirect("/post/error");
		}

		const readUserPosts: bigint[] = (await readContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "getPostsFromAddress",
			args: [account.address],
		})) as bigint[];

		// this won't affect the contract anyway
		const latestPostId = readUserPosts.pop();

		if (hasPoll) {
			alert(
				"You created a poll. You have to sign another transaction again 🙏",
			);
			const pollDescription = data.get(
				"poll-description",
			) as FormDataEntryValue;
			const pollOption1 = data.get("poll-option1") as FormDataEntryValue;
			const pollOption2 = data.get("poll-option2") as FormDataEntryValue;
			const { result } = await simulateContract(config, {
				abi: abi,
				address: deployedContractAddress,
				functionName: "createPoll",
				args: [
					latestPostId,
					pollDescription.valueOf().toString().trim(),
					pollOption1.valueOf().toString().trim(),
					pollOption2.valueOf().toString().trim(),
				],
				account: account.address,
			});

			const pollTxHash = await writeContract(config, {
				abi: abi,
				address: deployedContractAddress,
				functionName: "createPoll",
				args: [
					latestPostId,
					pollDescription.valueOf().toString().trim(),
					pollOption1.valueOf().toString().trim(),
					pollOption2.valueOf().toString().trim(),
				],
				account: account.address,
			});

			const transaction = await waitForTransactionReceipt(config, {
				hash: pollTxHash,
			});

			if (transaction.status === "reverted") {
				alert(
					"Creating poll failed! Transaction was reverted due to an error!",
				);
				return redirect("/post/error");
			}

			console.log(result);
		}
		return redirect("/post/success");
	}
	alert("Post creation failed! Reason unknown.");
	return redirect("/post/error");
};

const Post = () => {
	const actionData = useActionData() as PostActionData;

	const account = useAccount();

	if (account.isConnected) {
		const el = (
			<div>
				<Form method="POST" action="/post">
					<h1>Post something wonderful!</h1>
					<input
						type="text"
						name="title"
						placeholder="Need a title?"
						required
					/>
					<textarea
						rows={5}
						name="description"
						placeholder="What's on your mind?"
					/>
					<label htmlFor="spoiler">
						Spoil or not to spoil
						<input type="checkbox" name="spoiler" defaultChecked />
					</label>
					<PollStub />
					<button type="submit">Create Post</button>
					{actionData?.status?.error && <p>{actionData?.status?.error}</p>}
				</Form>
				<Outlet />
				<Link to="/">Go back to home page</Link>
			</div>
		);

		return el;
	}
	return (
		<main>
			<h2>Your account is not connected. You can't post yet.</h2>
			<Link to="/">Go back to home page</Link>
		</main>
	);
};

const PostSuccessPage = () => {
	return (
		<>
			<h3>You have successfully posted! You might want to post again!</h3>
		</>
	);
};

const PostFailurePage = () => {
	return (
		<>
			<h3>
				You were not able to post! Something went wrong... are you signed in?
			</h3>
		</>
	);
};

type PostRouteParams = {
	id: string;
};

const loaderGetPostById = async ({ params }: { params: Params<string> }) => {
	const id = params.id as string;
	const postId = Number.parseInt(id, 10);
	const post: PostDetails = (await readContract(config, {
		abi: abi,
		address: deployedContractAddress,
		functionName: "getPost",
		args: [postId],
	})) as PostDetails;

	return post;
};

const PostRouteChangeable = () => {
	const post = useLoaderData() as PostDetails;

	return (
		<>
			<ForumItem
				postId={post.id}
				title={post.title}
				description={post.description}
				likes={post.likes}
				timestamp={post.timestamp}
			/>
			<ShareableForumItemComponent postId={post.id} likes={post.likes} />
		</>
	);
};

const StandAlonePostPage = () => {
	return (
		<div>
			<Outlet />
			<h3>
				<Link to="/">Go back to home page</Link> or to{" "}
				<Link to="/forum">Forum</Link>.
			</h3>
		</div>
	);
};

export default Post;
export {
	postActionHandler,
	loaderGetPostById,
	PostRouteChangeable,
	StandAlonePostPage,
	PostFailurePage,
	PostSuccessPage,
	type PostRouteParams,
};
