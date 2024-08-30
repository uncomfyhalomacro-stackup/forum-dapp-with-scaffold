// Comment is the same as Post
// We might be able to create some types to avoid redundant boilerplate. But this will
// be okay for now
import {
	Link,
	Form,
	redirect,
	type ActionFunctionArgs,
	type Params,
} from "react-router-dom";
import { rainbowConfig as config } from "../../../web3-utils/web3-init";
import {
	getAccount,
	readContract,
	simulateContract,
	waitForTransactionReceipt,
	writeContract,
} from "wagmi/actions";
import { abi, deployedContractAddress } from "../../../web3-utils/web3-init.ts";
import type { PostDetails } from "./Posts";
import { useState } from "react";

export type CommentDetails = PostDetails;
export type CommentStatus = {
	error: string;
};
// Band-aid https://stackoverflow.com/questions/75740241/what-type-to-declare-for-useloaderdata-and-where
export type CommentActionData = {
	status: CommentStatus | null;
};

export type Comment = {
	error: string;
};

export type CommentLoaderData = {
	post: CommentDetails | null;
};

const loaderGetPostId = async ({ params }: { params: Params<string> }) => {
	const id = params.id as string;
	const postId = Number.parseInt(id, 10);
	return postId;
};

// This param syntax is so weird
const commentActionHandler = async ({ request }: ActionFunctionArgs) => {
	console.log(request);
	const data: FormData = await request.formData();
	const account = getAccount(config);

	const commentSubmission = {
		postId: data.get("post-id") as FormDataEntryValue,
		title: data.get("comment-title") as FormDataEntryValue,
		description: data.get("comment-description") as FormDataEntryValue,
		spoiler: data.get("comment-spoiler") as FormDataEntryValue,
	};

	if (!commentSubmission.postId.valueOf().toString().trim()) {
		const error: CommentStatus = {
			error: "Post Id not found should not be empty",
		};
		const commentaction: CommentActionData = {
			status: error,
		};
		return commentaction;
	}

	if (!commentSubmission.title.valueOf().toString().trim()) {
		const error: CommentStatus = { error: "Title should not be empty" };
		const commentaction: CommentActionData = {
			status: error,
		};
		return commentaction;
	}

	if (!commentSubmission.description.valueOf().toString().trim()) {
		const error: CommentStatus = { error: "Description should not be empty" };
		const commentaction: CommentActionData = {
			status: error,
		};
		return commentaction;
	}

	const postId = Number.parseInt(
		commentSubmission.postId.valueOf().toString().trim(),
		10,
	);
	const title = commentSubmission.title.valueOf().toString().trim();
	const description = commentSubmission.description.valueOf().toString().trim();
	const spoil = commentSubmission.spoiler.valueOf().toString().trim() === "on";
	if (account.isConnected) {
		const { result } = await simulateContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "createComment",
			args: [postId, title, description, spoil],
			account: account.address,
		});

		console.log(result);

		const commentTxHash = await writeContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "createComment",
			args: [postId, title, description, spoil],
			account: account.address,
		});

		const transaction = await waitForTransactionReceipt(config, {
			hash: commentTxHash,
		});

		if (transaction.status === "reverted") {
			alert(
				"Creating comment failed! Transaction was reverted due to an error!",
			);
			// `/post/:id/comment/failure`
			return redirect("./comment/failure");
		}
		alert("Succesfully commented to post");
		return redirect("./comment/success");
	}
	return redirect("./comment/failure");
};

const CommentProp = ({
	post,
	actionData,
}: { post: PostDetails; actionData: CommentActionData }) => {
	const account = getAccount(config);
	if (account.isConnected) {
		return (
			<div>
				<Form method="POST" action={"/posts/".concat(post.id.toString())}>
					<h1>Comment something wonderful!</h1>
					<input value={Number(post.id)} name="post-id" type="number" hidden />
					<input
						type="text"
						name="comment-title"
						placeholder="Comment title"
						required
					/>
					<textarea
						rows={5}
						name="comment-description"
						placeholder="What's on your mind?"
					/>
					<label htmlFor="spoiler">
						Spoil or not to spoil
						<input type="checkbox" name="comment-spoiler" defaultChecked />
					</label>
					<button type="submit">Submit Comment</button>
					{actionData?.status?.error && <p>{actionData?.status?.error}</p>}
				</Form>
			</div>
		);
	}
	return (
		<main>
			<h2>Your account is not connected. You can't comment on a post yet.</h2>
			<Link to="/forum">Go back to forume</Link>
		</main>
	);
};

const CommentSuccessPage = () => {
	return (
		<>
			<h3>You have successfully commented! You might want to comment again!</h3>
		</>
	);
};

const CommentFailurePage = () => {
	return (
		<>
			<h3>
				You were not able to comment! Something went wrong... are you signed in?
			</h3>
		</>
	);
};

const ShareableCommentItemComponent = ({
	commentId,
	likes,
}: { commentId: bigint; likes: bigint }) => {
	const [likeCounter, setLikeCounter] = useState(likes);

	const handleUpvote = async () => {
		const { result } = await simulateContract(config, {
			address: deployedContractAddress,
			abi: abi,
			functionName: "upVoteComment",
			args: [commentId],
		});

		console.log(result);

		const upvoteTxHash = await writeContract(config, {
			address: deployedContractAddress,
			abi: abi,
			functionName: "upVoteComment",
			args: [commentId],
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
			args: [commentId],
		})) as PostDetails;

		setLikeCounter(post.likes);
	};

	const handleDownVote = async () => {
		const { result } = await simulateContract(config, {
			address: deployedContractAddress,
			abi: abi,
			functionName: "downVoteComment",
			args: [commentId],
		});

		console.log(result);

		const downvoteTxHash = await writeContract(config, {
			address: deployedContractAddress,
			abi: abi,
			functionName: "downVoteComment",
			args: [commentId],
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

		const comment: CommentDetails = (await readContract(config, {
			abi: abi,
			address: deployedContractAddress,
			functionName: "getPost",
			args: [commentId],
		})) as CommentDetails;

		setLikeCounter(comment.likes);
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

export default CommentProp;
export {
	commentActionHandler,
	CommentFailurePage,
	CommentSuccessPage,
	loaderGetPostId,
	ShareableCommentItemComponent,
};
