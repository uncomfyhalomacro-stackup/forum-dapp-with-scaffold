import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "./components/Navbar";
import { Link } from "react-router-dom";

const RootPage = () => {
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
					Head to our other StackUp sites below or connect your wallet to login
					to our <Link to="/feed">Feed</Link>.
				</h2>
			</div>
			<div>
				<Navbar />
			</div>
		</div>
	);
};

export default RootPage;
