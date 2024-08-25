import { Navbar } from "./components/Navbar";
import { Link } from "react-router-dom";

const RootPage = () => {
	return (
		<div>
			<h1>Welcome to StackUp Forums</h1>
			<div className="navbuttons">
				<div>
					<h2>
						Head to our other StackUp sites below or connect your wallet to
						login to our <Link to="/feed">Feed</Link>.
					</h2>
				</div>
			</div>
			<div>
				<Navbar />
			</div>
		</div>
	);
};

export default RootPage;
