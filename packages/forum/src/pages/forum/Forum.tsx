import { Link } from "react-router-dom";

const Forum = () => {
	return (
		<main>
			<h2>
				<Link to="/post">Post</Link> something or start a poll!
			</h2>
			<Link to="/">Go back to home page</Link>
		</main>
	);
};

export default Forum;
