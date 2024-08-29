import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const Profile = () => {
	const account = useAccount();
	if (account.isConnected) {
		return (
			<main>
				<h1>
					Hi there {account.address?.slice(0, 8)}...! You are currently
					connected to {account.chain?.name}.
				</h1>
				<h3>
					<Link to="/">Go back to home page</Link> or to{" "}
					<Link to="/feed">Feed</Link>.
				</h3>
			</main>
		);
	}
	return (
		<main>
			<h1>Your User Profile Here</h1>
		</main>
	);
};

export default Profile;
