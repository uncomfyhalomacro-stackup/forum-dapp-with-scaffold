import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const Forum = () => {
	const account = useAccount();
	if (account.isConnected) {
		return (
			<main>
				<h2>
					<Link to="/post">Post</Link> something or start a poll!
				</h2>
				<h3><Link to="/">Go back to home page</Link></h3>
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
