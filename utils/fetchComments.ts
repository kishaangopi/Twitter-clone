import { Comment } from "../typind";

export const fetchComments = async (tweetId: String) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`
	);

	const comments: Comment[] = await res.json();
	return comments;
};
