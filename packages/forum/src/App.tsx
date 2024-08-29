import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const RootPage = () => {
	const account = useAccount();
	if (account.isConnected) {
		return (
			<div>
				<div className="welcome">
					<div>
						<h1>Welcome to StackUp Forums</h1>
					</div>
					<div className="connectbutton">
						<ConnectButton
							label="Sign in"
							chainStatus="full"
							accountStatus={{
								largeScreen: "full",
								smallScreen: "avatar",
							}}
						/>
					</div>
				</div>
				<div>
					<h2>
						You are now logged in. Visit our <Link to="/feed">Feed</Link> or visit your <Link to="/profile">Profile</Link>.
					</h2>
				</div>
			</div>
		);
	// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return (
			<div>
				<div className="welcome">
					<div>
						<h1>Welcome to StackUp Forums</h1>
					</div>
					<div className="connectbutton">
						<ConnectButton
							label="Sign in"
							chainStatus="full"
							accountStatus={{
								largeScreen: "full",
								smallScreen: "avatar",
							}}
						/>
					</div>
				</div>
				<div>
					<h2>
						Head to our other StackUp sites above or connect your wallet to
						login to our <Link to="/feed">Feed</Link>.
					</h2>
				</div>
			</div>
		);
	}
};

export default RootPage;
