// See https://reactrouter.com/en/main/components/form
// Nice goodie so I don't have to create my own form element
import { type FormEvent, useState } from "react";
import { Link, redirect, replace, useNavigate } from "react-router-dom";

const Post = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "StackUp is awesome!",
		description: "StackUp is an awesome community of developers",
		spoiler: false,
	});

	const action = async (e: FormEvent) => {
		e.preventDefault();

		setFormData({ ...formData });

		console.log(formData);

		// Do something to data here

		// reset
		setFormData({
			title: "",
			description: "",
			spoiler: false,
		});

		// redirect
		// TODO: move this over to feed
		// NOTE: `replace` to true replaces the previous web history to the future redirected page. So going back to it is not possible
		// unless set to false.
		return navigate("/feed", { replace: true });
	};

	return (
		<div>
			<form
				onSubmit={(e) => {
					action(e);
				}}
			>
				<h1>Post something wonderful!</h1>
				<input
					type="text"
					name="title"
					placeholder="Need a title?"
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					required
				/>
				<textarea
					rows={5}
					name="description"
					placeholder="What's on your mind?"
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
					required
				/>
				<label htmlFor="spoiler">
					Spoil or not to spoil
					<input
						type="checkbox"
						name="spoiler"
						defaultChecked
						onChange={(e) =>
							setFormData({ ...formData, spoiler: e.target.checked })
						}
					/>
				</label>
				<button type="submit">Create Post</button>
			</form>
			<Link to="/">Go back to home page</Link>
		</div>
	);
};

export { Post };
