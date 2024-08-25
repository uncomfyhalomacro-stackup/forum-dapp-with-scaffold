// See https://reactrouter.com/en/main/components/form
// Since we are using typescript, we cannot infer the types correctly
// Relevant resource https://github.com/remix-run/remix/blob/main/decisions/0003-infer-types-for-useloaderdata-and-useactiondata-from-loader-and-action-via-generics.md
// See also https://github.com/remix-run/remix/discussions/8616 and https://github.com/remix-run/react-router/discussions/9792
import type React from "react";
import {
	Link,
	Form,
	useActionData,
	redirect,
	type ActionFunctionArgs,
	Outlet,
} from "react-router-dom";

export type PostStatus = {
	error: string;
};
// Band-aid https://stackoverflow.com/questions/75740241/what-type-to-declare-for-useloaderdata-and-where
export type PostActionData = {
	status: PostStatus | null;
};

export type PostDetails = {
	title: string;
	description: string;
	spoiler: boolean;
};

export type PostLoaderData = {
	post: PostDetails | null;
};
const postActionHandler = async ({ request }: ActionFunctionArgs) => {
	console.log(request);
	const data: FormData = await request.formData();

	const postSubmission = {
		title: data.get("title") as FormDataEntryValue,
		description: data.get("description") as FormDataEntryValue,
		spoiler: data.get("spoiler") as FormDataEntryValue,
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

	console.log(postSubmission);

	return redirect("/post/success");
};

const Post: React.FC = () => {
	const actionData = useActionData() as PostActionData;

	const el = (
		<div>
			<Form method="POST" action="/post">
				<h1>Post something wonderful!</h1>
				<input type="text" name="title" placeholder="Need a title?" required />
				<textarea
					rows={5}
					name="description"
					placeholder="What's on your mind?"
				/>
				<label htmlFor="spoiler">
					Spoil or not to spoil
					<input type="checkbox" name="spoiler" defaultChecked />
				</label>
				<button type="submit">Create Post</button>
				{actionData?.status?.error && <p>{actionData?.status?.error}</p>}
			</Form>
			<Outlet />
			<Link to="/">Go back to home page</Link>
		</div>
	);

	return el;
};

const PostSuccessPage = () => {
	return (
		<>
			<h3>You have successfully posted! You might want to post again!</h3>
		</>
	);
};

export { PostSuccessPage, Post, postActionHandler };
