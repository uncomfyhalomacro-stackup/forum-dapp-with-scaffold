// See https://reactrouter.com/en/main/components/form
// Nice goodie so I don't have to create my own form element
import { type FormEvent, useState } from "react";
import { redirect } from "react-router-dom";

const Post = () => {
	const [formData, setFormData] = useState({
		title: "openSUSE is awesome!",
		description: "openSUSE is an awesome community of developers",
		spoiler: false,
	});

	const action = async (e: FormEvent) => {
		e.preventDefault();

		setFormData({ ...formData });

		console.log(formData);

		return redirect("/profile");
	};

	return (
		<>
			<form
				onSubmit={(e) => {
					action(e);
				}}
			>
				<label htmlFor="title">Post title: </label>
				<input
					type="text"
					name="title"
					defaultValue=""
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					required
				/>
				<label htmlFor="description" className="description">
					What's on your mind?{" "}
				</label>
				<textarea
					rows={5}
					name="description"
					value={formData.description}
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
		</>
	);
};

export { Post };
