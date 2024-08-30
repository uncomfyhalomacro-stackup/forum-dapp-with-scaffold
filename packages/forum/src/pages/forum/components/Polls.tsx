import { useState } from "react";

export type PollDetails = {
	description: string;
	option1: string;
	option2: string;
};

const Poll = () => {
	const [pollElementVisible, setPollElementVisible] = useState(true);
	return (
		<>
			<label htmlFor="hasPoll">
				Create a poll:
				<input
					onClick={() => setPollElementVisible(!pollElementVisible)}
					type="checkbox"
					name="hasPoll"
					defaultChecked
				/>
			</label>
			{pollElementVisible && (
				<>
					<input
						type="text"
						name="poll-description"
						placeholder="What's the poll about?"
						required
					/>
					<input
						type="text"
						name="poll-option1"
						placeholder="Option 1 Description"
						required
					/>
					<input
						type="text"
						name="poll-option2"
						placeholder="Option 1 Description"
						required
					/>
				</>
			)}
		</>
	);
};

export { Poll };
